import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Layout from '@/components/Layout';
import ENV from '@/constant/env';
import { STATUS, STATUS_TOAST } from '@/constant/status';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';

export default function Success(props) {
  const router = useRouter();
  const { query } = router;
  console.log("🚀 ~ file: success.js:15 ~ Success ~ query:", query)

  const showConfetti = () => {
    confetti({
      zIndex: 9999,
    });
  };

  const { showToast } = useToast();

  const playGame = async () => {
    const name = localStorage.getItem('userDataName');
    const telp = localStorage.getItem('userDataTelp');
    // const body ={
    //   idEvent: query.eventId,
    //   name: name,
    //   telp: telp
    // }
    await axios
      .get(`${ENV.API}games/create?name=${name}&telp=${telp}&id_event=${query.eventId}`)
      .then((response) => {
        if(response?.status === STATUS.SUCCESS){
          console.log("🚀 ~ file: success.js:38 ~ .then ~ response:", response)
          if(response?.data?.statusCode === 500){
            showToast(STATUS_TOAST.ERROR, "Gagal bermain, anda telah melakukan bermain sebelumnya")
          }else{
            if(response?.data?.meta[0].statusCode === STATUS.ERROR_500){
              showToast(STATUS_TOAST.ERROR, response?.data?.meta[0].statusMessage)
            }else{
              showToast(STATUS_TOAST.SUCCESS, `Yuk bermain sekarang`)
            }
          }
        }
      })
      .catch((error) => {
        showToast(STATUS_TOAST.ERROR, "Error server")
        console.error(error, 'Login failed');
        return;
      });
  }

  return (
    <>
      <div
        className="bg-green-700 max-w-md container mx-auto min-h-screen flex flex-col justify-center items-center"
        onLoad={() => showConfetti()}
      >
        <div className="text-center">
          <h3>Hi {query?.name} 👋</h3>
          <p>Selamat Datang di PKTUMKM Fest 2023 {query?.title}</p>
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
              <span className="font-bold"> Doorprize & Voucher belanja 20k untuk 50 pemain pertama, </span> klik{' '}
              <span className="font-bold">Main Game</span>
            </p>
          </div>
          <div className="flex my-2 justify-between gap-2">
            <Button
              variant="secondary"
              className="w-[190px]"
              onClick={() => router.push('/')}
            >
              Nanti Saja
            </Button>
            <Button onClick={playGame} variant="primary" className="w-[200px]">
              Main Game
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
