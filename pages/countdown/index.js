import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Image from "next/image";

export default function CountdownPage() {
  const [isClient, setIsClient] = useState(false);
  const image = {
    logo: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239783/pktbeedufest/asset/logo_umkm_fest_luyixr.webp',
    bumn: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239830/pktbeedufest/asset/logo_bumn_tnxvl9.webp',
    pi: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239832/pktbeedufest/asset/logo_pupuk_indonesia_gb47cl.webp',
    pkt: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239831/pktbeedufest/asset/logo_pkt_zhclch.webp',
    borneos: 'https://res.cloudinary.com/borneos-co/image/upload/v1701239830/pktbeedufest/asset/logo_organized_borneos_g2hszj.webp'
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => (
    <p className="text-center font-bold text-3xl">
      {" "}
      {days}<span className="text-sm text-gray-500 font-light">Hari</span> {hours}<span className="text-sm text-gray-500 font-light">Jam</span> {minutes}<span className="text-sm text-gray-500 font-light">menit</span> {seconds}<span className="text-sm text-gray-500 font-light">detik</span>{" "}
    </p>
  );

  if (isClient) {
    return (
      <Layout hideBottomMenu>
        <div className="text-black bg-fill bg-no-repeat bg-cover bg-[center_top_1rem] bg-top-[5em] bg-[url('https://res.cloudinary.com/borneos-co/image/upload/v1701133434/pktbeedufest/asset/bg-countdown_rgiiaq.webp')]">
          <div className="flex p-2 items-center">
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
              {/* <p className="font-bold text-2xl mb-5">PKT <span className="text-blue-600">U</span><span className="text-green-500">M</span><span className="text-orange-500">K</span><span className="text-pink-500">M</span> Fest 2023</p> */}
              <Countdown date="2023-12-7" renderer={renderer} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
