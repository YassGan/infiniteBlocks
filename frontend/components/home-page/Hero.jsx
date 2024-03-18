import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";

const Hero = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>

      <h1 className="hero-heading fw-500 text-white mb-45">
        Infinite<span>blocks</span>
      </h1>
      <p className="text-lg text-white opacity-75 mb-65 lg-mb-50 pe-lg-5">
        description Infiniteblocks
      </p>

    </>
  );
};

export default Hero;
