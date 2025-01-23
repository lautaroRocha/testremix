import style from "./searchbar.module.css"
import searchIcon from "/assets/search.svg"
import yellowSearchIcon from "/assets/yellowSearch.svg"
import { useContext } from "react"
import { PickupContext } from "../../App"

export interface SearchbarProps {
  handleSearch: (param: string) => void
  placeholder?: string
}

const Searchbar = ({ handleSearch, placeholder = "Busca..." }: SearchbarProps) => {
  const { isPickup } = useContext(PickupContext)

  return (
    <div className={`${style.searchbar} ${isPickup ? style.pickup : ""}`}>
      <input
        type="search"
        name="search-branch"
        id="webmenu-branch-search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <img src={isPickup ? yellowSearchIcon : searchIcon} alt="" draggable={false} />
    </div>
  )
}

export default Searchbar
