import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiChevronRight } from "react-icons/hi";

export default function Card(props) {
  const { image, title, description, type, link, status, disabled } = props;
  return (
    <>
      <Link
        href={
          type == "tickets"
            ? `/tickets/${link}`
            : type == "trainings"
            ? `/trainings/${link}`
            : type == "games"
            ? `games/${link}`
            : ""
        }
      >
        <div className="shadow-md rounded-md p-[15px] text-black">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <div>
                <Image
                  src={
                    type == "tickets"
                      ? "/images/Ticket 1.png"
                      : type == "trainings"
                      ? "/images/education.png"
                      : type == "games"
                      ? "/images/festival.png"
                      : ""
                  }
                  width={50}
                  height={50}
                  alt="Tickets"
                />
              </div>
              <div>
                <p className="font-semibold"> {title ?? ""} </p>
                <p className="text-xs text-gray-400"> {description ?? ""} </p>
              </div>
            </div>
            <div>
              <HiChevronRight size={24} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
