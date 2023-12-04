import Button from '@/components/Button';
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

export default function Merchant() {
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
          </div>
        </div>
        <div className=" bg-white text-black py-3 px-6">
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
          <Button variant="primary" label="Show QR" />
        </div>
      </div>
    </>
  );
}
