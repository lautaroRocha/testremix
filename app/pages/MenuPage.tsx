import type { MetaFunction } from "@remix-run/node";
import { Params, useLoaderData } from "@remix-run/react";
import apiService from "~/config/API";
import { constants } from "~/config/constants";
import { Product, ProductCategory } from "~/@types";
import { Menu, Spinner } from "~/components";
import {  ClientOnly  }  from  "remix-utils/client-only" ;
import { withBackButton } from "~/components/WithBackButton/WithBackButton";
import { capitalizeWords } from "~/utils/capitalize";
import { getAuthAndTenant } from "~/utils/getAuthAndTenant";

export const loader = async ({ params, request }: { params: Params<any>, request: any }) => {
    const { branch, business } = params;
    const {mainTenant, mainTimestamp, cookiesToSend, tenantImage, mainToken} = await getAuthAndTenant(request, business||'') 


    const getBranches = async (branch: string) => {
        try {
            const res = await apiService.get<any>(`${constants.API_BRANCHES}/${branch}`, {
                headers: {
                    tenant: mainTenant,
                    session: mainToken,
                    timestamp: mainTimestamp,
                    'Content-Type': 'application/json'
                }
            });
            return res;
        } catch (error) {
            console.error("Error fetching branches:", error);
            throw new Response("Failed to fetch branches", { status: 500 });
        }
    };

    const getProducts = async (branchId: string) => {
        try {
            const res = await apiService.get<Product[]>(constants.API_PRODUCTS, {
                headers: { branchId,  
                    tenant: mainTenant,
                    session: mainToken,
                    timestamp: mainTimestamp,
                    'Content-Type': 'application/json'}
            });
            return res;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Response("Failed to fetch products", { status: 500 });
        }
    };

    const getCategories = async () => {
        try {
            const res = await apiService.get<ProductCategory[]>(constants.API_CATEGORIES, {
                headers: {
                    tenant: mainTenant,
                    session: mainToken,
                    timestamp: mainTimestamp,
                    'Content-Type': 'application/json'
                }
            });
            return res;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw new Response("Failed to fetch categories", { status: 500 });
        }
    };

    const categoriesWithProducts = (categories: ProductCategory[], products: Product[]) => {
        return categories
            .filter((cat) => products.some((pro) => pro.category_id === cat.id))
            .sort((a, b) => a.category_name.localeCompare(b.category_name));
    };


    try {
        const branchData = await getBranches(branch || "");
        const branchId = branchData?.id || "";

        const [products, categories] = await Promise.all([
            getProducts(branchId),
            getCategories()
        ]);

        const insertCategoryOnProduct = (): Product[] => {
            return products
              .filter((prod) => prod.category_id && prod.product_name)
              .map((prod) => ({
                ...prod,
                product_category: categories.find((cat) => cat.id === prod.category_id)!
              }))
          }

        return new Response(
            JSON.stringify( {
                products: insertCategoryOnProduct(),
                categories: categoriesWithProducts(categories, products),
                tenantImage,
                branchData
            }), {
                headers: {
                    'Set-Cookie': cookiesToSend.join(', ')
                }
            }
        )
        
        
       ;
    } catch (error) {
        console.error("Loader error:", error);
        throw new Response("Failed to load data", { status: 500 });
    }
};

export const meta: MetaFunction = ({params, data}) => {

    const {tenantImage} = JSON.parse(data as string)

    return [
        { title: `${capitalizeWords(params.business || '')} - ${capitalizeWords(params.branch || '').replaceAll('-', ' ')} - Menú Digital` },
        { name: "description", content: "Menú digital" },
        { tagName: 'link', rel: "icon", href: tenantImage }, 

    ];
};

export default function Index() {

    const data = useLoaderData<typeof loader>();
    const { products, categories, tenantImage, branchData } = JSON.parse(data)

    return <ClientOnly fallback={<Spinner />}>
                { () =>  withBackButton(<Menu categories={categories} products={products} image={tenantImage} branch={branchData}/>, true, true)}
            </ClientOnly>

}

