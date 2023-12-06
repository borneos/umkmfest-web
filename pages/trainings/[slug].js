import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import ENV from '@/constant/env';
import { STATUS, STATUS_TOAST } from '@/constant/status';
import { parse } from 'cookie';

import { populateAdditionalImage } from '@/helpers/utils';
import Image from 'next/image';
import Link from 'next/link';
import useToast from '@/hooks/useToast';
import {
  HiCalendar,
  HiChevronLeft,
  HiClock,
  HiLocationMarker,
  HiOutlineInformationCircle,
  HiShare,
} from 'react-icons/hi';

export default function Training(props) {
  const { query } = props;
  let slug = query?.slug;
  const router = useRouter();
  const [dataEvent, setDataEvent] = useState([]);

  const { showToast } = useToast();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const fetchEvent = async () => {
    await axios
      .get(`${ENV.API}events/${slug}`)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
          setDataEvent(response?.data?.data[0]);
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  const handleSendWA = async () => {
    router.push(`https://wa.me/628115475113?text=Silahkan ketik *SIAP HADIR* dibawah ini dan tekan enter untuk mengkonfirmasi kehadiran anda di ${dataEvent.name}, Peserta Terbatas`)
  }

  const handleSubmit = async () => {
    const name = localStorage.getItem('userDataName');
    const telp = localStorage.getItem('userDataTelp');
    const body = {
      eventId: dataEvent?.id || null,
      name: name || '',
      telp: telp || '',
      email: ''
    }
    await axios
      .post(`${ENV.API}events`, body)
      .then((response) => {
        if(response?.status === STATUS.SUCCESS){
          if(response?.data?.statusCode === 400){
            showToast(STATUS_TOAST.ERROR, response?.data?.statusMessage)
          }else{
            showToast(STATUS_TOAST.SUCCESS, `Berhasil mendaftar event ${dataEvent?.name || '-'}`)
            router.push(`https://wa.me/628115475113?text=Silahkan ketik *SIAP HADIR* dibawah ini dan tekan enter untuk mengkonfirmasi kehadiran anda di ${dataEvent.name}, Peserta Terbatas`)
          }
        }
      })
      .catch((error) => {
        showToast(STATUS_TOAST.ERROR, "Error server")
        console.error(error, 'Login failed');
        return;
      });
  }

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <>
      <div className="bg-gray-200 max-w-md min-h-screen container mx-auto">
        <div className="bg-white">
          <Link
            href="/trainings"
            className="text-black bg-white rounded-full z-10 ml-4 top-6 absolute"
          >
            <HiChevronLeft size={24} />
          </Link>
          <img 
            src={dataEvent?.image}
            width='640'
            height='75'
            alt={dataEvent?.name}
            className="relative"
          />
          <div className="text-black py-3 px-6">
            <div className="flex justify-between">
              <h3 className="font-semibold text-xl">
                {dataEvent?.name ?? 'Title'}
              </h3>
              {/* <button>
                <HiShare size={26} style={{ color: '#049548' }} />
              </button> */}
            </div>
            <div className="flex flex-col gap-2 my-2">
              <div className="flex gap-2 items-center">
                <HiLocationMarker />
                <p className="text-xs">{dataEvent?.location ?? 'Location'}</p>
              </div>
              <div className="flex gap-2 items-center">
                <HiCalendar />
                <p className="text-xs">
                  {' '}
                  {new Date(dataEvent?.date).toLocaleDateString(
                    'id-ID',
                    options,
                  )}{' '}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <HiClock />
                <p className="text-xs">
                  {' '}
                  {dataEvent?.start_time} - {dataEvent?.end_time} WITA{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 bg-white text-black py-3 px-6">
          <h5 className="font-bold">Detail Pelatihan</h5>
          <div id="wysiwyg-borneos" className="my-2">
            <div
              dangerouslySetInnerHTML={{ __html: dataEvent?.description }}
            ></div>
          </div>
        </div>
        <div className="mt-1 mb-12 bg-white py-3 px-6 text-black">
          <h3 className="font-bold">Pemateri Pelatihan</h3>
          <div className="flex gap-2 my-3">
            <div className="bg-white shadow-md rounded-md p-4 w-full flex gap-2">
              {/* <Image
                src={dataEvent?.presenterImage}
                width='75'
                height='75'
                alt={dataEvent?.presenterName}
                className="rounded-full object-cover"
              /> */}
              <img 
                src={dataEvent?.presenterImage} 
                width='75'
                height='75'
                alt={dataEvent?.presenterName}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-base">
                  {' '}
                  {dataEvent?.presenterName}{' '}
                </p>
                <p className="text-xs">{dataEvent?.presenterPosition}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-1 flex mx-auto justify-between fixed bottom-0 left-0 right-0 max-w-md p-3 shadow-inner text-black bg-white">
          <div className="flex gap-1 items-center">
            <HiOutlineInformationCircle size={24} />
            <p className="text-xs">Amankan segera Kursi Anda</p>
          </div>
          <button
            onClick={handleSubmit}
            className="w-[235px] h-8 text-center p-1 bg-[#049548] text-white rounded-md"
          >
            Daftar
          </button>
        </div>
      </div>
    </>
  );
}

Training.getInitialProps = async (props) => {
  const { query, req } = props;
  const cookies = req?.headers?.cookie || '';
  const parsedCookies = query?.token ? query.token : parse(cookies).borneos;
  (query?.token && Cookies.set(ENV.TOKEN_NAME, query?.token)) || null;
  try {
    const headers = {
      Authorization: `Bearer ${parsedCookies}`,
    };
    const params = {
      origin: query?.origin,
    };
    const response = await axios.get(`${ENV.API_SSO}validation`, {
      headers,
      params,
    });
    const data = response.data.data;
    return {
      query,
      cookies: parsedCookies,
      dataUser: data,
    };
  } catch (error) {
    return {
      query,
      cookies: parsedCookies,
      err: error,
    };
  }
};