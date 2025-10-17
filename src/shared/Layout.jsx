import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, title }) {
  return (
    <>
      <Header title={title}></Header>
      {children}
      <Footer></Footer>
    </>
  );
}
