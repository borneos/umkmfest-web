import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function CardEvent(props) {
  const { title, subTitle, image, buttonVariant, buttonColor, link, btnLabel } =
    props;
  return (
    <>
      <div className="p-3 rounded-2xl shadow-md flex justify-between">
        <div className="flex flex-col justify-center gap-2 text-black">
          <p> {title ?? ""} </p>
          <h3 className="font-semibold text-xl">{subTitle ?? ""}</h3>
          <Link href="">
            <Button label={btnLabel} type={buttonVariant} />
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <Image src={image ?? ""} alt="Event" width={100} height={100} />
        </div>
      </div>
    </>
  );
}

CardEvent.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  image: PropTypes.string,
  buttonVariant: PropTypes.string,
  buttonColor: PropTypes.string,
  link: PropTypes.string,
};
