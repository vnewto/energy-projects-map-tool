import { NavLink } from "react-router";
import styles from "./Header.module.css";

export default function Header({ title }) {
  return (
    <>
      <nav>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${isActive ? styles.active : styles.inactive} ${styles.navLink}`}
        >
          Home
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `${isActive ? styles.active : styles.inactive} ${styles.navLink}`}
        >
          About
        </NavLink>
      </nav>
      <h1 className={styles.pageHeader}>{title}</h1>
    </>
  );
}
