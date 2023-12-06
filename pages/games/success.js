import Button from '@/components/Button';
import Layout from '@/components/Layout';
import ENV from '@/constant/env';
import { STATUS } from '@/constant/status';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Success(props) {
  const router = useRouter();
  const { query } = router;

  const showConfetti = () => {
    confetti({
      zIndex: 9999,
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div
        className="bg-[#1996a4] max-w-md container mx-auto px-4 min-h-screen flex flex-col justify-center items-center"
        onLoad={() => showConfetti()}
      >
        <div className="text-center">
          <h3>Hi {query?.name} 👋</h3>
          <p>
            Anda telah berhasil menyelesaikan {query?.title}! Semoga Anda
            beruntung hari ini dan dapatkan Doorprize!
          </p>
          <div className="flex justify-center">
            <Image
              src="/images/success_mission 1.png"
              height={222}
              width={222}
              alt="Success"
            />
          </div>
          <br />
          <br />
          <Link href="/">
            <Button variant="primary" className="text-xl">
              Selesai
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
