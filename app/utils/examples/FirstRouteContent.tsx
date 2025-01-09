import { useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { setUserData } from "../../redux/slices/userSlice"
import { Button, Logo, Spinner } from "../../components"

const OTHER_USER = {
  userName: "Michi Miau",
  userMail: "meowmeow@gmail.com",
  userPic: "https://gifdb.com/images/high/cute-cat-typing-computer-working-tr4yvonsldac7mtz.gif"
}

const FirstRouteContent = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<string>("")
  const dispatch = useAppDispatch()

  const tryApi = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api")
      setApiResponse(await res.text())
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const tryRedux = () => {
    dispatch(setUserData(OTHER_USER))
  }

  return (
    <>
      <Logo />
      <section className="buttons">
        <div>
          <Button label="Try the API" onClick={tryApi} />
          <Button label="Try Redux" onClick={tryRedux} />
        </div>
        <>{loading ? <Spinner /> : apiResponse ? <code> {apiResponse} </code> : <></>}</>
      </section>
    </>
  )
}

export default FirstRouteContent
