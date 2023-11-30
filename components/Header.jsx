import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Header(props) {
  const { name, pageTitle, type } = props;
  const router = useRouter();

  return (
    <div className="container mx-auto">
      <div className="bg-[url('/images/header.png')] bg-center bg-no-repeat bg-cover h-[110px] flex flex-col justify-center px-5">
        {router.pathname == "/" ? (
          <div className="flex gap-3">
            <div>
              <Image
                src="/images/profil.png"
                alt="Profil"
                width={55}
                height={55}
                style={{
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-white font-bold text-size-7">
                Hi, {name ?? "Your Name"}
              </p>
              <p className="font-medium">Welcome to PKT UMKM Fest 2023</p>
            </div>
          </div>
        ) : router.pathname == "/tickets" ? (
          <div className="flex justify-between">
            <Link href="/">
              {" "}
              <HiChevronLeft size={24} />{" "}
            </Link>
            <p className="text-center">Tiket Masuk PKT UMKM Fest 2023</p>
            <div></div>
          </div>
        ) : router.pathname == "/trainings" ? (
          <div className="flex justify-between">
            <Link href="/">
              {" "}
              <HiChevronLeft size={24} />{" "}
            </Link>
            <p className="text-center">Daftar Pelatihan</p>
            <div></div>
          </div>
        ) : router.pathname == "/games" ? (
          <div className="flex justify-between">
            <Link href="/">
              {" "}
              <HiChevronLeft size={24} />{" "}
            </Link>
            <p className="text-center">Mission Game</p>
            <div></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  pageTitle: PropTypes.string,
  type: PropTypes.string,
};
