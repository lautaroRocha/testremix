import { authorizeApp } from "./authorizeApp.server";
import { authCookie, imageCookie, tenantCookie, timeStampCookie } from "./cookies.server";
import { getTenant } from "./getTenant.server";

export const getAuthAndTenant = async(request: Request, business: string) => {
    const cookie = request.headers.get("Cookie");
    let mainToken = await authCookie.parse(cookie);
    let mainTimestamp = await timeStampCookie.parse(cookie)
    let mainTenant = await tenantCookie.parse(cookie)
    let tenantImage = await imageCookie.parse(cookie);
    let cookiesToSend : string[] = [];
    if(mainToken === null){
      try{
        const authResult =  await authorizeApp();
        if(authResult?.token && authResult?.timestamp){
          const {token, timestamp, cookies} = authResult;
          mainToken = token;
          mainTimestamp = timestamp;
          cookiesToSend = cookies
        }
        }catch(e){
            return {
                mainToken : '',
                mainTimestamp : '',
                tenantImage : '',
                cookiesToSend,
                mainTenant : '',
            }
        }
    }
    if(mainTenant === null){
      const {cookies, tenant} = await getTenant(business || '', mainToken, mainTimestamp)
      cookiesToSend = [...cookiesToSend, ...cookies || []];
      mainTenant = tenant?.id;
      tenantImage = tenant?.image
    }

    return {
        mainToken,
        mainTimestamp,
        tenantImage,
        cookiesToSend,
        mainTenant
    }
}