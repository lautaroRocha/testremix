import { AxiosResponse } from "axios"
import { NextFunction, Request } from "express"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { Product } from "../../client/@types"
import { config } from "../config"

const client = new MercadoPagoConfig({
  accessToken: config.mercadoPago.accessToken
})

export const preferenceService = async (req: Request, next: NextFunction) => {
  try {
    const body = {
      items: req.body.map((it: { quantity: number; product: Product }) => ({
        id: it.product.id,
        title: it.product.product_name,
        unit_price: it.product.price,
        quantity: it.quantity,
        currency_id: "ARS"
      }))
    }
    const preference = new Preference(client)
    const result = await preference.create({ body })
    return result
  } catch (e) {
    req.headers.src = "preferenceService"
    return next(e as unknown as AxiosResponse)
  }
}
