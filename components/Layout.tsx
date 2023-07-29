import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="flex flex-col md:flex-row h-full">
    <Header />
    <div className="flex-1">{props.children}</div>
  </div>
);

export default Layout;
