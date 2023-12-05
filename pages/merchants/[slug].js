import Button from '@/components/Button';
import ENV from '@/constant/env';
import Image from 'next/image';
import Link from 'next/link';
import { HiChevronLeft, HiQrcode, HiShare } from 'react-icons/hi';
import QRCode from 'react-qr-code';

export default function Merchant() {
  return (
    <>
      <div className="bg-white max-w-md min-h-screen container mx-auto">
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
        <div className="my-1 bg-white text-black flex mx-auto fixed bottom-0 left-0 right-0 max-w-md justify-between shadow-inner items-center px-[25px] py-[6px] gap-3 ">
          <div className="w-[5em]">
            <Button
              className="w-full text-black"
              variant="secondary"
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              <HiQrcode size={24} className="text-black" />
            </Button>
          </div>
          <div className="w-full">
            <Button variant="primary" className="w-full">
              Redeem
            </Button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-md min-h-screen rounded-none flex justify-center flex-col items-center bg-white text-black">
          <h3 className="font-bold text-lg my-3">Scan Here!</h3>

          <QRCode value={`${ENV.URL}merchants/slug`} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
