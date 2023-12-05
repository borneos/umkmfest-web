import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function CarouselBanner(props) {
  const { data } = props;
  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "8px",
    slidesToShow: 1.1,
    speed: 500,
    arrows: false,
    dots: true,
    autoPlay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="my-5">
      <Slider {...settings}>
        {data.map((item, id) => 
          <div key={id} className="px-1">
            <Image
              src={item.image}
              className="rounded-box"
              alt={item.name}
              width={440}
              height={145}
            />
          </div>
        )}
      </Slider>
    </div>
  );
}
