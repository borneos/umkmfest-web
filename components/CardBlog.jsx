import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

export default function CardBlog(props) {
  const { title, image, link } = props;

  return (
    <>
      <div className="shadow-md rounded-xl my-4 w-[348px] h-[230]">
        <div className="flex flex-col gap-2 p-1">
          <Image
            src="/images/banner-1.png"
            alt="blog1"
            width={338}
            height={122}
          />
          <p className="font-semibold text-base text-black">
            Tingkatkan Lanskap Pembayaran Digital, Indosat Mastercard Jalin
            Kemitraan Strategis
          </p>
          <p className="text-xs text-gray-400">14 jam yang lalu</p>
        </div>
      </div>
    </>
  );
}

CardBlog.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
};
