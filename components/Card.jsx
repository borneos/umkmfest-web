import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiChevronRight, HiCheck } from 'react-icons/hi';

export default function Card(props) {
  const {
    image,
    title,
    description,
    type,
    link,
    status,
    disabled,
    isSuccess,
    startTime,
    endTime,
    onClick,
  } = props;
  console.log('🚀 ~ file: Card.jsx:20 ~ Card ~ type:', type);

  const dateEvent = new Date(description).getDate();

  const today = new Date().getDate();

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
          type == 'training'
            ? `/trainings/${link}`
            : type == 'game'
            ? `games/${link}`
            : ''
        }
        onClick={onClick}
        style={{
          pointerEvents: today === dateEvent ? 'auto' : 'none',
        }}
      >
        <div
          className={`p-[15px] ${
            today === dateEvent
              ? 'shadow-md rounded-md text-black'
              : 'bg-gray-200 shadow-none rounded-md text-gray-300'
          } `}
        >
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
                  alt={title}
                  className="max-w-[40px]"
                />
              </div>
              <div>
                <p className="font-semibold"> {title ?? ''} </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm">
                    {' '}
                    {new Date(description).toLocaleDateString(
                      'id-ID',
                      options,
                    )}{' '}
                  </p>
                  {(startTime && (
                    <p className="text-sm text-blue-600">
                      {startTime} - {endTime}
                    </p>
                  )) ||
                    null}
                </div>
              </div>
            </div>
            <div>
              {isSuccess ? (
                <HiCheck className="text-green-600" size={24} />
              ) : (
                <HiChevronRight size={24} />
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
