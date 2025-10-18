import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p>Copyright Valerie Newton 2025</p>
      <div>
        <a href="https://github.com/vnewto">
          <FontAwesomeIcon className={styles.faIcon} icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/valerie-newton-a250879b/">
          <FontAwesomeIcon className={styles.faIcon} icon={faLinkedin} />
        </a>
      </div>
    </div>
  );
}
