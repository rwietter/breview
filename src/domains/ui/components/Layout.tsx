import React, { HTMLAttributes } from "react";
import Header from "./Header";
import { Toaster } from "./Sonner";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <main className={props.className} {...props}>
      <Header />
      <Toaster />
      <div className="pt-20">{children}</div>
    </main>
  );
};

export default Layout;
