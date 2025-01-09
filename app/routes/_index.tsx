import { authCookie, timeStampCookie } from "~/utils/cookies.server";
import { LoaderFunction, redirect} from "react-router-dom";
import { getAccessToken } from "~/utils/getToken.server";
import { Spinner } from "~/components";

export const loader: LoaderFunction = async ({request}) => {
  const token = await getAccessToken(request); 
  if (token) {
    const tokenHeader = await authCookie.serialize(JSON.stringify(token.access_token));
    const timestampHeader = await timeStampCookie.serialize(String(Date.now()));  
    return redirect("/empresas", {
      headers: new Headers({
        "Set-Cookie": [tokenHeader, timestampHeader].join(", "),
      }),
    }); 
  }else{
    return redirect("/empresas")
  }
};


export default function Index() {
 
    return <Spinner />; 
  
}

