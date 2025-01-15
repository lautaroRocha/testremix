import Skeleton from "react-loading-skeleton"
import { useContext, useMemo, useRef } from "react"
import {
  BranchBadge,
  CategorySection,
  Chips,
  Logo,
  NotFound,
  OrderBrief,
  OrderDetail,
  ProductDetail,
  Searchbar,
  Spinner,
  UpButton
} from ".."
import usePickup from "./hooks/usePickkup"
import style from "./pickup.module.css"
import { OrderContext } from "../../App"
import { useTranslation } from "react-i18next"
import useHeaderHeight from "../../hooks/useHeaderHeight"
import { useSearchParams } from "react-router-dom"
import { BranchOffice, Product, ProductCategory } from "~/@types"
import useOrder from "~/hooks/useOrder"
import { withBackButton } from "../WithBackButton/WithBackButton"
import { PickupContext } from "~/root"
import { useLoaderData } from "@remix-run/react"

const PickupWrapper = ({products, categories, image, branch} : {products: Product[], categories: ProductCategory[], image: string, branch: BranchOffice, isOrder?: boolean}) => {
  
  const contextValues = useOrder()

  const {isOrder} = useLoaderData<any>()

  return(
    <PickupContext.Provider
      value={{
        isPickup: true
      }}
    >
    <OrderContext.Provider value={{ ...contextValues }}>
      { isOrder ? <OrderDetail branchData={branch}/> : withBackButton(<Pickup categories={categories} products={products} image={image} branch={branch}/>, true, true)    }
 </OrderContext.Provider>
     </PickupContext.Provider>


  )
}


const Pickup = ({products, categories, image, branch} : {products: Product[], categories: ProductCategory[], image: string, branch: BranchOffice}) => {
  const {
    selectedCategory,
    setSelectedCategory,
    data,
    categoriesAsIconOptions,
    goToCategory,
    selectedProduct,
    handleProductSelection,
    handleProductSelectionReset,
    handleSearch,
    query,
    loading,
    lastPositionY
  } = usePickup(products, categories)

  const { order, selectedFromOrder } = useContext(OrderContext)

  const [searchParams] = useSearchParams()

  const { t } = useTranslation("menu")

  const mainRef = useRef<HTMLElement>(null)

  const small = useHeaderHeight(mainRef)




  return (
      <div className={style.pickup}>
        <header className={small ? style.small : ""}>
          <div className={style.headerLeft} />
          <div className={style.headerCenter} />
          <div className={style.headerRight} />
          <section>
            <Logo imageUrl={image}/>
            <BranchBadge data={branch}/>
          </section>
        </header>
        <div>
          <Searchbar handleSearch={handleSearch} placeholder={t("searchPlaceholder")} />
        </div>
        <main ref={mainRef}>
          {query ? (
            <p className={style.queryTotal}>
              {t("searchResult")} ( {Object.values(data)[0]?.length} )
            </p>
          ) : loading ? (
            <Skeleton />
          ) : (
            <Chips
              data={categoriesAsIconOptions}
              selected={selectedCategory}
              select={goToCategory}
              smallHeader={small}
            />
          )}
          {query && !loading ? (
            <></>
          ) : (
            <>
              <br></br>
              <br></br>
            </>
          )}
          {loading ? (
            <Spinner />
          ) : Object.keys(data).length && Object.values(data)[0].length ? (
            Object.keys(data).map((lab, idx) => (
              <CategorySection
                lab={lab}
                data={data}
                selected={selectedProduct}
                select={setSelectedCategory}
                viewDetail={handleProductSelection}
                key={idx}
                lastPositionY={lastPositionY}
              />
            ))
          ) : query ? (
            <NotFound />
          ) : (
            <Spinner />
          )}
          <UpButton
            right={searchParams.get("order") ? "27%" : undefined}
            bottom={order?.length ? "7.5rem" : ""}
          />
        </main>
        {order?.length ? <OrderBrief branchData={branch} /> : null}
        <ProductDetail
          product={selectedProduct || selectedFromOrder?.product || null}
          reset={handleProductSelectionReset}
          branch={branch}
        />
      </div>

  )
}

export default PickupWrapper
