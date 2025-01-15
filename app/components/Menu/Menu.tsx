import Skeleton from "react-loading-skeleton"
import {
  BranchBadge,
  CategorySection,
  Chips,
  Logo,
  NotFound,
  ProductDetail,
  Searchbar,
  Spinner,
  UpButton
} from ".."
import useMenu from "./hooks/useMenu"
import style from "./menu.module.css"
import { useTranslation } from "react-i18next"
import { BranchOffice, Product, ProductCategory } from "~/@types"
import { useRef } from "react"
import useHeaderHeight from "~/hooks/useHeaderHeight"

const Menu = ({products, categories, image, branch} : {products: Product[], categories: ProductCategory[], image: string, branch: BranchOffice}) => {

  const {
    selectedCategory,
    setSelectedCategory,
    categoriesAsIconOptions,
    goToCategory,
    selectedProduct,
    handleSearch,
    query,
    data,
    loading,
    handleProductSelection,
    handleProductSelectionReset,
    lastPositionY
  } = useMenu(products, categories)

  const { t } = useTranslation("menu")

  const mainRef = useRef<HTMLElement>(null)

  const small = useHeaderHeight(mainRef)

  return (
    <div className={style.menu}>
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
            {t("searchResult")} ( {Object.values(data)[0].length} )
          </p>
        ) : loading ? (
          <Skeleton />
        ) : (
          <Chips data={categoriesAsIconOptions} selected={selectedCategory} select={goToCategory} smallHeader={small}
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
              selectedCat={selectedCategory}
              lastPositionY={lastPositionY}
              key={idx}
            />
          ))
        ) : query ? (
          <NotFound />
        ) : (
          <Spinner />
        )}
        <UpButton />
      </main>
      <ProductDetail product={selectedProduct} reset={handleProductSelectionReset} branch={branch} />
    </div>
  )
}

export default Menu
