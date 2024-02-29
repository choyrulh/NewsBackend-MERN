import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
