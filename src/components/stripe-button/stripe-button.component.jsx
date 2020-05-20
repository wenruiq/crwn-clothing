import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

// STRIPE DEFAULT TEST CARD
// 4242 4242 4242 4242 | EXP: ANYFUTURE DATE | CW: 123

const StripeCheckoutButton = ({ price }) => {
  // stripe wants currency in cents
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_ZvLcOExk8lyRwDojguqOrdyu00UvD1e8oU';

  // Usually you pass the token to the backend to process the charge
  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  // token is on submit callback
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
