import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51K1ExWCgs43rUWiMTvt19pmEC2wSg97cPAgAG44pWtjyGVFlTUNysIgUR1AY9QJBtSEekg3CnFSGzPln4IQj0XS200Nu7EZt4v'
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
