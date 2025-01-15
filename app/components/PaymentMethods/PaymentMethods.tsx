import style from "./paymentMethods.module.css"
import paymentIcon from "../../assets/payment.svg"
import { OrderBrief, Spinner } from ".."
import { useContext, useEffect, useState } from "react"
import { OrderContext } from "../../App"
import { useParams, useNavigate } from "react-router-dom"
import { useWindowSize } from "../../hooks/useWindowSize"
import { constants } from "../../config/constants"
import { useTranslation } from "react-i18next"
import cardIcon from "../../assets/card.svg"
import Modal from "../Modal/Modal"
import useToast from "../Toast/hooks/useToast"
import Toast from "../Toast/Toast"

async function generateSHA512Hash(message: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)

  const hashBuffer = await crypto.subtle.digest("SHA-512", data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("")

  return hashHex
}

const getGlobalPaymentsAccess = async () => {
  const appKey = "Hv2GFYPqCR6dh5t5"
  const appId = "F1vh7NiN2wjg3JslkAZTU0zuz3N1qiOw"
  const nonce = new Date().toISOString()
  const secret = await generateSHA512Hash(`${nonce}${appKey}`)
  const data = {
    app_id: appId,
    nonce: nonce,
    secret: secret,
    grant_type: "client_credentials",
    permissions: ["PMT_POST_Create_Single"]
  }
  const response = await fetch("https://apis.sandbox.globalpay.com/ucp/accesstoken", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "X-GP-Version": "2021-03-22",
      "Content-Type": "application/json"
    }
  })
  return await response.json()
}

const getGlobalPaymentsAccesToTransaction = async () => {
  const appKey = "Hv2GFYPqCR6dh5t5"
  const appId = "F1vh7NiN2wjg3JslkAZTU0zuz3N1qiOw"
  const nonce = new Date().toISOString()
  const secret = await generateSHA512Hash(`${nonce}${appKey}`)
  const data = {
    app_id: appId,
    nonce: nonce,
    secret: secret,
    grant_type: "client_credentials",
    permissions: [
      "ACT_POST_Auto_Action",
      "ACT_POST_Multiple",
      "APP_POST_Search_PFCValidate",
      "AUT_POST_Check_Availability",
      "AUT_POST_Initiate",
      "AUT_POST_Results",
      "BAT_POST_Close",
      "CCS_POST_DCC",
      "DEV_POST_Create",
      "INS_POST_Query",
      "LNK_POST_Create",
      "LNK_POST_Expire",
      "TRN_GET_List",
      "TRN_GET_Single",
      "TRN_POST_Adjust",
      "TRN_POST_Authorize",
      "TRN_POST_Capture",
      "TRN_POST_Capture_Multiple",
      "TRN_POST_Confirm",
      "TRN_POST_Force",
      "TRN_POST_Hold",
      "TRN_POST_Incremental",
      "TRN_POST_Initiate",
      "TRN_POST_Reauthorize",
      "TRN_POST_Refund",
      "TRN_POST_Refund_Standalone",
      "TRN_POST_Release"
    ]
  }
  const response = await fetch("https://apis.sandbox.globalpay.com/ucp/accesstoken", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "X-GP-Version": "2021-03-22",
      "Content-Type": "application/json"
    }
  })
  return await response.json()
}

