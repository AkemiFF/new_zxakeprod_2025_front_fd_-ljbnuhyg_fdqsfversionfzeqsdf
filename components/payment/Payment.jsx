import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function Payment() {

    const router = useRouter();

    const paymentElementOptions = {
        layout:"accordion",
        paymentMethodOrder: ['card', 'google_pay', 'apple_pay'],
        allowedPaymentMethods: ['card', 'google_pay', 'apple_pay']
    }

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {

        event.preventDefault();
    
        if (!stripe || !elements) {
            console.log("Tsa mety");
            return;
        }
    
        const result = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
            },
            redirect:"if_required"
        });
    
        if (result.error) {
            console.log(result.error.message);
        }
        else if(result.paymentIntent && result.paymentIntent.status === 'succeeded'){
            router.push("/users")
        } 
        else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <Card style={{width:'600px'}}>
            <PaymentElement
                options={paymentElementOptions}
            />
            <br/>
            <Button onClick={handleSubmit} className="button-primary" label="Confirm"/>
        </Card>
    )
}