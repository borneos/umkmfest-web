import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { parse } from "cookie";
import ENV from "@/constant/env";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { HiInformationCircle } from "react-icons/hi";
import HeadMain from "@/components/HeadMain";
const OG_IMAGE = 'https://res.cloudinary.com/borneos-co/image/upload/v1701798418/pktbeedufest/asset/umkm-fest-2023_cn7ddp.png'

export default function Trainings(props) {
  const router = useRouter();
  const [data, setData] = useState();
  const [dataEvents, setDataEvents] = useState([]);
  const fetchEvents = async () => {
    await axios
      .get(`${ENV.API}events?category=training&sort=asc`)
      .then((response) => {
        if (response.status === 200) {
          setDataEvents(response?.data?.data);
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <HeadMain
        title="Pelatihan - PKT UMKM Festival 2023"
        description="Pelatihan - Pupuk Kaltim UMKM Festival 2023"
        keyword="pelatihan, pemberdayaan, umkm, festival, pkt, pupuk kaltim"
        ogTitle="Pelatihan - PKT UMKM Festival 2023"
        ogDescription="PKT UMKM Festival 2023."
        ogImageUrl={OG_IMAGE}
        ogImageAlt="Pelatihan- PKT UMKM Festival 2023"
        ogImageType="image/png"
        ogImageHeight="561"
        ogImageWidth="561"
        ogUrl="https://pktumkmfestival.com/trainings"
      />
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Pilih <span className="font-bold"> Jenis Pelatihan </span> Anda
              Sekarang! Pastikan <span className="font-bold"> Tanggal </span>{' '}
              dan <span className="font-bold"> Waktu </span> Pelatihan.
            </p>
          </div>
          {dataEvents?.map((item, id) => (
            <div key={id}>
              <Card
                type="training"
                title={item?.name}
                description={item?.date}
                link={item?.slug}
              />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
