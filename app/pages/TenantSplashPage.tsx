import type { MetaFunction } from "@remix-run/node";
import { BusinessSplash } from "~/components";
import { useLoaderData, type Params } from "@remix-run/react";
import { authCookie, timeStampCookie } from "~/utils/cookies.server";
import { capitalizeWords } from "~/utils/capitalize";
import { authorizeApp } from "~/utils/authorizeApp.server";
import { getTenant } from "~/utils/getTenant.server";

export const loader = async({params, request}:{params: Params<'business'>, request: Request}) => {
  const {business} = params;
  const cookie = request.headers.get("Cookie");
  let mainToken = await authCookie.parse(cookie);
  let mainTimestamp = await timeStampCookie.parse(cookie)
  let cookiesToSend : string[] = [];
  if (!business) {
    throw new Response("Business parameter is missing", { status: 400 });
  }
  if(mainToken === null){
    try{
      const authResult =  await authorizeApp();
      if(authResult?.token && authResult?.timestamp){
        const {token, timestamp, cookies} = authResult;
        mainToken = token;
        mainTimestamp = timestamp ?? String(Date.now());
        cookiesToSend = cookies
      }
    }catch(e){
      return
    }
  }
    try {
      const {tenant, cookies} = await getTenant(business, mainToken, mainTimestamp)
      cookiesToSend = [...cookiesToSend, ...cookies || []]
      return new Response(
        JSON.stringify(tenant),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": cookiesToSend.join(', ')
          },
        }
      );
    } catch (e) {
      console.error(e)
      throw new Response("Failed to fetch business data", { status: 500 });
    }
}

export const meta: MetaFunction = ({ data }: { data: any }) => {

  if (!data) {
    return [{ title: "Business Not Found" }];
  }

  return [
    { title: capitalizeWords(data.alias) }, 
    { tagName: 'link', rel: "icon", href: data.image }, 
    { name: "description", content: `Menú y Pickup digital - ${data.alias}` }, 
  ];
};


export default function Business() {


  const data = useLoaderData<typeof loader>();

  return (
    <BusinessSplash image={data.image}/>
  );
}

