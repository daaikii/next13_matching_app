import Link from "next/link"

import styles from "./FixedButton.module.scss"

const FixedButton = () => {
  return <Link
    href="/createWork"
    className={styles.button}
  >
    作成する
  </Link>
}

export default FixedButton