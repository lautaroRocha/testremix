import type { MetaFunction } from "@remix-run/node";
import { Params, useLoaderData } from "@remix-run/react";
import apiService from "~/config/API";
import { authCookie, tenantCookie, timeStampCookie } from "~/utils/cookies.server";
import { constants } from "~/config/constants";
import { BranchOffice, Product, ProductCategory } from "~/@types";
import { Menu } from "~/components";

export const loader = async ({ params, request }: { params: Params<'branch'>, request: any }) => {
    const cookie = request.headers.get("Cookie");
    const token = await authCookie.parse(cookie);
    const timestamp = await timeStampCookie.parse(cookie);
    const tenant = await tenantCookie.parse(cookie);
    const { branch } = params;

    if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }

    const getBranches = async (branch: string) => {
        try {
            const res = await apiService.get<any>(`${constants.API_BRANCHES}/${branch}`, {
                headers: {
                    tenant,
                    session: token,
                    timestamp,
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
                    tenant,
                    session: token,
                    timestamp,
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
                    tenant,
                    session: token,
                    timestamp,
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

        return {
            products,
            categories: categoriesWithProducts(categories, products)
        };
    } catch (error) {
        console.error("Loader error:", error);
        throw new Response("Failed to load data", { status: 500 });
    }
};

export const meta: MetaFunction = () => {



    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {

    const { products, categories } = useLoaderData<typeof loader>();

    return <Menu categories={categories} products={products} />

}

