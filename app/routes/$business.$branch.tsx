import type { MetaFunction } from "@remix-run/node";
import { SelectedBranch } from "~/components";
import { Params, useLoaderData } from "@remix-run/react";
import apiService from "~/config/API";
import { BranchOffice } from "~/@types";
import { constants } from "~/config/constants";
import { authCookie, tenantCookie, timeStampCookie } from "~/utils/cookies.server";


export const loader = async( {params, request}:{params : Params<'branch'>,request: Request} ) => {
  const cookie = request.headers.get("Cookie");
  const token = await authCookie.parse(cookie);
  const timestamp = await timeStampCookie.parse(cookie);
  const tenant = await tenantCookie.parse(cookie);
  const {branch} = params;
    try {
        const res = await apiService.get<BranchOffice>(constants.API_BRANCHES + "/" + branch, {
            headers: {
                tenant : tenant,
                session: token,
                timestamp: timestamp,
                'Content-Type': 'application/json'
            }
        })
      return res
    } catch (e) {
      console.error(e)
      return null
    }
}


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function BusinessSeleccionarSucursal() {

  const branch = useLoaderData<typeof loader>();

  if(!branch)return 

  return (
    <SelectedBranch data={branch}/>
  );
}

