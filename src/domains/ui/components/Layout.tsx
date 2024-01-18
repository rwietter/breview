import React, { HTMLAttributes } from 'react';
import Header from './Header';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <main className={props.className} {...props}>
      <Header />
      {children}
    </main>
  )
}

export default Layout;