import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Image from "next/image";
import Countdown from "@/components/Countdown";
import { pageview } from "@/public/gtag";

export default function CountdownPage() {
  const image = {
    logo: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239783/pktbeedufest/asset/logo_umkm_fest_luyixr.webp',
    bumn: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239830/pktbeedufest/asset/logo_bumn_tnxvl9.webp',
    pi: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239832/pktbeedufest/asset/logo_pupuk_indonesia_gb47cl.webp',
    pkt: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239831/pktbeedufest/asset/logo_pkt_zhclch.webp',
    borneos: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239830/pktbeedufest/asset/logo_organized_borneos_g2hszj.webp'
  }

  const targetDate = new Date('2023-12-07T00:00:00');

  useEffect(() => {
    pageview(window.location.pathname);
  }, []);

  return (
    <Layout hideBottomMenu>
      <div className="text-black bg-fill bg-no-repeat bg-cover bg-[center_top_1rem] bg-top-[5em] bg-[url('https://res.cloudinary.com/borneos-co/image/upload/v1701133434/pktbeedufest/asset/bg-countdown_rgiiaq.webp')]">
        <div className="flex p-2 items-center px-6">
          <div className="flex gap-2 justify-center items-center">
            <div>
              <Image alt='logo-bumn' src={image.bumn} width={140} height={50} />
            </div>
            <div>
              <Image alt='logo-pi' src={image.pi} width={150} height={30} />
            </div>
            <div>
              <Image alt='logo-pkt' src={image.pkt} width={250} height={50} />
            </div>
          </div>
          <div className="w-full flex justify-end">
              <Image alt='logo-borneos' src={image.borneos} width={80} height={20} />
            </div>
        </div>
        <div className="flex items-center justify-center py-[36vh] pt-[25vh]">
          <div className="flex flex-col items-center">
            <Image alt='logo-borneos' src={image.logo} width={300} height={150} />
            <Countdown targetDate={targetDate} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
