import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type TLayout = {
  children: ReactNode;
}

const Layout: React.FC<TLayout> = ({children}) => {
  return (
    <>
       <Header _id={""} createdAt={""} name={""} password={""} updatedAt={""} __v={0} />
       <div className="content">
          {children}
       </div>
       <Footer />
    </>
  )
};

export default Layout;