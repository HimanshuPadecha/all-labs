import React from "react";

interface pageProps {
  children: React.ReactNode;
}

const Layout = ({ children }: pageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
