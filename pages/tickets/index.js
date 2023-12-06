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

export default function Tickets(props) {
  const { query, cookies, dataUser } = props;
  const tokenServer = query?.token;
  // const token = cookies?.borneos;
  const token = Cookies.get(ENV.TOKEN_NAME);
  console.log('🚀 ~ file: index.js:17 ~ Tickets ~ token:', token);
  const router = useRouter();
  const [data, setData] = useState(dataUser || {});
  console.log('🚀 ~ file: index.js:18 ~ Tickets ~ data:', data);
  const [dataTickets, setDataTickets] = useState([]);
  console.log('🚀 ~ file: index.js:17 ~ Tickets ~ dataTickets:', dataTickets);
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
        console.log('🚀 ~ file: index.js:57 ~ .then ~ response:', response);
        fetchTickets();
        if (response.status === 200) {
          setData(response.data.data);
        } else if (response.data.meta.statusCode !== STATUS.SUCCESS) {
          // fetchDestroy();
        } else {
          // fetchDestroy();
        }
      })
      .catch((error) => {
        fetchDestroy();
        console.error(error, 'Login failed');
        return;
      });
  };

  const handleSubmit = async () => {
    const body = {
      eventId: dataTickets?.id || null,
      name: data?.name || '',
      telp: data?.telp || '',
      email: data?.email || '',
    };
    await axios
      .post(`${ENV.API}events`, body)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
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

    // Check if any token cookies in client render
    // const clientRenderCookie = Cookies.get(ENV.TOKEN_NAME);
    // if (clientRenderCookie) {
    //   fetchUser(clientRenderCookie);
    // } else {
    //   if (!dataUser) {
    //     router.push({
    //       pathname: `${ENV.URL_SSO}/login`,
    //       query: {
    //         origin: `${ENV.URL}/tickets`,
    //       },
    //       asPath: `${ENV.URL_SSO}/login?origin=${ENV.URL}/tickets`,
    //     });
    //   }
    // }
    // // Check if bring token server
    // if (tokenServer) {
    //   Cookies.set(ENV.TOKEN_NAME, tokenServer);
    // }

    // if (token) {
    //   fetchUser();
    // }
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
                link={item?.slug}
              />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}

Tickets.getInitialProps = async (props) => {
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
