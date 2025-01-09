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

const Menu = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    data,
    categoriesAsIconOptions,
    goToCategory,
    selectedProduct,
    handleSearch,
    query,
    loading,
    handleProductSelection,
    handleProductSelectionReset,
    lastPositionY
  } = useMenu()

  const { t } = useTranslation("menu")

  return (
    <div className={style.menu}>
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
        ) : loading ? (
          <Skeleton />
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
      <ProductDetail product={selectedProduct} reset={handleProductSelectionReset} />
    </div>
  )
}

export default Menu
