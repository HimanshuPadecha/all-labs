import React from "react";

interface pageProps {
  children: React.ReactNode;
}

const Layout = ({ children }: pageProps) => {
  return (
    <div className="bg-black min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
