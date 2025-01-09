export interface Option {
  label: string
  value: string
}

export interface BranchOffice {
  id: string
  tenantId: string
  branch_name: string
  address: string
  location: string
  image: string
  has_pickup: boolean
  currency_code: CurrencyISO
}

export interface Product {
  id: string
  tenant_id: string
  product_name: string
  description: string
  image: string
  price: number
  favorite: boolean
  category_id: string
  product_category: ProductCategory
}

export interface ProductCategory {
  id: string
  tenantId: string
  category_name: string
  icon: string
}

export interface Tenant {
  id: string
  image: string
  alias: string
}

export type CurrencyISO = "USD" | "ARS" | "EUR"
