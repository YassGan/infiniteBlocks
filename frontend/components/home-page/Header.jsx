import { useEffect, useState } from "react";
import MainMenu from "../header/MainMenu";
import Link from "next/link";
import Image from "next/legacy/image";
import LoginMenu from "../common/LoginMenu";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header
      className={`theme-main-menu sticky-menu theme-menu-eleven white-vr ${
        navbar ? "fixed" : ""
      }`}
    >
      <div className="inner-content position-relative">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo order-lg-0">
          <Image src="/images/logo/logo.png" alt="logo" className="me-2" width={75} height={75} />
            <Link href="/" className="d-block" style={{fontSize: 2 + 'em', fontWeight: 'bold', background: '-webkit-linear-gradient(#fc80a4, #fc4ca4)',
             WebkitBackgroundClip: 'text',  WebkitTextFillColor: 'transparent'}}>
              Infiniteblocks
            </Link>
          </div>
          <LoginMenu isWhite={false} />
          {/* /.right-widget */}
          <MainMenu />
        </div>
      </div>
      {/* /.inner-content */}
    </header>
  );
};

export default Header;
