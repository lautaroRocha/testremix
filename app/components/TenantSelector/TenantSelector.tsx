import style from "./tenantSelector.module.css"
import { Tenant } from "../../@types"
import branchArrow from "../../assets/brancharrow.svg"
import { Logo, NotFound, Searchbar } from ".."
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useTranslation } from "react-i18next"
import useTenantSelector from "./hooks/useTenantSelector"

const TenantSelector = ({data}:{data:Tenant[] | undefined}) => {
  const { tenants, handleSearch, loading, confirmTenant } = useTenantSelector(data)

  const { t } = useTranslation("tenantSelector")


  return (
    <div className={style.tenantSelector}>
      <header>{t("title")}</header>
      <Searchbar handleSearch={handleSearch} placeholder={t("searchPlaceholder")} />
      <main>
        <p>
          {loading ? (
            <Skeleton style={{ width: "15ch", height: "1.5rem" }} />
          ) : tenants.length ? (
            `${t("title")} ( ${tenants.length} )`
          ) : (
            ""
          )}
        </p>
        {loading ? (
          <>
            <br />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
            <Skeleton style={{ width: "100%", height: "7rem" }} />
          </>
        ) : tenants.length ? (
          tenants.map((item) => (
            <SelectableTenant tenant={item} select={confirmTenant} key={item.id} />
          ))
        ) : (
          <NotFound />
        )}
      </main>
    </div>
  )
}

export default TenantSelector

const SelectableTenant = ({
  tenant,
  select
}: {
  tenant: Tenant
  select: (param: Tenant) => void
}) => {
  const { alias, image } = tenant

  return (
    <article onClick={() => select(tenant)}>
      <section>
        <Logo imageUrl={image} />
        <h2>{alias}</h2>
      </section>
      <section>
        <img className={style.arrow} src={branchArrow} alt="" draggable={false} />
      </section>
    </article>
  )
}
