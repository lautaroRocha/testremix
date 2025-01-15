import styles from "./spinner.module.css"
interface SpinnerProps {
  size?: number
}

const Spinner = ({ size = 75 }: SpinnerProps) => {
  return <div className={styles.loader} style={{ width: size }} />
}
export default Spinner
