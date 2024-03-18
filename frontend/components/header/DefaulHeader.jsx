import { useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import Link from "next/link";
import Image from "next/legacy/image";
import ConnectButton from "../common/ConnectButton";
import LoginMenu from "../common/LoginMenu";

const DefaulHeader = () => {
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
      className={`theme-main-menu sticky-menu theme-menu-eight border-bottom ${navbar ? "fixed" : ""
        }`}
    >
      <div className="inner-content position-relative">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo order-lg-0">
            <Image
              src="/images/logo/logo-2.png"
              alt="logo"
              width={75}
              height={75}
            />
            <Link href="/" className="d-block" style={{ fontSize: 2 + 'em', fontWeight: 'bold' }}>
              Infiniteblocks
            </Link>
          </div>
          <LoginMenu isWhite={true} />
          {/* /.right-widget */}
          <MainMenu />
        </div>
      </div>
      {/* /.inner-content */}
    </header>
  );
};

export default DefaulHeader;
