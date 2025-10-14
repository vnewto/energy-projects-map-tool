import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <p>This project is written using React in Vite. It is a dashboard app with Google Maps integration that allows a user to add and update items from a projects list. Each project requires a latitude and longitude input which then gets displayed as a marker on the map. The markers are interactive with a pop-up info winder when clicked on.  </p>
      <a href="/" className={styles.linkToHome}>Back to Home</a>
    </div>
  );
}
