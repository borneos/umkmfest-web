import Image from "next/image";
import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

export default function CardBlog(props) {
  const { data, title, image, link } = props;

  function timeElapsedString(createdAt) {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
  
    const timeDifference = currentDate - postDate;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }

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
            {data.name}
          </p>
          <p className="text-xs text-gray-400">{timeElapsedString(data.createdAt)}</p>
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
