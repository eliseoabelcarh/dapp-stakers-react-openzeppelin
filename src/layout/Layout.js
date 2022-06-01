// components
//import Menu from "../components/Menu";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Menu /> */}
      <NavMenu/>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
