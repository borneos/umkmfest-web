import Button from '@/components/Button';
import ENV from '@/constant/env';
import { STATUS } from '@/constant/status';
import axios from 'axios';
import { parse } from 'cookie';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiQrcode, HiShare } from 'react-icons/hi';
import QRCode from 'react-qr-code';

export default function Merchant(props) {
  const { query, cookies, dataUser } = props;
  const [dataMerchant, setDataMerchant] = useState([]);

  const router = useRouter();
  const slug = query.slug;

  const fetchMerchant = async () => {
    await axios
      .get(`${ENV.API}merchants/${slug}`)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
          setDataMerchant(response?.data?.data[0]);
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  useEffect(() => {
    fetchMerchant();
  }, []);

  return (
    <>
      <div className="bg-white max-w-md min-h-screen container mx-auto">
        <div className="bg-white">
          <Link
            href="/"
            className="text-black bg-white rounded-full z-10 ml-4 top-6 absolute"
          >
            <HiChevronLeft size={24} />
          </Link>
          <Image
            src={dataMerchant?.image}
            width={448}
            height={220}
            alt="bg-trainings"
            className="relative"
          />

          <div className="text-black py-3 px-6">
            <div className="flex justify-between">
              <h3 className="font-semibold text-xl">{dataMerchant?.name}</h3>
            </div>
          </div>
        </div>
        <div className=" bg-white text-black py-3 px-6">
          <h5 className="font-bold">Clue Mission Game</h5>
          <div className="my-1">
            <div
              dangerouslySetInnerHTML={{ __html: dataMerchant?.description }}
            ></div>
          </div>
        </div>
        <div className="my-1 bg-white text-black flex mx-auto fixed bottom-0 left-0 right-0 max-w-md justify-between shadow-inner items-center px-[25px] py-[6px] gap-3 ">
          <div className="w-[5em]">
            <Button
              className="w-full text-black"
              variant="secondary"
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              <HiQrcode size={24} className="text-black" />
            </Button>
          </div>
          <div className="w-full">
            <Button variant="primary" className="w-full">
              Redeem
            </Button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-md min-h-screen rounded-none flex justify-center flex-col items-center bg-white text-black">
          <h3 className="font-bold text-lg my-3">Scan Here!</h3>

          <QRCode value={`${ENV.URL}merchants/${dataMerchant?.slug}`} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

Merchant.getInitialProps = async (props) => {
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
