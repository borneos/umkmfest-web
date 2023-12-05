import Card from '@/components/Card';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ENV from '@/constant/env';
import { data } from 'autoprefixer';
import { parse } from 'cookie';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Trainings(props) {
  const { query, cookies, dataUser } = props;
  const tokenServer = query?.token;
  const token = cookies?.borneos;
  const router = useRouter();
  const [data, setData] = useState(dataUser || {});
  const [dataEvents, setDataEvents] = useState([]);
  const fetchEvents = async () => {
    await axios
      .get(`${ENV.API}events?category=training&sort=asc`)
      .then((response) => {
        if (response.status === 200) {
          setDataEvents(response?.data?.data);
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

  // Checking validation user
  useEffect(() => {
    // Fetch Data Pages
    fetchEvents();

    // Check if any token cookies in client render
    const clientRenderCookie = Cookies.get(ENV.TOKEN_NAME);
    if (clientRenderCookie) {
      fetchUser(clientRenderCookie);
    } else {
      if (!dataUser) {
        router.push({
          pathname: `${ENV.URL_SSO}/login`,
          query: {
            origin: `${ENV.URL}/profile`,
          },
        });
      }
    }
    // Check if bring token server
    if (tokenServer) {
      Cookies.set(ENV.TOKEN_NAME, tokenServer);
    }

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Pilih <span className="font-bold"> Jenis Pelatihan </span> Anda
              Sekarang! Pastikan <span className="font-bold"> Tanggal </span>{' '}
              dan <span className="font-bold"> Waktu </span> Pelatihan.
            </p>
          </div>
          {dataEvents?.map((item) => (
            <div key={item?.id}>
              <Card
                type="training"
                title={item?.name}
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

Trainings.getInitialProps = async (props) => {
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
