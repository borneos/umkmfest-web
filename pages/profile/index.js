import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Image from "next/image";
import useToast from "@/hooks/useToast";
import { parse } from "cookie";
import ENV from "@/constant/env";
import Cookies from 'js-cookie';

function Profile(props) {
  const { query, cookies, dataUser } = props;
  const tokenServer = query?.token
  const token = cookies?.borneos || Cookies.get(ENV.TOKEN_NAME);
  const router = useRouter();
  console.log("🚀 ~ file: index.js:16 ~ Profile ~ token:", token)
  const [data, setData] = useState(dataUser || {});

  const { showToast } = useToast();

  useEffect(() => {
    // Check if any token cookies in device
    if(!token){
      if(query?.origin){
        router.push({
          pathname: `${ENV.URL_SSO}/login`,
          query: {
            origin: `${ENV.URL}/profile`
          }
        })
      } 
    }
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <div className="flex flex-col gap-6 container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-black gap-2 mt-[-70px]">
            <Image
              src="/images/profil.png"
              width={120}
              height={120}
              alt="profil"
            />
            <p className="font-semibold text-xl">Ashari Novaldi</p>
            <p className="text-base">0812137263716</p>
          </div>
          <div>
            <p className="text-black font-semibold text-xl">History Tiket</p>
            <div className="flex flex-col gap-2">
              <Card
                type="tickets"
                title="Tiket Day 1"
                description="Jumat, 8 Desember 2023"
              />
              <Card
                type="tickets"
                title="Tiket Day 1"
                description="Jumat, 8 Desember 2023"
              />
            </div>
            <div className="divider"></div>
          </div>
          <div>
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
          </div>
          <div>
            <p className="text-black font-semibold text-xl">
              History Pelatihan
            </p>
            <div className="flex flex-col gap-2">
              <Card
                type="trainings"
                title="Pelatihan Menjahit"
                description="Jumat, 8 Desember 2023"
              />
            </div>
            <div className="divider"></div>
          </div>
          <Button type="secondary" label="Keluar" />
        </div>
      </Layout>
    </>
  );
}

Profile.getInitialProps = async (props) => {
  const { query, req } = props;
  const cookies = req?.headers?.cookie || '';
  const parsedCookies = cookies ? parse(cookies) : '';
  try {
    const headers = {
      Authorization: `Bearer ${parsedCookies?.borneos}`,
    };
    const params = {
      origin: query?.origin
    }
    const response = await axios.get(`${ENV.API}validation`, { 
      headers,
      params
    })
    const data = response.data.data
    return {
      query,
      cookies: parsedCookies,
      dataUser: data
    };
  } catch (error) {
    return {
      query,
      cookies: parsedCookies,
      err: error,
    };
  }
};

export default Profile;
