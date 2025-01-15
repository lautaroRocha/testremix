import { useEffect, useRef, useContext } from "react"
import { Product, ProductCategory } from "../../@types"
import style from "./categorySection.module.css"
import { ProductCard } from ".."
import { CategoriesContext } from "../WithProductsAndCategories/context"

export interface CategorySectionProps {
  lab: string
  data: Record<string, Product[]>
  select: (param: string) => void
  viewDetail: (param: Product) => void
  selected: Product | null
  selectedCat?: string
  lastPositionY: number
}

const CategorySection = ({
  lab,
  data,
  select,
  viewDetail,
  selected,
  selectedCat,
  lastPositionY
}: CategorySectionProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { categories } = useContext(CategoriesContext)

  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (!mainElement || !titleRef.current) {
      return
    }
    const handleScrol = () => {
      if (mainElement.scrollTop < 180) {
        select("")
      }

      if (titleRef.current?.textContent === selectedCat) {
        if ((titleRef?.current?.getBoundingClientRect()?.y || 0) > lastPositionY) {
          const current = categories.find(
            (cat: ProductCategory) => cat.category_name === titleRef?.current?.textContent
          )
          if (current) {
            select(categories[categories.indexOf(current) - 1]?.category_name || "")
          }
        }
      }
    }

    mainElement.addEventListener("scroll", handleScrol)

    return () => mainElement.removeEventListener("scroll", handleScrol)
  }, [titleRef, selectedCat])

  return (
    <div className={style.categorySection}>
      <h2 ref={titleRef}>{lab}</h2>
      <section
        className={lab === "Destacados" ? style.starGallery : ""}
        id={lab}
        data-category={lab}
      >
        {data[lab].map((prod) => (
          <ProductCard
            product={prod}
            key={prod.id}
            onClick={() => viewDetail(prod)}
            isSelected={selected?.id === prod.id}
          />
        ))}
      </section>
    </div>
  )
}

export default CategorySection
