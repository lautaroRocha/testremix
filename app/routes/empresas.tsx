import type { MetaFunction } from "@remix-run/node";
import { TenantSelector } from "~/components";
import { useLoaderData } from "@remix-run/react";
import apiService from "~/config/API";
import { authCookie, timeStampCookie } from "~/utils/cookies.server";
import { constants } from "~/config/constants";

export const loader = async ({ request } : {request: any}) => {
  const cookie = request.headers.get("Cookie");
  const token = await authCookie.parse(cookie);
  const timestamp = await timeStampCookie.parse(cookie)

  if (!token) {
    return null
  }
  const data = await apiService.get(constants.API_BUSINESS, {
    headers: {
      session: token,
      timestamp: timestamp,
      'Content-Type': 'application/json'
    },
  });

  return data;
};

export const meta: MetaFunction = () => {


  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {


  const tenants = useLoaderData<typeof loader>();

  return <TenantSelector data={tenants}/>
  
}

