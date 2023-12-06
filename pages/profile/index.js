import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { parse } from 'cookie';
import ENV from '@/constant/env';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Image from 'next/image';
import useToast from '@/hooks/useToast';
import { STATUS, STATUS_TOAST } from '@/constant/status';

function Profile(props) {
  const router = useRouter();
  const [data, setData] = useState();
  const [dataHistoryEventTraining, setDataHistoryEventTraining] = useState();
  const [dataHistoryEventRegular, setDataHistoryEventRegular] = useState();

  const fetchEventTraining = async (telp) => {
    await axios
      .get(`${ENV.API}log-event-histories?category=training&sort=desc&telp=${telp}`)
      .then((response) => {
        if(response?.status === STATUS.SUCCESS) {
          setDataHistoryEventTraining(response.data.data)
        } 
      })
      .catch((error) => {
        console.warn(error, 'Login failed');
        return;
      });
  }

  const fetchEventRegular = async (telp) => {
    await axios
      .get(`${ENV.API}log-event-histories?category=regular&sort=desc&telp=${telp}`)
      .then((response) => {
        if(response?.status === STATUS.SUCCESS) {
          setDataHistoryEventRegular(response.data.data)
        } 
      })
      .catch((error) => {
        console.warn(error, 'Login failed');
        return;
      });
  }


  useEffect(() => {
    const name = localStorage.getItem('userDataName');
    const telp = localStorage.getItem('userDataTelp');
    if(name && telp){
      setData({
        name: name,
        telp: telp
      })
      fetchEventTraining(telp);
      fetchEventRegular(telp);
    }
  }, [])

  return (
    <>
      <Layout>
        <Header />
        <div className="flex flex-col gap-6 container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-black gap-2 mt-[-70px]">
            <Image
              src='https://res.cloudinary.com/borneos-co/image/upload/v1668059518/images/icons/Courier_acucvg.webp'
              width={60}
              height={60}
              alt="profil"
            />
            <p className="font-semibold text-xl">{data?.name || '-'}</p>
            <p className="text-base">{data?.telp || '-'}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold text-xl pb-2">History Tiket</p>
            <div className="flex flex-col gap-2">
              {!!dataHistoryEventRegular?.length > 0 && dataHistoryEventRegular?.map(item => 
                <Card
                  type="history"
                  title={item.events[0].name}
                  description={item.events[0].date}
                  isSuccess
                  startTime={item.events[0].start_time}
                  endTime={item.events[0].end_time}
                />
              ) || 
                <div className='p-2 text-center'>
                  <span className='text-gray-300'>Anda belum memiliki history tiket masuk</span>
                </div>
              }
            </div>
            <div className="divider"></div>
          </div>
          {/* <div>
            <p className="text-black font-semibold text-xl">
              History Mission Game
            </p>
            <div className="flex flex-col gap-2">
              <Card
                type="games"
                title="Mission Game Day 1"
                description="Jumat, 8 Desember 2023"
              />
            </div>
            <div className="divider"></div>
          </div> */}
          <div>
            <p className="text-gray-500 font-semibold text-xl pb-2">
              History Pelatihan
            </p>
            <div className="flex flex-col gap-2">
              {!!dataHistoryEventTraining?.length > 0 && dataHistoryEventTraining?.map(item => 
                <Card
                  type="history"
                  title={item.events[0].name}
                  description={item.events[0].date}
                  isSuccess
                  startTime={item.events[0].start_time}
                  endTime={item.events[0].end_time}
                />
              ) || 
                <div className='p-2 text-center'>
                  <span className='text-gray-300'>Anda belum memiliki history pelatihan</span>
                </div>
              }
            </div>
            <div className="divider"></div>
          </div>
          {/* <Button onClick={handleLogout} variant="secondary">Keluar</Button> */}
        </div>
      </Layout>
    </>
  );
}

export default Profile;
