import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { BsJoystick } from "react-icons/bs";

export default function MenuBottom(props) {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      <div
        className="flex sticky justify-around shadow-inner px-[25px] py-[6px] bg-white"
        style={{ bottom: 0 }}
      >
        <Link href="#">
          <div
            className={`flex flex-col gap-2 items-center text-black ${
              isActive ? `text-green-700` : `text-black`
            }`}
          >
            <HiOutlineHome size={24} />
            <p>Beranda</p>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col gap-2 items-center text-black">
            <BsJoystick size={24} />
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
    </>
  );
}