const chargePaymentToken = async (reference: string, pmtId: string, name: string) => {
  const { token } = await getGlobalPaymentsAccesToTransaction()
  const data = {
    account_name: "transaction_processing",
    channel: "CNP",
    capture_mode: "AUTO",
    type: "SALE",
    amount: "100", //---> ver como enviar decimales
    currency: "EUR",
    reference: reference,
    country: "IE",
    payment_method: {
      name: name,
      entry_mode: "ECOM",
      id: pmtId
    }
  }
  const response = await fetch("https://apis.sandbox.globalpay.com/ucp/transactions", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "X-GP-Version": "2021-03-22",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  const transaction = await response.json()
  const { status, payment_method } = transaction
  return { status, payment_method }
}

const PaymentMethods = () => {
  const { order } = useContext(OrderContext)
  const { business, branch } = useParams()
  const { width } = useWindowSize()
  const { t } = useTranslation("orderDetail")
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit" | null>(null)

  const [loadingPayment, setLoadingPayment] = useState<boolean>(false)

  const [processingPayment, setProcessingPayment] = useState<boolean>(false)

  const { showToast, toast } = useToast()

  useEffect(() => {
    if (!order.length) {
      navigate(`/${business}/${branch}/pickup`)
    }
  }, [])

  useEffect(() => {
    const GlobalPayments = (window as any).GlobalPayments
    if (GlobalPayments && paymentMethod) {
      const getTokenAndOpenModal = async () => {
        setLoadingPayment(true)
        const { token } = await getGlobalPaymentsAccess()
        GlobalPayments.configure({
          accessToken: token,
          apiVersion: "2021-03-22",
          env: constants.GLOBAL_PAYMENTS_ENV
        })
        const cardForm = GlobalPayments.ui.form({
          fields: {
            "card-number": {
              placeholder: "•••• •••• •••• ••••",
              target: "#card-number"
            },
            "card-expiration": {
              placeholder: "MM / YYYY",
              target: "#card-expiration"
            },
            "card-cvv": {
              placeholder: "•••",
              target: "#card-cvv"
            },
            "card-holder-name": {
              placeholder: "Igual que aparece en la tarjeta",
              target: "#card-holder-name"
            },
            submit: {
              target: "#submit-button",
              value: "Pagar"
            }
          },
          styles: {
            "@font-face": {
              "font-family": "'karla'",
              "font-style": "normal",
              "font-weight": "200",
              "font-display": "swap ",
              src: "url(https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap)",
              "unicode-range":
                "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
            },
            "input[type=text]": {
              "margin-bottom": "20px",
              padding: "12px",
              border: "1px solid #ccc",
              "border-radius": "10px"
            },

            "input[type=text]:focus-visible, input[type=tel]:focus-visible": {
              outline: "none !important",
              border: "1px solid #0CAEBB",
              "box-shadow": "0 0 4px 0 #71C5E8 inset"
            },

            "input[type=tel]": {
              "margin-bottom": "20px",
              padding: "12px",
              border: "1px solid #ccc",
              "border-radius": "10px"
            },

            "button[type=button]:focus-visible": {
              "background-color": "#71C5E8",
              outline: "none !important",
              border: "1px solid gray",
              "box-shadow": "0 -1px 4px 0 gray inset"
            },

            "button[type=button]": {
              "background-color": "#3DBEC9",
              color: "white",
              padding: "12px",
              margin: "10px",
              border: "none",
              "border-radius": "10px",
              cursor: "pointer",
              "font-size": "17px"
            },

            "button[type=button]:hover": {
              "background-color": "#0CAEBB"
            }
          }
        })
        cardForm.ready(() => {
          setLoadingPayment(false)
        })
        cardForm.on("submit", () => {
          setProcessingPayment(true)
        })
        cardForm.on("token-success", async (resp: any) => {
          const token = document.createElement("input")
          token.type = "hidden"
          token.name = "payment-reference"
          token.value = resp.paymentReference
          const form = document.getElementById("payment-form")
          if (form) {
            form.appendChild(token)
            setProcessingPayment(true)
            const { status, payment_method } = await chargePaymentToken(
              resp.details.reference,
              resp.paymentReference,
              resp.details.cardholderName
            )
            if (status === "CAPTURED") {
              showToast({ text: "Pago procesado con éxito", fullScreen: true })
              navigate(`/${business}/${branch}/mi-orden/checkout/F54AB3`, { replace: true })
            } else {
              showToast({
                text: "Hubo un error procesando el pago",
                isError: true,
                fullScreen: true
              })
            }
            console.log(status === "CAPTURED" ? "TRANSACCIÖN EXITOSA" : "ERROR")
            console.log(payment_method)
            setProcessingPayment(false)
            // (form as HTMLFormElement).submit();
          }
        })
        cardForm.on("token-error", (resp: any) => {
          console.error(resp)
          console.error("ERROR EN EL TOKEN DE PAGO")
        })
      }
      getTokenAndOpenModal()
    }
  }, [paymentMethod])

  return (
    <div className={style.paymentMethods}>
      {toast && <Toast {...toast} />}
      <header>
        <img src={paymentIcon} alt="" draggable={false} />
        <h1>{t("paymentMethods")}</h1>
      </header>
      <main>
        <div
          className={style.paymentMethodOption}
          onClick={() => {
            setPaymentMethod("credit")
          }}
        >
          <img src={cardIcon} alt="" draggable={false} />
          <span>Tarjeta</span>
        </div>
        <div
          className={style.paymentMethodOption}
          onClick={() => {
            setPaymentMethod("debit")
          }}
        >
          <img src={cardIcon} alt="" draggable={false} />
          <span>Efectivo en punto de retiro</span>
        </div>
        {paymentMethod ? (
          <Modal onClick={processingPayment ? () => null : () => setPaymentMethod(null)}>
            <div className={style.paymentFormContainer}>
              <header>
                <button
                  id="payment-form-close-btn"
                  onClick={processingPayment ? () => null : () => setPaymentMethod(null)}
                >
                  X
                </button>
              </header>
              {loadingPayment ? (
                <div className={style.loadingPayments}>
                  <Spinner />
                </div>
              ) : null}
              {processingPayment ? (
                <div className={style.loadingPayments}>
                  <Spinner />
                  <span>Estamos procesando su pago...</span>
                </div>
              ) : null}

              <form id="payment-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="card-number">Número de tarjeta</label>
                <div id="card-number"></div>
                <label htmlFor="card-expiration">Fecha de vencimiento</label>
                <div id="card-expiration"></div>
                <label htmlFor="card-cvv">CVV</label>
                <div id="card-cvv"></div>
                <label htmlFor="card-holder-name">Nombre del titular</label>
                <div id="card-holder-name"></div>
                <div id="submit-button"></div>
              </form>
            </div>
          </Modal>
        ) : null}
      </main>
      {width && width < 925 && order.length && <OrderBrief />}
    </div>
  )
}

export default PaymentMethods
