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
  };

  return (
    <div className="my-5">
      <Slider {...settings}>
        {data.map(item => 
          <div>
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

      {/* <div className="carousel carousel-center max-w-lg p-4 space-x-4 rounded-box">
        <div className="carousel-item">
          <Image
            src="/images/banner-1.png"
            className="rounded-box"
            alt="banner-1"
            width={440}
            height={145}
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/images/banner-1.png"
            className="rounded-box"
            alt="banner-1"
            width={440}
            height={145}
          />
        </div>
      </div> */}
    </div>
  );
}
