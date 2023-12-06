import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';

export default function CarouselBanner(props) {
  const { data } = props;
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '8px',
    slidesToShow: 1.1,
    slideToScroll: 1,
    speed: 500,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <div className="my-5">
      <Slider {...settings}>
        {data.map((item) => (
          <div className="px-2" key={item?.id}>
            <Image
              src={item.image}
              className="rounded-box"
              alt={item.name}
              width={440}
              height={145}
              key={item?.id}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
