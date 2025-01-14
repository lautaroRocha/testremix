import type { MetaFunction } from "@remix-run/node";
import { BusinessSplash } from "~/components";
import apiService from "~/config/API";
import { Tenant } from "~/@types";
import { useLoaderData, type Params } from "@remix-run/react";
import { constants } from "~/config/constants";
import { authCookie, imageCookie, tenantCookie, timeStampCookie } from "~/utils/cookies.server";

export const loader = async({params, request}:{params: Params<'business'>, request: Request}) => {
  const {business} = params;
  const cookie = request.headers.get("Cookie");
  const token = await authCookie.parse(cookie);
  const timestamp = await timeStampCookie.parse(cookie)
  if (!business) {
    throw new Response("Business parameter is missing", { status: 400 });
  }
    try {
      const res = await apiService.get<Tenant>(constants.API_BUSINESS, {
        headers: {
          alias : business,
          session: token,
          timestamp: timestamp,
          'Content-Type': 'application/json'
        }
      })

      const imageHeader = await imageCookie.serialize(res.image)
      const tenantHeader = await tenantCookie.serialize(res.id)

      return new Response(
        JSON.stringify(res),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": [imageHeader, tenantHeader].join(', ')
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
    { title: data.alias }, 
    { rel: "icon", href: data.image }, 
    { name: "description", content: `Welcome to ${data.alias}!` }, 
  ];
};


export default function Business() {


  const data = useLoaderData<typeof loader>();

  return (
    <BusinessSplash image={data.image}/>
  );
}

