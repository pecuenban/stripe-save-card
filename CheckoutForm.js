import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    stripePaymentMethodHandler(result);
  };

  function stripePaymentMethodHandler(result) {
    if (result.error) {
      alert('ERROR');
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)
      fetch('https://stripe.test-quasardynamics.company/tarjeta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
          payment_method: result,
        }),
      }).then(function (result) {
        // Handle server response (see Step 4)
        console.log(result);
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button type="submit" disabled={!stripe}>
        Submit Payment
      </button>
    </form>
  );
}
