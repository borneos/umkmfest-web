import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardBlog from '@/components/CardBlog';
import CardEvent from '@/components/CardEvent';
import CarouselBanner from '@/components/CarouselBanner';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Slider from 'react-slick';
import { pageview } from '@/public/gtag';
import ENV from '@/constant/env';
import { STATUS } from '@/constant/status';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const [dataBanner, setDataBanner] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '8px',
    slidesToShow: 1.1,
    speed: 500,
    arrows: false,
    dots: false,
  };

  const fetchBanner = async () => {
    await axios
      .get(`${ENV.API}banners`)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
          setDataBanner(response?.data?.data);
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  const fetchBlog = async () => {
    await axios
      .get(`${ENV.API}blogs`)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
          setDataBlog(response?.data?.data);
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  useEffect(() => {
    fetchBanner();
    fetchBlog();
  }, []);

  // useEffect(() => {
  //   router.push('/countdown');
  //   pageview(window.location.pathname);
  // }, [router]);
  return (
    <>
      <Layout>
        <Header type="landing" />
        <CarouselBanner data={dataBanner} />
        <div className="container mx-auto px-4 flex flex-col gap-5 mt-[40px]">
          <div className="flex gap-1">
            <div className="text-black flex flex-col justify-center items-center text-center gap-1">
              <Image
                src="/images/empowered.png"
                width={52}
                height={52}
                alt="Empowered"
              />
              <p className="text-xs">Empowered</p>
              <p className="text-xs font-light text-gray-400">
                Pemberdayaan UMKM
              </p>
            </div>
            <div className="text-black flex flex-col justify-center items-center text-center gap-1">
              <Image
                src="/images/entepreneur.png"
                width={52}
                height={52}
                alt="Entepreneur"
              />
              <p className="text-xs">Entepreneur</p>
              <p className="text-xs font-light text-gray-400">Pameran UMKM</p>
            </div>
            <div className="text-black flex flex-col justify-center items-center text-center gap-1">
              <Image
                src="/images/education.png"
                width={52}
                height={52}
                alt="Education"
              />
              <p className="text-xs">Education</p>
              <p className="text-xs font-light text-gray-400">
                Berbagi Pelatihan
              </p>
            </div>
            <div className="text-black flex flex-col justify-center items-center text-center gap-1">
              <Image
                src="/images/festival.png"
                width={52}
                height={52}
                alt="Festival"
              />
              <p className="text-xs">Festival</p>
              <p className="text-xs font-light text-gray-400">
                Games dan Hiburan
              </p>
            </div>
          </div>
          <CardEvent
            title="Pelatihan UMKM Fest 2023"
            subTitle="Daftar Sekarang, Jangan Sampai Kehabisan!"
            image="/images/pelatihan-graphic 1 1.png"
            btnLabel="Daftar Pelatihan"
            buttonVariant="secondary"
            link="/trainings"
          />
          <CardEvent
            title=""
            subTitle="Tiket UMKMFest 2023"
            image="/images/Ticket 1.png"
            btnLabel="Tiket Masuk"
            buttonVariant="primary"
            link="/tickets"
          />
          {/* <div>
            <div className="flex justify-between items-center justify-items-center">
              <h2 className="font-semibold text-xl text-black">Info Terbaru</h2>
              <span className="text-sm">Info Lainnya</span>
            </div>
            <Slider {...settings}>
              {dataBlog.splice(0, 3).map((item) => (
                <div key={item.id}>
                  <CardBlog data={item} />
                </div>
              ))}
            </Slider>
          </div> */}
        </div>
      </Layout>
    </>
  );
}
