import "@testing-library/jest-dom"
import Button from "./Button"
import { screen, RenderResult, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

const DEMO_TEXT = "Testing Button"

describe("< Button />", () => {
  let component: RenderResult

  test("should render text passed as label prop", () => {
    component = render(<Button label={DEMO_TEXT} />)
    expect(component.container).toHaveTextContent(DEMO_TEXT)
  })

  test("Should called onClick prop when clicked", async () => {
    const mockedFunction = vi.fn(() => {})
    component = render(<Button label={DEMO_TEXT} onClick={mockedFunction} />)
    const button = component.getByRole("button")
    await userEvent.click(button)
    expect(mockedFunction).toHaveBeenCalled()
  })

  test("Button should be disabled if type=disabled in props", async () => {
    const mockedFunction = vi.fn(() => {})
    render(<Button label={DEMO_TEXT} type="disabled" onClick={mockedFunction} />)
    const button = component.getByRole("button")
    await userEvent.click(button)
    expect(mockedFunction).not.toHaveBeenCalled()
  })

  test("Button should be of type=button unless specified 'submit' on props", () => {
    render(<Button label={DEMO_TEXT} type="primary" onClick={() => {}} />)
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("type", "button")
  })

  test("Button should be of type=submit when specified", () => {
    render(<Button label={DEMO_TEXT} type="submit" onClick={() => {}} />)
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("type", "submit")
  })

  test("Button should have CSS class according to its size property", () => {
    render(<Button label={DEMO_TEXT} type="submit" size="larger" onClick={() => {}} />)
    const button = screen.getByRole("button")
    const hashedClasses = button.className
    expect(hashedClasses).include("button-larger")
  })
})
