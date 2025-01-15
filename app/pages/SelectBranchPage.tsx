import type { MetaFunction } from "@remix-run/node";
import { BranchSelector } from "~/components";
import { Params, useLoaderData } from "@remix-run/react";
import apiService from "~/config/API";
import { BranchOffice } from "~/@types";
import { constants } from "~/config/constants";
import { capitalizeWords } from "~/utils/capitalize";
import { getAuthAndTenant } from "~/utils/getAuthAndTenant";

export const loader = async( {request, params}:{request: Request, params:Params<'business'>} ) => {
  const {business} = params;
  const {mainTenant, mainTimestamp, cookiesToSend, tenantImage, mainToken} = await getAuthAndTenant(request, business||'') 
    try {
      const res = await apiService.get<BranchOffice[]>(constants.API_BRANCHES, {
        headers: {
          tenant : mainTenant,
          session: mainToken,
          timestamp: mainTimestamp,
          'Content-Type': 'application/json'
        }
      })
      return new Response(JSON.stringify({data: res, alias: business, image: tenantImage }), {
        headers: {
          'Set-Cookie': cookiesToSend.join(', ')
        }
      })
    } catch (e) {
      console.error(e)
      return null
    }
}


export const meta: MetaFunction = ({data}: {data:any}) => {
  return [
    { title: capitalizeWords(JSON.parse(data).alias)},
    { tagName: 'link', rel: "icon", href: JSON.parse(data).image }, 
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function BusinessSeleccionarSucursal() {

  const branches = useLoaderData<typeof loader>();

  if(!branches)return 

  const {data, image} = JSON.parse(branches)

  return (
    <BranchSelector data={data} image={image} />
  );
}

