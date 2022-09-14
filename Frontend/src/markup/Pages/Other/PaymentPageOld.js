import React, { useEffect } from "react"
import { usePaystackPayment } from "react-paystack"
import { useHistory } from "react-router-dom"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import baseUrl from "../../../utils/baseUrl"

function PaymentPage({
  reference,
  email,
  amount,
  start,
  stop,
  timeline_id = 37,
}) {
  console.log("PaymentPage", reference, email, amount, start, stop, timeline_id)
  const axiosPrivate = useAxiosPrivate()
  const history = useHistory()

  const config = {
    reference: reference,
    email,
    amount: amount * 100,
    publicKey: "pk_test_b4198537c6f3c50f8fc0fccaebf4d0aae311d411",
  }
  const initializePayment = usePaystackPayment(config)

  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
    try {
      // await axiosPrivate.get(
      //   `${baseUrl.baseURL}api/v1/payment/callback/?trxref=${reference.trxref}`
      // )
      alert("Payment Successful")
      stop()
      // history.push({
      //   pathname: "/task-contract",
      //   state: {
      //     timeline_id: timeline_id,
      //   },
      // })
    } catch (error) {
      console.log(error)
    }

    // props.nextPage()
  }

  // you can call this function anything
  const onClose = (e) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed", e)
    stop()
    // props.nextPage()
  }
  // useEffect(() => {
  //   if (start) {
  //     initializePayment(onSuccess, onClose)
  //   }
  // })
  return (
    <div>
      {start && (
        <button
          onClick={() => {
            initializePayment(onSuccess, onClose)
          }}
        >
          Paystack Hooks Implementation
        </button>
      )}
      {/* {start && initializePayment(onSuccess, onClose)} */}
    </div>
  )
}

export default PaymentPage
