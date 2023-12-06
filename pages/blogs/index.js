import Card from '@/components/Card';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import ENV from '@/constant/env';
import axios from 'axios';
import { parse } from 'cookie';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiChevronLeft, HiInformationCircle } from 'react-icons/hi';
import useToast from '@/hooks/useToast';
import { STATUS, STATUS_TOAST } from '@/constant/status';
import CardBlog from '@/components/CardBlog';
import Link from 'next/link';

export default function Tickets(props) {
  const router = useRouter();
  const [dataBlogs, setDataBlogs] = useState([]);
  const { showToast } = useToast();
  const fetchBlogs = async () => {
    await axios
      .get(`${ENV.API}blogs`)
      .then((response) => {
        if (response.status === 200) {
          setDataBlogs(response?.data?.data);
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
    fetchBlogs();
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="flex justify-between">
            <Link href="/">
              <HiChevronLeft size={24} className="text-black" />
            </Link>
            <h3 className="font-bold text-black text-2xl">Info Terbaru</h3>
            <div></div>
          </div>
          {dataBlogs?.map((item) => (
            <div key={item?.id}>
              <CardBlog data={item} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
