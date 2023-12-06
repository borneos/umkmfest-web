import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ENV from '@/constant/env';
import { parse } from 'cookie';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { HiInformationCircle } from 'react-icons/hi';
import { STATUS } from '@/constant/status';

export default function Games(props) {
  const { query } = props;
  const router = useRouter();
  const [dataGames, setDataGames] = useState();
  const [user, setUser] = useState();
  console.log("🚀 ~ file: index.js:15 ~ Games ~ dataGames:", dataGames)
  
  const fetchGame = async () => {
    const telp = localStorage.getItem('userDataTelp');
    await axios
      .get(`${ENV.API}game-histories?sort=desc&telp=${telp}`)
      .then((response) => {
        console.log("🚀 ~ file: index.js:23 ~ .then ~ response:", response)
        if(response?.status === STATUS.SUCCESS) {
          setDataGames(response?.data?.data)
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
    fetchGame()
    setUser({
      name: name,
      telp: telp
    })
  }, [])

  return (
    <>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Halo <span className="font-bold">{user?.name || ''}</span>, yuk{" "}
              <span className="font-bold"> Mulai Mission Games </span>{" "}
              PKTUMKMFEST 2023
            </p>
          </div>
          {dataGames?.map((item, id) => 
            <div key={id}>
              <Card
                type="game"
                title={`Mission Game ${item?.events[0].name}`}
                description={item?.playDate}
                link="game-day-1"
              />
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
