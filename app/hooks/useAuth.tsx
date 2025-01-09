// import { useEffect, useState } from "react";
// import Cookies from "js-cookie"; 
// import { useAppDispatch } from "~/redux/hooks";
// import apiService from "~/config/API";
// import { setIsLogged } from "~/redux/slices/tenantSlice";
// import { constants } from "~/config/constants";
// // import { authCookie, timeStampCookie } from "~/utils/cookies.server";

// interface AuthResponse {
//   access_token: string
// }

// const useAuth = () => {
//   const dispatch = useAppDispatch();

//   const [loading, setLoading] = useState<boolean>(false)

//   const getAccessToken = async () => {
//     setLoading(true)
//     try {
//       const res = await apiService.get<AuthResponse>(constants.API_AUTH, {});
//       Cookies.set("accessToken", JSON.stringify(res.access_token), { path: "/" });
//       Cookies.set("timestamp", String(Date.now()), { path: "/" });
//       // authCookie.serialize(JSON.stringify(res.access_token))
//       // timeStampCookie.serialize( String(Date.now()))
//       dispatch(setIsLogged(true));
//     } catch (e) {
//       console.error(e);
//     }finally{
//       setLoading(false)
//     }
//   };

//   useEffect(() => {
//     if (!Cookies.get("accessToken")) {
//       getAccessToken(); 
//     }
//   }, []);

//   return loading
// };

// export default useAuth;
