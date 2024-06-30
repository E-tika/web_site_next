import React, { ReactNode } from 'react';
import '../app/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
