import UrlConfig from "@/util/config";
import React, { useRef, useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { getClientAccess } from "@/util/Cookies";

export default function TourPaypal(props) {
  const paypal = useRef();
  const toast = useRef(null);

  const createTransaction = (order, reservation) => {
    const data = {
      transaction: order,
      reservation_data: reservation
    }

    return getClientAccess()
      .then((accessToken) => {
        fetch(`${UrlConfig}/api/tour/transactions/create/`, {
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
              detail: "Reservation effectué",
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
      const booking_info = {
        id_voyage: props.id_voyage,
        nb_voyageur: props.nb_voyageur
      };

      return fetch(`${UrlConfig}/api/tour/voyage/check/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking_info)
      })
        .then((response) => {
          return response.json().then((data) => {

            if (!response.ok) {
              toast.current.show({ severity: 'error', summary: 'Erreur', detail: data.error, life: 3000 });
              return false;
            }
            return data;
          });
        })
        .catch((error) => {
          console.error('Error during user fetch operation:', error);
          toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Erreur de réseau', life: 3000 });
          return null;
        });
    }
    handleFetch().then((infoProduct) => {
      if (infoProduct) {

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
                      value: infoProduct.prix_total,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();

              if (order.status === "COMPLETED") {
                createTransaction(order, infoProduct);
              }
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current);
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
