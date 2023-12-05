import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import axios from "axios";
import { parse } from "cookie";
import ENV from "@/constant/env";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Image from "next/image";
import useToast from "@/hooks/useToast";
import { STATUS, STATUS_TOAST } from "@/constant/status";

function Profile(props) {
  const { query, cookies, dataUser } = props;
  const tokenServer = query?.token
  const token = cookies?.borneos;
  const router = useRouter();
  const [data, setData] = useState(dataUser || {});
  console.log("🚀 ~ file: index.js:21 ~ Profile ~ data:", data)
  console.log('Linknya' ,router.pathname)

  const { showToast } = useToast();

  const fetchDestroy = async () => {
    await Cookies.remove(token);
    setTimeout(() => {
      console.log("====Fetch Distroy")
      router.push({
        pathname: `${ENV.URL_SSO}`,
        query: {
          origin: `${ENV.URL}/profile`
        }
      })
    }, 1000)
  }

  const fetchUser = async (clientCookie) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${clientCookie || token}`
    await axios.get(`${ENV.API_SSO}validation`)
    .then((response) => {
      if(response.status === 200) {
        setData(response.data.data);
      }else if(response.data.meta.statusCode !== STATUS.SUCCESS){
        fetchDestroy()
      }else{
        fetchDestroy()
      }
    })
    .catch((error) => {
      fetchDestroy();
      console.error(error, 'Login failed');
      return;
    })
  }

  const handleLogout = async () => {
    const clientCookie = Cookies.get(ENV.TOKEN_NAME)
    axios.defaults.headers.common['Authorization'] = `Bearer ${clientCookie || token}`
    await axios.post(`${ENV.API_SSO}logout`)
    .then((response) => {
      if(response.status === 200) {
        Cookies.remove(ENV.TOKEN_NAME);
        useToast(STATUS_TOAST.SUCCESS, 'Berhasil Keluar')
        router.push('/')
      }
    })
    .catch((error) => {
      fetchDestroy();
      console.error(error, 'Login failed');
      return;
    })
  }

  // Checking validation user
  useEffect(() => {
    // Check if any token cookies in client render
    const clientRenderCookie = Cookies.get(ENV.TOKEN_NAME)
    if(clientRenderCookie){
      fetchUser(clientRenderCookie);
    }else{
      if(!dataUser){
        router.push({
          pathname: `${ENV.URL_SSO}/login`,
          query: {
            origin: `${ENV.URL}/profile`
          }
        }) 
      }
    }
    // Check if bring token server
    if(tokenServer){
      Cookies.set(ENV.TOKEN_NAME, tokenServer);
    }

    if(token){
      fetchUser();
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
            <p className="font-semibold text-xl">{data.name}</p>
            <p className="text-base">{data.telp}</p>
          </div>
          {/* <div>
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
          </div> */}
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
            <p className="text-black font-semibold text-xl">
              History Pelatihan
            </p>
            {/* <div className="flex flex-col gap-2">
              <Card
                type="trainings"
                title="Pelatihan Menjahit"
                description="Jumat, 8 Desember 2023"
              />
            </div> */}
            <div className="divider"></div>
          </div>
          <Button onClick={handleLogout} type="secondary" label="Keluar" />
        </div>
      </Layout>
    </>
  );
}

Profile.getInitialProps = async (props) => {
  const { query, req } = props;
  const cookies = req?.headers?.cookie || '';
  const parsedCookies = query?.token ? query.token : parse(cookies).borneos;
  query?.token && Cookies.set(ENV.TOKEN_NAME, query?.token) || null;
  try {
    const headers = {
      Authorization: `Bearer ${parsedCookies}`,
    };
    const params = {
      origin: query?.origin,
    }
    const response = await axios.get(`${ENV.API_SSO}validation`, { 
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
