import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { TbDeviceGamepad2 } from "react-icons/tb";

export default function MenuBottom(props) {
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();

  return (
    <div className="relative">
      <div className="flex mx-auto fixed bottom-0 left-0 right-0 max-w-md justify-around shadow-inner px-[25px] py-[6px] bg-white">
        <Link href="/">
          <div
            className={`flex flex-col gap-2 items-center text-black ${
              router.pathname == "/" ? `text-green-700` : `text-black`
            }`}
          >
            <HiOutlineHome size={24} />
            <p>Beranda</p>
          </div>
        </Link>
        <Link href="/games">
          <div
            className={`flex flex-col gap-2 items-center ${
              router.pathname == "/games" ? `text-green-700` : `text-black`
            }`}
          >
            <TbDeviceGamepad2 size={24} />
            <p>Game</p>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-2 items-center text-black">
            <HiOutlineUser size={24} />
            <p>Profil</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
