import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";

export default function Header(props) {
  const { name, pageTitle, type } = props;
  return (
    <div className="container mx-auto min-h-screen">
      <div className="bg-[url('/images/header.png')] bg-center bg-no-repeat bg-cover h-[110px] flex flex-col justify-center px-5">
        {type == "landing" ? (
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
        ) : (
          <p className="text-center">Tiket Masuk PKT UMKM Fest 2023</p>
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
