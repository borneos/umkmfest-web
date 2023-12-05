import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';

export default function Header(props) {
  const { name, pageTitle, type } = props;
  const router = useRouter();
  const imageHeader =
    'https://res.cloudinary.com/borneos-co/image/upload/v1701670519/pktbeedufest/asset/header-website_ppt3xm.webp';

  return (
    <div className="container mx-auto">
      <div className="bg-[url('https://res.cloudinary.com/borneos-co/image/upload/v1701670519/pktbeedufest/asset/header-website_ppt3xm.webp')] bg-contain bg-no-repeat h-[110px] flex flex-col justify-center px-5">
        {router.pathname == '/' ? (
          <div className="flex gap-3">
            <Image
              src="https://res.cloudinary.com/borneos-co/image/upload/v1701671428/pktbeedufest/asset/logo_umkmfest-fix_a6l8ur.webp"
              alt="Profil"
              width={80}
              height={80}
            />
            <div className="flex flex-col justify-center">
              {/* <p className="text-white font-bold text-size-7">
                Hi, {name ?? "Your Name"}
              </p> */}
              <p className="font-medium text-gray-500">
                Welcome to PKT UMKM Fest 2023
              </p>
            </div>
          </div>
        ) : router.pathname == '/tickets' ? (
          <div className="flex justify-between text-gray-500">
            <Link href="/">
              {' '}
              <HiChevronLeft size={24} />{' '}
            </Link>
            <p className="text-center">Tiket Masuk PKT UMKM Fest 2023</p>
            <div></div>
          </div>
        ) : router.pathname == '/trainings' ? (
          <div className="flex justify-between text-gray-500">
            <Link href="/">
              {' '}
              <HiChevronLeft size={24} />{' '}
            </Link>
            <p className="text-center">Daftar Pelatihan</p>
            <div></div>
          </div>
        ) : router.pathname == '/games' ||
          router.pathname == '/games/[slug]' ? (
          <div className="flex justify-between text-gray-500">
            <Link href="/">
              {' '}
              <HiChevronLeft size={24} />{' '}
            </Link>
            <p className="text-center">Mission Game {pageTitle ?? ''}</p>
            <div></div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
  pageTitle: PropTypes.string,
  type: PropTypes.string,
};
