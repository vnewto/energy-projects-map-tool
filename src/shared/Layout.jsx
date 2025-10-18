import Header from "./Header";
import Footer from "./Footer";
import styles from './Layout.module.css';

export default function Layout({ children, title }) {
  return (
    <div className={styles.layout}>
      <Header title={title}></Header>
      {children}
      <Footer></Footer>
    </div>
  );
}
