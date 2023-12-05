import Card from '@/components/Card';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ENV from '@/constant/env';
import { data } from 'autoprefixer';

export default function Trainings() {
  const [dataEvents, setDataEvents] = useState([]);
  console.log('🚀 ~ file: index.js:12 ~ Trainings ~ dataEvents:', dataEvents);
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
          {dataEvents?.map((item) => (
            <div key={item?.id}>
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
