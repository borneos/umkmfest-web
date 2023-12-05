import ENV from '@/constant/env';
import { STATUS } from '@/constant/status';
import { populateAdditionalImage } from '@/helpers/utils';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const [dataEvent, setDataEvent] = useState([]);
  console.log('🚀 ~ file: [slug].js:20 ~ Training ~ dataEvent:', dataEvent);
  let slug = query?.slug;

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

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <>
      <div className="bg-gray-200 max-w-md min-h-screen container mx-auto">
        <div className="bg-white">
          <Link
            href="/"
            className="text-black bg-white rounded-full z-10 ml-4 top-6 absolute"
          >
            <HiChevronLeft size={24} />
          </Link>
          <Image
            src={dataEvent?.image}
            width={448}
            height={220}
            alt="bg-trainings"
            className="relative"
            // src={populateAdditionalImage({
            //   ...dataEvent?.imageAdditional,
            //   height: 448,
            //   width: 220,
            //   extension: 'webp',
            // })}
          />

          <div className="text-black py-3 px-6">
            <div className="flex justify-between">
              <h3 className="font-semibold text-xl">
                {dataEvent?.name ?? 'Title'}
              </h3>
              <button>
                <HiShare size={26} style={{ color: '#049548' }} />
              </button>
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
          <div className="my-2">
            <div
              dangerouslySetInnerHTML={{ __html: dataEvent?.description }}
            ></div>
          </div>
        </div>
        <div className="mt-1 mb-12 bg-white py-3 px-6 text-black">
          <h3 className="font-bold">Pemateri Pelatihan</h3>
          <div className="flex gap-2 my-3">
            <div className="bg-white shadow-md rounded-md p-4 w-full flex gap-2">
              <Image
                src={dataEvent?.presenterImage}
                width={75}
                height={75}
                alt="profile"
                className="rounded-full object-cover"
                // src={populateAdditionalImage({
                //   ...dataEvent?.presenterImageAdditional,
                //   height: 75,
                //   width: 75,
                //   extension: 'webp',
                // })}
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
            type="submit"
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
  try {
    return {
      query,
    };
  } catch (error) {
    return {
      query,
      err: error,
    };
  }
};
