import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiChevronRight, HiCheck, HiBadgeCheck} from 'react-icons/hi';

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
      {type === 'history' ?
        <div className="shadow-md rounded-md p-[15px] text-black border-[1px] border-gray-200">
          <div className="flex justify-between items-center gap-3">
            <div className="items-center">
                <p className='text-sm text-gray-400 font-light'>Anda telah terdaftar pada acara:</p>
                <p className="font-semibold text-sm"> {title ?? ''} </p>
                <div className='flex items-center gap-2'>
                  <p className="text-sm text-gray-500">
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
            <HiBadgeCheck className='text-[#329DAA]' size={36} />
          </div>
        </div>
        :
        <Link
          href={
            type == 'training'
              ? `/trainings/${link}`
              : type == 'game'
              ? `games/${link}`
              : ''
          }
          style={{
            pointerEvents: today === dateEvent ? 'auto' : 'none',
          }}
          onClick={onClick}
        >
          <div className={`p-[15px] ${
            today === dateEvent
              ? 'shadow-md rounded-md text-black'
              : 'bg-gray-200 shadow-none rounded-md text-gray-300'
          } `}>
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
                    className='max-w-[40px]'
                  />
                </div>
                <div>
                  <p className="font-semibold"> {title ?? ''} </p>
                  <div className='flex items-center gap-2'>
                    <p className="text-sm text-gray-500">
                      {' '}
                      {new Date(description).toLocaleDateString(
                        'id-ID',
                        options,
                      )}{' '}
                    </p>
                    {startTime &&
                      <p className='text-sm text-blue-600'>{startTime} - {endTime}</p>
                    || null}
                  </div>
                </div>
              </div>
              <div>
                {
                  isSuccess ?
                  <HiCheck className='text-green-600' size={24} />
                  : <HiChevronRight size={24} />
                }
                
              </div>
            </div>
          </div>
        </Link>
      }
    </>
  );
}
