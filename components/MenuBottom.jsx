import ENV from "@/constant/env";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineHome, HiOutlineUser, HiOutlineBookOpen } from "react-icons/hi";
import { TbDeviceGamepad2 } from "react-icons/tb";

export default function MenuBottom(props) {
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();

  const menus = [
    {
      id: 0,
      name: "Beranda",
      link: "/",
      icon: <HiOutlineHome size={24} />
    },{
      id: 1,
      name: "Game",
      link: "/games",
      icon: <TbDeviceGamepad2 size={24} />
    },{
      id: 2,
      name: "Training",
      link: "/trainings",
      icon: <HiOutlineBookOpen size={24} />
    },{
      id: 3,
      name: "Profile",
      link: "/profile",
      icon: <HiOutlineUser size={24} />
    }
  ];

  return (
    <div className="relative">
      <div className="flex mx-auto fixed bottom-0 left-0 right-0 max-w-md justify-around shadow-inner px-[25px] py-[6px] bg-white">
        {menus.map((item) => 
          <Link key={item.id} href={item.link}>
            <div
              className={`flex flex-col gap-2 items-center ${
                router.pathname === item.link ? "text-[#1996a4]" : "text-black"
              }`}
            >
              {item.icon}
              <p>{item.name}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
