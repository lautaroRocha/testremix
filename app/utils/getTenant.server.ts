import { Tenant } from "~/@types"
import apiService from "~/config/API"
import { constants } from "~/config/constants"
import { imageCookie, tenantCookie } from "./cookies.server"

export const getTenant = async(alias: string, token: string, timestamp: string) => {
  console.log('PARAMS')
  console.log(timestamp)
    try{
        const res = await apiService.get<Tenant>(constants.API_BUSINESS, {
            headers: {
              alias : alias,
              session: token,
              timestamp: timestamp ?? String(Date.now()),
              'Content-Type': 'application/json'
            }
          })
    
          const imageHeader = await imageCookie.serialize(res.image)
          const tenantHeader = await tenantCookie.serialize(res.id)
    
          return {
            tenant: res,
            cookies: [imageHeader, tenantHeader]
          }
    }catch(e){
        console.error(e)
        return {
            tenant: null,
            cookies: null
        }
    }
}