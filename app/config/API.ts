import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import curlirize from 'axios-curlirize';
// import { constants } from "./constants"

const API_BASE_URL = 'http://localhost:8080/api'

curlirize(axios)

const apiService = {
  get: async <T>(endpoint: string, config: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.get(
        `${API_BASE_URL}${endpoint}`,
        config
      )
      return response.data
    } catch (error) {
      console.error("Error in GET request:", error)
      throw error
    }
  },
  post: async <T, N>(endpoint: string, data: N, config: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.post(
        `${API_BASE_URL}/${endpoint}`,
        data,
        config
        // addAccessTokenAndTenantToConfig(config)
      )
      return response.data
    } catch (error) {
      console.error("Error in GET request:", error)
      throw error
    }
  }
}
export default apiService

// const addAccessTokenAndTenantToConfig = (obj: AxiosRequestConfig) => {
//   const accessToken = Cookies.get("accessToken")
//   const timeStamp = Cookies.get("timestamp")
//   const tenant = Cookies.get("tenant")
//   if (!obj.headers) {
//     obj.headers = {}
//   }

//   obj.headers["session"] = `${accessToken}`
//   obj.headers["tenant"] = tenant || ""
//   obj.headers["timestamp"] = timeStamp || ""

//   return obj
// }
