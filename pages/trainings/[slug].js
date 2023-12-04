import Image from 'next/image';
import Link from 'next/link';
import {
  HiCalendar,
  HiChevronLeft,
  HiClock,
  HiLocationMarker,
  HiOutlineInformationCircle,
  HiShare,
} from 'react-icons/hi';

export default function Training() {
  return (
    <>
      <div className="bg-gray-200 max-w-md min-h-screen container mx-auto">
        <div className="bg-white">
          <Link
            href="/"
            className="text-black bg-white rounded-full z-10 ml-4 top-6 absolute"
          >
            <HiChevronLeft size={24} />
          </Link>
          <Image
            src="/images/bg-trainings.png"
            width={448}
            height={220}
            alt="bg-trainings"
            className="relative"
          />

          <div className="text-black py-3 px-6">
            <div className="flex justify-between">
              <h3 className="font-semibold text-xl">
                Pelatihan Menjahit UMKM Festival 2023
              </h3>
              <button>
                <HiShare size={26} style={{ color: '#049548' }} />
              </button>
            </div>
            <div className="flex flex-col gap-2 my-2">
              <div className="flex gap-2 items-center">
                <HiLocationMarker />
                <p className="text-xs">UMKM Festival</p>
              </div>
              <div className="flex gap-2 items-center">
                <HiCalendar />
                <p className="text-xs">Jumat, 8 Desember</p>
              </div>
              <div className="flex gap-2 items-center">
                <HiClock />
                <p className="text-xs">13 - 15 WITA </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 bg-white text-black py-3 px-6">
          <h5 className="font-bold">Detail Pelatihan</h5>
          <div className="my-2">
            <p>Tujuan Pelatihan : </p>
            <ol className="list-decimal">
              <li>Item 1</li>
              <li>Item 1</li>
              <li>Item 1</li>
              <li>Item 1</li>
            </ol>
          </div>
        </div>
        <div className="my-1 bg-white py-3 px-6 text-black">
          <h3 className="font-bold">Pemateri Pelatihan</h3>
          <div className="flex gap-2 my-3">
            <div className="bg-white shadow-md rounded-md p-4 w-full flex gap-2">
              <Image
                src="/images/profil.png"
                width={75}
                height={75}
                alt="profile"
                className="rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-base">Roger</p>
                <p className="text-xs">Manager</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-1 flex mx-auto justify-between p-3 shadow-inner text-black bg-white">
          <div className="flex gap-1 items-center">
            <HiOutlineInformationCircle size={24} />
            <p className="text-xs">Amankan segera Kursi Anda</p>
          </div>
          <button
            type="submit"
            className="w-[235px] h-8 text-center p-1 bg-[#049548] text-white rounded-md"
          >
            Daftar
          </button>
        </div>
      </div>
    </>
  );
}
