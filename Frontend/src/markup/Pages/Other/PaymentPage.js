import React, { useEffect } from "react"
import { usePaystackPayment } from "react-paystack"
import { useHistory } from "react-router-dom"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import baseUrl from "../../../utils/baseUrl"

// you can call this function anything

function PaymentPage({
  reference,
  email,
  amount,
  start,
  stop,
  timeline_id,
  timeline_page,
}) {
  const axiosPrivate = useAxiosPrivate()
  const history = useHistory()

  const config = {
    reference: reference,
    email: email,
    amount: parseInt(amount * 100),
    publicKey: "pk_test_b4198537c6f3c50f8fc0fccaebf4d0aae311d411",
  }
  const initializePayment = usePaystackPayment(config)
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
    callbackURL(reference)
  }

  const callbackURL = async (reference) => {
    try {
      await axiosPrivate.get(
        `${baseUrl.baseURL}api/v1/payment/callback/?trxref=${reference.trxref}`
      )
      alert("Payment Successful")
      // stop()
      history.push({
        pathname: "/task-contract",
        state: {
          timeline_id: timeline_id,
          timeline_page : timeline_page
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed")
    stop()
  }
  useEffect(() => {
    if (start && email && amount && reference) {
      console.log(config)
      initializePayment(onSuccess, onClose)
    }
  }, [start, email, amount, reference])

  return (
    <div>
      {/* <input
        type="button"
        id="paystack"
        className="d-none"
        onClick={() => {
          initializePayment(onSuccess, onClose)
        }}
      >
        Paystack Hooks Implementation
      </input> */}
    </div>
  )
}

export default PaymentPage
