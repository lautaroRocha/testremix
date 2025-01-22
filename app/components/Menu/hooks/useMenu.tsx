import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "@remix-run/react"
import { Product, ProductCategory } from "../../../@types"
import { useAppSelector } from "../../../redux/hooks"
import { useTranslation } from "react-i18next"
import { useWindowSize } from "../../../hooks/useWindowSize"

const useMenu = (data: Product[], categories: ProductCategory[]) => {
  const { selected } = useAppSelector((state) => state.branch)
  const { business } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [parsedProducts, setParsedProducts] = useState<Record<string, Product[]>>({})
  const [products, setProducts] = useState<Product[]>(data)

  const [lastPositionY, setLastPositionY] = useState<number>(0)

  const { t } = useTranslation("categorySection")
  const FAV_LABEL = t("favLabel")

  const navigate = useNavigate()
  const [_searchParams, setSearchParams] = useSearchParams()
  const { width } = useWindowSize()

  useEffect(() => {
    if (query) {
      setProducts(data.filter((item) => item.product_name.toLowerCase().includes(query)))
    } else {
      setProducts(data)
    }
  }, [query, data])

  useEffect(() => {
    setLoading(true)
    if (categories.length && products.length && !Object.keys(parsedProducts).length) {
      setParsedProducts(groupByCategory())
      setLoading(false)
    }
  }, [categories, products])

  useEffect(() => {
    const { search } = window?.location
    const searchParams = new URLSearchParams(search)
    const elementId = searchParams.get("element")
    if (!elementId) {
      setSelectedProduct(null)
    }
    if (categories.length && products.length && Object.values(parsedProducts)) {
      if ((elementId && !selectedProduct) || (elementId && selectedProduct?.id !== elementId)) {
        setSelectedProduct(data.find((prod) => prod.id === elementId) || null)
      }
    }
  }, [window ? window?.location?.search : null, products, categories, parsedProducts])

  useEffect(() => {
    const responsiveRootMargin =
      width && width > 950 ? "-260px 0px -65% 0px" : "-215px 0px -60% 0px"
    const categoriesTitles = document.querySelectorAll("div>h2")
    const options = {
      root: null,
      rootMargin: responsiveRootMargin,
      threshold: [0]
    }
    const previousPositions = new Map()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const currentTop = entry.boundingClientRect.top
        const previousTop = previousPositions.get(entry.target) || 0
        previousPositions.set(entry.target, currentTop)
        if (entry.isIntersecting) {
          if (!entry.target.textContent || entry.target.textContent === FAV_LABEL) {
            setSelectedCategory("")
          } else {
            if (currentTop < previousTop) {
              if (entry.target.textContent !== selectedCategory) {
                setLastPositionY(currentTop)
                setSelectedCategory(entry.target.textContent || "")
              }
            } else if (currentTop > previousTop) {
              const current = categories.find(
                (cat) => cat.category_name === entry.target.textContent
              )
              if (current) {
                setSelectedCategory(
                  categories[categories.indexOf(current) - 1]?.category_name || ""
                )
              } else {
                setSelectedCategory("")
              }
            }
          }
        }
      })
    }, options)

    if (categoriesTitles) {
      categoriesTitles.forEach((h2) => {
        observer.observe(h2)
      })
    }

    return () => {
      categoriesTitles.forEach((h2) => {
        observer.unobserve(h2)
      })
    }
  }, [parsedProducts, width])

  const groupByCategory = () => {
    if (query) {
      return { " ": products }
    }
    const withCategory = insertCategoryOnProduct()
    const parsedByCategory: Record<string, Product[]> = {}
    if (withCategory.some((item) => item.favorite)) {
      parsedByCategory[FAV_LABEL] = []
    }
    withCategory.forEach((item) => {
      if (!item.product_category || !item.product_name) {
        return
      }
      const { favorite, product_category } = item

      if (favorite) {
        parsedByCategory[FAV_LABEL].push(item)
        return
      }
      if (!parsedByCategory[product_category.category_name]) {
        parsedByCategory[product_category.category_name] = []
      }

      parsedByCategory[product_category.category_name].push(item)
    })
    return reorderCategories(parsedByCategory)
  }


  const insertCategoryOnProduct = (): Product[] => {
    return products
      .filter((prod) => prod.category_id && prod.product_name)
      .map((prod) => ({
        ...prod,
        product_category: categories.find((cat) => cat.id === prod.category_id)!
      }))
  }


  const reorderCategories = (groupedCategories: Record<string, Product[]>) => {
    const reordered: Record<string, Product[]> = {}
    const orderedCategories = categories.map((cat) => cat.category_name)

    if (groupedCategories[FAV_LABEL]) {
      reordered[FAV_LABEL] = groupedCategories[FAV_LABEL]
    }

    orderedCategories.forEach((categoryName) => {
      if (groupedCategories[categoryName]) {
        reordered[categoryName] = groupedCategories[categoryName]
      }
    })

    Object.keys(groupedCategories).forEach((key) => {
      if (!reordered[key]) {
        reordered[key] = groupedCategories[key]
      }
    })

    return reordered
  }

  const categoriesAsIconOptions = categories.map((cat) => {
    return { label: cat.category_name, value: cat.id, icon: cat.icon }
  })

  const goToCategory = (param: string) => {
    const label = categories.find((cat) => cat.id === param)?.category_name
    if (label) {
      const mainElement = document.querySelector("main")
      const headings = mainElement?.querySelectorAll("h2")
      const targetHeading = Array.from(headings!).find((heading) => heading.textContent === label)

      if (targetHeading && mainElement) {
        const mainRect = mainElement.getBoundingClientRect()
        const headingRect = targetHeading.getBoundingClientRect()
        const offset = headingRect.top - mainRect.top + mainElement.scrollTop
        const goingUp = offset < mainElement.scrollTop
        const mobile = window?.innerWidth <= 950
        mainElement.scrollTo({
          top: mobile && goingUp ? offset - 50 : offset + 10,
          behavior: "smooth"
        })
      }
    }
  }

  const handleSearch = (param: string) => setQuery(param.trim().toLowerCase())

  const handleProductSelection = (param: Product) => {
    setSelectedProduct(param)
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('element', param.id);
    window.history.replaceState({}, '', currentUrl.toString());
  }

  const handleProductSelectionReset = () => {
    const url = new URL(window?.location.href)
    url.search = ""
    window?.history.pushState({}, "", url)
    setSelectedProduct(null)
  }

  return {
    selectedBranch: selected,
    business,
    loading,
    selectedCategory,
    setSelectedCategory,
    data: parsedProducts,
    categoriesAsIconOptions,
    goToCategory,
    selectedProduct,
    handleProductSelection,
    handleSearch,
    query,
    products,
    handleProductSelectionReset,
    lastPositionY
  }
}

export default useMenu
