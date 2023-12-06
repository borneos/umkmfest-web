import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import ENV from '@/constant/env';
import { parse } from 'cookie';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { HiInformationCircle } from 'react-icons/hi';

export default function Games(props) {
  const { query, cookies, dataUser } = props;
  const tokenServer = query?.token;
  const token = cookies?.borneos;
  const router = useRouter();
  const [data, setData] = useState(dataUser || {});

  return (
    <>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Halo <span className="font-bold"></span>
              <span className="font-bold">Mission Games </span> PKTUMKMFEST
              2023, Segera dimulai Nantikan
            </p>
          </div>
          {/* <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Halo <span className="font-bold">Agung</span>, yuk{" "}
              <span className="font-bold"> Mulai Mission Games </span>{" "}
              PKTUMKMFEST 2023
            </p>
          </div>
          <Card
            type="games"
            title="Mission Game Day 1"
            description="Jumat, 8 Desember 2023"
            link="game-day-1"
          /> */}
        </div>
      </Layout>
    </>
  );
}

Games.getInitialProps = async (props) => {
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
