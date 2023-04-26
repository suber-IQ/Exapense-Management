import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type TLayout = {
  children: ReactNode;
}

const Layout: React.FC<TLayout> = ({children}) => {
  return (
    <>
       <Header />
       <div className="content">
          {children}
       </div>
       <Footer />
    </>
  )
};

export default Layout;