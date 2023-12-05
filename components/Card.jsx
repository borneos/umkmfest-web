import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiChevronRight } from 'react-icons/hi';

export default function Card(props) {
  const { image, title, description, type, link, status, disabled } = props;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <>
      <Link
        href={
          type == 'ticket'
            ? `/tickets/${link}`
            : type == 'training'
            ? `/trainings/${link}`
            : type == 'game'
            ? `games/${link}`
            : ''
        }
      >
        <div className="shadow-md rounded-md p-[15px] text-black">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src={
                    type == 'ticket'
                      ? '/images/Ticket 1.png'
                      : type == 'training'
                      ? '/images/education.png'
                      : type == 'game'
                      ? '/images/festival.png'
                      : ''
                  }
                  width={50}
                  height={50}
                  alt="Tickets"
                  className='max-w-[40px]'
                />
              </div>
              <div>
                <p className="font-semibold"> {title ?? ''} </p>
                <p className="text-sm text-gray-500">
                  {' '}
                  {new Date(description).toLocaleDateString(
                    'id-ID',
                    options,
                  )}{' '}
                </p>
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
