import Card from '@/components/Card';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import ENV from '@/constant/env';
import axios from 'axios';
import { parse } from 'cookie';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import useToast from '@/hooks/useToast';
import { STATUS, STATUS_TOAST } from '@/constant/status';

export default function Tickets(props) {
  const router = useRouter();
  const [dataTickets, setDataTickets] = useState([]);
  const { showToast } = useToast();
  const fetchTickets = async () => {
    await axios
      .get(`${ENV.API}events?category=regular&sort=asc`)
      .then((response) => {
        if (response.status === 200) {
          setDataTickets(response?.data?.data);
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  const handleSubmitTicket = async (id) => {
    showToast(STATUS_TOAST.ERROR, 'Event belum di mulai');
  };

  const handleSubmit = async (item) => {
    const name = localStorage.getItem('userDataName');
    const telp = localStorage.getItem('userDataTelp');
    const body = {
      eventId: item?.id || null,
      name: name || '',
      telp: telp || '',
    };

    await axios
      .post(`${ENV.API}events`, body)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
          router.push({
            pathname: '/tickets/success',
            query: {
              name: name,
              title: item?.name,
            },
          });
          if (response?.data?.statusCode === 400) {
            showToast(STATUS_TOAST.ERROR, response?.data?.statusMessage);
          } else {
            showToast(
              STATUS_TOAST.SUCCESS,
              `Berhasil mendaftar event ${dataEvent?.name || '-'}`,
            );
            router.push(
              `https://wa.me/628115475113?text=Saya siap hadir di ${dataEvent.name}`,
            );
          }
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  // Checking validation user
  useEffect(() => {
    // Fetch Data Pages
    fetchTickets();
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Silahkan pilih tiket, ambil tiket agar bisa main mission games,
              tunggu sesaat lagi 😉
            </p>
            {/* <p className="text-xs">
              Silahkan pilih tiket sesuai tanggal acara dan dapat diambil mulai
              pukul <br /> <span className="font-bold"> 15:00 WITA </span>{" "}
            </p> */}
          </div>
          {dataTickets?.map((item) => (
            <div key={item?.id}>
              <Card
                type="ticket"
                title={`Tiket ${item?.name}`}
                description={item?.date}
                onClick={() => handleSubmit(item)}
              />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
