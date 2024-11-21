import UrlConfig from "@/util/config";
import React, { useRef, useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { getClientAccess } from "@/util/Cookies";

export default function Paypal(props) {
  const paypal = useRef();
  const toast = useRef(null);

  const createTransaction = (order, reservation) => {

    const data = {
      transaction: order,
      reservation_data: reservation
    }
    return getClientAccess()
      .then((accessToken) => {
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/transactions/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data)
        })
          .then((response) => {
            if (response.status !== 201) {
              throw new Error('Transaction failed');
            }
            return response.json();
          }).then((data) => {

            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Payement effectué",
              life: 3000
            });
            return data;
          })
          .catch((error) => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Une erreur s'est produite lors du paiement",
              life: 5000
            });
            return null;
          });
      })
  };

  useEffect(() => {

    const handleFetch = () => {
      const formatted_check_in = new Date(props.check_in).toISOString().split('T')[0];
      const formatted_check_out = new Date(props.check_out).toISOString().split('T')[0];
      const chambre_details = props.room_details.map((room) => ({
        id: room.id,
        quantity: room.quantity
      }));
      const booking_info = {
        "chambre_ids": props.id_chambres,
        "chambres": chambre_details,
        "check_in": formatted_check_in,
        "check_out": formatted_check_out,
        "guests": props.guest
      };

      return fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/check/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking_info)
      })
        .then((response) => {
          if (!response.ok) {
            return false;
          }
          return response.json();
        }).then((data) => {

          return data;
        })
        .catch((error) => {
          console.error('Error during user fetch operation:', error);
          return null;
        });
    };
    handleFetch().then((infoChambre) => {
      if (infoChambre) {

        window.paypal
          .Buttons({
            style: {
              shape: 'pill',  // ou 'rect' pour rectangulaire
              color: 'gold',  // ou 'blue', 'silver', 'white', 'black'
              layout: 'vertical',  // ou 'horizontal'
              label: 'pay',  // ou 'checkout', 'buynow', 'pay', 'installment'
              tagline: false   // afficher ou non le slogan sous le bouton
            },
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: props.description,
                    amount: {
                      currency_code: "EUR",
                      value: infoChambre.total_price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();

              if (order.status === "COMPLETED") {
                const data = await createTransaction(order, infoChambre.reservation_details)
                console.log(data);
              }
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current);
      } else {
        console.error("Formulaire incomplet");

        toast.current.show({
          severity: "info",
          summary: "Error",
          detail: "Information not complete",
          life: 5000
        });
      }
    })
  }, [props]);

  return (
    <>
      <div>
        <div ref={paypal}></div>
      </div>
      <Toast ref={toast} />
    </>
  );
}
