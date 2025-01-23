import type { MetaFunction } from "@remix-run/node";
import { TenantSelector } from "~/components";
import { useLoaderData } from "@remix-run/react";
import apiService from "~/config/API";
import { authCookie, timeStampCookie } from "~/utils/cookies.server";
import { constants } from "~/config/constants";
import { authorizeApp } from "~/utils/authorizeApp.server";

export const loader = async ({ request } : {request: Request}) => {
  const cookie = request.headers.get("Cookie");
  let mainToken = await authCookie.parse(cookie);
  let mainTimestamp = await timeStampCookie.parse(cookie)
  let cookiesToSet: string[] = [];
  if(mainToken === null || mainTimestamp === null){
    try{
      const authResult =  await authorizeApp();
      if(authResult?.token && authResult?.timestamp){
        const {token, timestamp, cookies} = authResult;
        mainToken = token;
        mainTimestamp = timestamp;
        cookiesToSet = cookies
      }
    }catch(e){
      return
    }
  }
  const data = await apiService.get(constants.API_BUSINESS, {
    headers: {
      session: mainToken,
      timestamp: mainTimestamp,
      'Content-Type': 'application/json'
    },
  });
 
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Set-Cookie": cookiesToSet.join(', ')
    }})
}



export const meta: MetaFunction = () => {


  return [
    { title: "Menú Digital" },
    { name: "description", content: "Menú y Pickup digital" },
    {
      tagName: "link",
      rel: "icon",
      href: "https://gastronomix-test.infosis.tech/favicon.ico",
    },
  ];
};

export default function Index() {


  const tenants = useLoaderData<typeof loader>();

  return <TenantSelector data={JSON.parse(tenants)}/>
  
}

