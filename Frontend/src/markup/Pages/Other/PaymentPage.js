import React from "react";
import { usePaystackPayment } from "react-paystack";
const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000,
  publicKey: "pk_test_b4198537c6f3c50f8fc0fccaebf4d0aae311d411",
};

// you can call this function anything

function PaymentPage(props) {
  const initializePayment = usePaystackPayment(config);
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    props.nextPage();
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    props.nextPage();
  };
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
}

export default PaymentPage;
