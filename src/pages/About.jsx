import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <img
        src="../src/assets/aerial-view.jpg"
        className={styles.image}
        alt="buildings aerial view"
      ></img>
      <div>
        <p>
          This map dashboard is intended to be used by any individual or company
          that manages location-based projects. Some examples could include
          warehouses, retail sites, or medical practices. This particular
          prototype uses wind farms as an example. The dataset is fake and was
          generated using <a href="https://www.mockaroo.com/">Mockaroo</a>.
        </p>
        <p>
          The code is written using <a href="https://react.dev/">React</a> in{" "}
          <a href="https://vite.dev/">Vite</a>. The app integrates Google Maps
          which allows a user to view the location of each of their projects.
          Each project has a latitude and longitude coordinate and gets
          displayed as a marker on the map. The markers are interactive with a
          pop-up info window when clicked on. A form with filter options allows
          the user to change which projects are displayed. A user can also
          update their existing projects or add completely new ones to the
          dataset.{" "}
        </p>
        <br />
        <div className={styles.linkContainer}>
          <a href="/" className={styles.linkToHome}>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
