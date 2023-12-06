import Button from '@/components/Button';
import Layout from '@/components/Layout';
import ENV from '@/constant/env';
import { STATUS } from '@/constant/status';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Success(props) {
  const { dataUser, cookies } = props;
  const router = useRouter();
  const token = cookies?.borneos;
  const [data, setData] = useState(dataUser || {});
  console.log('🚀 ~ file: success.js:11 ~ Success ~ data:', data);
  const showConfetti = () => {
    confetti({
      zIndex: 9999,
    });
  };

  const fetchDestroy = async () => {
    await Cookies.remove(token);
    setTimeout(() => {
      router.push({
        pathname: `${ENV.URL_SSO}`,
        query: {
          origin: `${ENV.URL}/trainings`,
        },
        asPath: `${ENV.URL_SSO}/login?origin=${ENV.URL}/trainings`,
      });
    }, 1000);
  };

  const fetchUser = async (clientCookie) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      clientCookie || token
    }`;
    await axios
      .get(`${ENV.API_SSO}validation`)
      .then((response) => {
        fetchEvents();
        if (response.status === 200) {
          setData(response.data.data);
        } else if (response.data.meta.statusCode !== STATUS.SUCCESS) {
          fetchDestroy();
        } else {
          fetchDestroy();
        }
      })
      .catch((error) => {
        fetchDestroy();
        console.error(error, 'Login failed');
        return;
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div
        className="bg-green-700 max-w-md container mx-auto min-h-screen flex flex-col justify-center items-center"
        onLoad={() => showConfetti()}
      >
        <div className="text-center">
          <h3>Hi Roger 👋</h3>
          <p>Selamat Datang di PKTUMKM Fest 2023 Day - 1</p>
          <div className="flex justify-center">
            <Image src="/images/success 1.png" height={222} width={222} />
          </div>
        </div>
        <div className="bg-white rounded-xl text-center p-3 mx-3 text-black text-xs">
          <div className="mx-12">
            <h3 className="uppercase text-orange-500 font-semibold text-base">
              Info Penting
            </h3>
            <p>
              Anda berkesempatan mendapatkan{' '}
              <span className="font-bold"> Bingkisan & Doorprize, </span> klik{' '}
              <span className="font-bold">Main Game</span>
            </p>
          </div>
          <div className="flex my-2 justify-between">
            <Button
              variant="secondary"
              className="w-[190px]"
              onClick={() => router.push('/')}
            >
              Nanti Saja
            </Button>
            <Button variant="primary" className="w-[200px]">
              Main Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
