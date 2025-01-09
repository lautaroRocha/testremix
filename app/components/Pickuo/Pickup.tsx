import { useContext } from "react"
import {
  BranchBadge,
  CategorySection,
  Chips,
  Logo,
  NotFound,
  OrderBrief,
  ProductDetail,
  Searchbar,
  Spinner,
  UpButton
} from ".."
import usePickup from "./hooks/usePickkup"
import style from "./pickup.module.css"
import { useTranslation } from "react-i18next"
import { OrderContext } from "~/App"

const Pickup = () => {
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
  } = usePickup()

  const { order } = useContext(OrderContext)

  const { t } = useTranslation("menu")

  return (
    <div className={style.pickup}>
      <header>
        <div className={style.headerLeft} />
        <div className={style.headerCenter} />
        <div className={style.headerRight} />
        <section>
          <Logo />
          <BranchBadge />
        </section>
      </header>
      <div>
        <Searchbar handleSearch={handleSearch} placeholder={t("searchPlaceholder")} />
      </div>
      <main>
        {query ? (
          <p className={style.queryTotal}>
            {t("searchResult")} ( {Object.values(data)[0].length} )
          </p>
        ) : (
          <Chips data={categoriesAsIconOptions} selected={selectedCategory} select={goToCategory} />
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
        <UpButton />
      </main>
      {order.length ? <OrderBrief /> : null}
      <ProductDetail product={selectedProduct} reset={handleProductSelectionReset} />
    </div>
  )
}

export default Pickup
