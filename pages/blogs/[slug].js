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
import Layout from '@/components/Layout';

export default function Blog(props) {
  const { query } = props;
  let slug = query?.slug;
  const router = useRouter();
  const [dataBlog, setDataBlog] = useState([]);

  const { showToast } = useToast();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const fetchBlog = async () => {
    await axios
      .get(`${ENV.API}blogs/${slug}`)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
          setDataBlog(response?.data?.data[0]);
        }
      })
      .catch((error) => {
        console.error(error, 'Login failed');
        return;
      });
  };

  useEffect(() => {
    if (slug) {
      fetchBlog();
    } else {
      return 404;
    }
  }, []);

  return (
    <>
      <Layout>
        <div className="bg-white">
          <Link
            href="/blogs"
            className="text-black bg-white rounded-full z-10 ml-4 top-6 absolute"
          >
            <HiChevronLeft size={24} />
          </Link>
          <img
            src={dataBlog?.image}
            width="640"
            height="75"
            alt={dataBlog?.name}
            className="relative"
          />
          <div className="text-black pt-3 px-6">
            <div>
              <h3 className="font-semibold text-xl">
                {dataBlog?.name ?? 'Title'}
              </h3>
              {/* <button>
                <HiShare size={26} style={{ color: '#049548' }} />
              </button> */}
            </div>
          </div>
        </div>
        <div className="my-2 bg-white text-black px-6">
          <div id="wysiwyg-borneos" className="my-2">
            <div
              dangerouslySetInnerHTML={{ __html: dataBlog?.description }}
            ></div>
          </div>
        </div>
      </Layout>
    </>
  );
}

Blog.getInitialProps = async (props) => {
  const { query } = props;

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
