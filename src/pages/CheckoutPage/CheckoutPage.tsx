// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import { useNavigate } from "react-router";

// interface CheckoutPageProps {
//   clientSecret: string | null;
// }

// const CheckoutPage: React.FC<CheckoutPageProps> = ({ clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // useEffect(() => {
//   //   if (!stripe) {
//   //     return;
//   //   }

//   //   const clientSecret = new URLSearchParams(window.location.search).get(
//   //     "payment_intent_client_secret"
//   //   );

//   //   if (!clientSecret) {
//   //     return;
//   //   }

//   //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//   //     if (!paymentIntent) {
//   //       return;
//   //     }

//   //     console.log(paymentIntent.status);
//   //   });
//   // }, [stripe]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements || !clientSecret) {
//       setMessage(
//         "Stripe.js has not yet loaded,  or missing payment information."
//       );
//       return;
//     }

//     try {
//       if (!clientSecret) {
//         setMessage("Missing payment information.");
//         setIsLoading(false);
//         return;
//       }

//       const { paymentIntent: existingPaymentIntent } =
//         await stripe.retrievePaymentIntent(clientSecret);

//       if (
//         existingPaymentIntent &&
//         existingPaymentIntent.status === "succeeded"
//       ) {
//         console.log("PaymentIntent already succeeded.");
//         setMessage("Payment already processed.");
//         navigate("/complete");
//         return;
//       }
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/complete`,
//         },
//         redirect: "if_required",
//       });
//       console.log("PaymentIntent:", paymentIntent);

//       if (error) {
//         console.error("Payment Failed:", error.message);
//         setMessage(`Payment failed: ${error.message}`);
//       } else if (paymentIntent && paymentIntent.status === "succeeded") {
//         console.log("Payment Succeeded:", paymentIntent);
//         navigate("/complete");
//       } else {
//         console.log("Unexpected state:", paymentIntent);
//         setMessage("An unexpected error occurred.");
//       }
//     } catch (error: unknown) {
//       console.error("Payment Error:", error);
//       if (error instanceof Error) {
//         setMessage(`An unexpected error occurred: ${error.message}`);
//       } else {
//         setMessage("An unexpected error occurred.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const paymentElementOptions = {
//     layout: "accordion" as const,
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button
//         disabled={isLoading || !stripe || !elements || !clientSecret}
//         id="submit"
//       >
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// export default CheckoutPage;

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";

interface CheckoutPageProps {
  clientSecret: string | null;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setMessage(
        "Stripe.js has not yet loaded,  or missing payment information. Please check your application to verify this is loading "
      );
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/complete`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment Failed:", error.message);
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded:", paymentIntent);
        navigate("/complete");
      } else {
        console.log("Unexpected state:", paymentIntent);
        setMessage("An unexpected error occurred.");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      setMessage(`An unexpected error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "accordion" as const,
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements || !clientSecret}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutPage;
