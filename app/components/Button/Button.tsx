import style from "./Button.module.css"

export interface ButtonProps {
  type?: "primary" | "secondary" | "disabled" | "submit"
  size?: "small" | "medium" | "large" | "larger"
  label?: string
  onClick?: any
}

const Button = ({ type = "primary", size = "medium", label = "Button", onClick }: ButtonProps) => {
  return (
    <button
      id={`Button-${label}-btn`}
      type={type === "submit" ? "submit" : "button"}
      disabled={Boolean(type === "disabled")}
      className={[style["button"], style[`button-${size}`], style[`${type}`]].join(" ")}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
