import { NavLink } from "react-router";
import { FontAwesomeIcon } from "../../lib/fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faShuffle,
} from "../../lib/fontawesome/solid";
import styles from "./styles.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <p>Puc Dad Joke</p>
      <div className={styles.links}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="/"
        >
          <FontAwesomeIcon icon={faShuffle} />
          Random joke
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Search jokes
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="submit"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Submit new joke
        </NavLink>
      </div>
    </header>
  );
};
