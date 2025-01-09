import { CurrencyISO } from "../@types"

export const currencyFormat = (amount: number | string, currency: CurrencyISO) => {
  if (!currency) {
    return `${amount} €`
  }
  switch (currency) {
    case "ARS":
      return `$ ${amount}`
    case "EUR":
      return `${amount} €`
    case "USD":
      return `$ ${amount}`
  }
}
