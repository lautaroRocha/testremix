import type { MetaFunction } from "@remix-run/node";
import { SelectedBranch } from "~/components";
import { Params, useLoaderData } from "@remix-run/react";
import apiService from "~/config/API";
import { BranchOffice } from "~/@types";
import { constants } from "~/config/constants";
import { getAuthAndTenant } from "~/utils/getAuthAndTenant";
import { capitalizeWords } from "~/utils/capitalize";


export const loader = async( {params, request}:{params : Params<any>,request: Request} ) => {
  const {branch, business} = params;
  const {mainTenant, mainTimestamp, cookiesToSend, tenantImage, mainToken} = await getAuthAndTenant(request, business||'') 
    try {
        const res = await apiService.get<BranchOffice>(constants.API_BRANCHES + "/" + branch, {
            headers: {
                tenant : mainTenant,
                session: mainToken,
                timestamp: mainTimestamp,
                'Content-Type': 'application/json'
            }
        })
      return new Response(JSON.stringify({res, tenantImage, business, branch}), {
        headers: {
          'Set-Cookie': cookiesToSend.join(', ')
        }
      })
    } catch (e) {
      console.error(e)
      return null
    }
}


export const meta: MetaFunction = ({data}:{data:any}) => {

  const {business, tenantImage, branch} = JSON.parse(data)
  return [
    { title: `${capitalizeWords(business)} - ${capitalizeWords(branch)}`},
    { tagName: 'link', rel: "icon", href: tenantImage }, 
    { name: "description", content: `Menú y Pickup digital - ${capitalizeWords(business)} - ${capitalizeWords(branch)}` },
  ];
};

export default function BusinessSeleccionarSucursal() {

  const data = useLoaderData<typeof loader>();

  if(!data)return 

  const {res, tenantImage} = JSON.parse(data)

  return (
    <SelectedBranch data={res} image={tenantImage}/>
  );
}

