import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <p>
        This map dashboard is meant to simulate the experience of an employee at
        a company that has location-based projects. Some examples could include
        warehouses, retail sites, or medical practices. This particular
        prototype uses wind farms as an example. The dataset is fake and was
        generated using <a href="https://www.mockaroo.com/">Mockaroo</a>.
      </p>
      <p>
        The code is written using <a href="https://react.dev/">React</a> in{" "}
        <a href="https://vite.dev/">Vite</a>. It is a map dashboard app with
        Google Maps integration that allows a user to add and update items from
        the projects list. Each project has a latitude and longitude coordinate
        and gets displayed as a marker on the map. The markers are interactive
        with a pop-up info window when clicked on. A form with filter options
        allows the user to change which projects are displayed.{" "}
      </p>
      <br />
      <div className={styles.linkContainer}>
        <a href="/" className={styles.linkToHome}>
          Back to Home
        </a>
      </div>
    </div>
  );
}
