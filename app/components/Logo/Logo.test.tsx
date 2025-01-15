import "@testing-library/jest-dom"
import Logo from "./Logo"
import { RenderResult, render } from "@testing-library/react"

describe("< Logo />", () => {
  let component: RenderResult

  test("should render", () => {
    component = render(<Logo />)
    expect(component.container).toBeInTheDocument()
  })
})
