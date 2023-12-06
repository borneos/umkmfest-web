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

  const showConfetti = () => {
    confetti({
      zIndex: 9999,
    });
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <div
        className="bg-green-700 max-w-md container mx-auto px-4 min-h-screen flex flex-col justify-center items-center"
        onLoad={() => showConfetti()}
      >
        <div className="text-center">
          <h3>Hi Roger 👋</h3>
          <p>
            Anda telah berhasil menyelesaikan Game Day 1! Semoga Anda beruntung
            hari ini dan dapatkan Doorprize!
          </p>
          <div className="flex justify-center">
            <Image
              src="/images/success_mission 1.png"
              height={222}
              width={222}
            />
          </div>
        </div>
      </div>
    </>
  );
}
