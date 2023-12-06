import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Header from '@/components/Header';
import OTPInput from '@/components/OTPInput';
import Layout from '@/components/Layout';

import axios from 'axios';
import { HiInformationCircle } from 'react-icons/hi';
import ENV from '@/constant/env';
import { STATUS, STATUS_TOAST } from '@/constant/status';
import useToast from '@/hooks/useToast';

export default function Game() {
  const router = useRouter();
  const { query } = router;
  const [otp, setOtp] = useState();
  const [dataLogGame, setDataLogGame] = useState();
  const [dataGame, setDataGame] = useState({});
  const [dataEvent, setDataEvent] = useState({});
  const [dataMission, setDataMissions] = useState();

  const { showToast } = useToast();

  const rules = [
    {
      id: 0,
      label: 'Permainan dimainkan oleh 1 orang pemain.',
    },
    {
      id: 1,
      label: 'Peta yang didapatkan para pemain akan berbeda beda.',
    },
    {
      id: 2,
      label:
        '1 peta berisi masing-masing 5 pertanyaan yang berisi clue booth yang masih berhubungan dengan produk ataupun nama booth yang berada di area festival umkm baik indoor maupun outdoor.',
    },
    {
      id: 3,
      label:
        'Jika merasa menemukan jawaban, pemain harus memindai kode qr yang terdapat di depan booth. dan lakukan tangkapan layar sebagai bukti untuk mencocokkan jawaban.',
    },
    {
      id: 4,
      label:
        'Untuk lanjut ke pertanyaan selanjutnya pemain harus menyelesaikan misi atau pertanyaan yang ada di booth tersebut',
    },
    {
      id: 5,
      label:
        'Selesaikan 1 peta untuk mendapatkan hadiah menarik dari kami, dan kamu berkesempatan mendapatkan doorprize',
    },
    {
      id: 6,
      label:
        'Untuk 50 orang pertama menyelesaikan misi akan berkesempatan mendapatkan voucher senilai 20K.',
    },
  ];

  const handleOnOTPComplete = () => {};

  function handleOnChange(e) {
    setOtp(e);
  }

  const fetchGame = async () => {
    const name = localStorage.getItem('userDataName');
    const telp = localStorage.getItem('userDataTelp');
    await axios
      .get(`${ENV.API}game-histories/${query.slug}?telp=${telp}&name=${name}`)
      .then((response) => {
        if (response?.status === STATUS.SUCCESS) {
          setDataGame(response.data.data[0].games[0]);
          setDataEvent(response.data.data[0].events);
          setDataMissions(response.data.data[0].mission[0]);
          setDataLogGame(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.warn(error, 'Login failed');
        return;
      });
  };

  const handleComplete = async () => {
    const name = localStorage.getItem('userDataName');
    const telp = localStorage.getItem('userDataTelp');
    const body = {
      name: name,
      telp: telp,
      pinToken: otp,
    };
    await axios
      .put(`${ENV.API}games/complete/${dataLogGame.id}`, body)
      .then((response) => {
        if (response.status === STATUS.SUCCESS) {
          showToast(
            STATUS_TOAST.SUCCESS,
            'Selamat kamu telah menyelesaikan mission games',
          );
          router.push({
            pathname: '/games/success',
            query: {
              name: name,
              title: dataEvent[0]?.name || '-'
            }
          })
        }
      })
      .catch((error) => {
        console.warn(error, 'Login failed');
        return;
      });
  };

  useEffect(() => {
    fetchGame();
    document.getElementById('modal_rules').showModal();
  }, []);

  return (
    <>
      <Layout>
        <Header pageTitle={dataGame?.name || ''} />
        <div className='text-center pb-1'>
          <span className='text-gray-400 text-center'>Code: {dataGame?.code || '-'}</span>
        </div>
        <div className="bg-[#F2F2F2] min-h-screen">
          <div className="container mx-auto px-4 flex flex-col gap-3">
            <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
              <HiInformationCircle size={24} color="#F2994A" />
              <p className="text-xs">
                Baca secara perlahan dan teliti untuk Petunjuk Mission Game
                Anda. Jangan terburu-buru jika melewati setiap booth dan
                dilarang berlarian! mohon antri dan bergantian dalam bermain.
              </p>
            </div>
          </div>
          <div className="container mx-auto px-4 flex flex-col gap-3 my-5">
            {(dataMission?.length > 0 &&
              dataMission?.map((item) => (
                <div className="collapse collapse-arrow bg-white text-black">
                  <input type="radio" name={`my-accordion-${item.id}`} />
                  <div className="collapse-title text-xl font-medium">
                    {item.name}
                  </div>
                  <div className="collapse-content">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></div>
                  </div>
                </div>
              ))) ||
              null}

            <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
              <HiInformationCircle size={24} color="#F2994A" />
              <p className="text-xs">
                Jika sudah menyelesaikan misi, dapatkan Passcode & Silakan
                Hubungi Panitia!
              </p>
            </div>
            <div className="text-black">
              <p>Masukkan Passcode</p>
              <div className="text-center">
                <OTPInput
                  isNumber
                  onComplete={handleOnOTPComplete}
                  onChange={handleOnChange}
                  defaultValue={otp}
                />
              </div>
              <Button
                onClick={handleComplete}
                variant="primary"
                className="mt-4 w-full"
              >
                Complete
              </Button>
            </div>
          </div>
        </div>
        <dialog id="modal_rules" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Rules Permainan Mission Games PKT UMKM Fest 2023
            </h3>
            <p className="py-4">
              <ul className="list-disc ml-4">
                {rules?.map((item) => (
                  <li>{item.label}</li>
                ))}
              </ul>
            </p>
            <div className="modal-action">
              <form className="w-full" method="dialog">
                <button className="btn w-full">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </Layout>
    </>
  );
}

Game.getInitialProps = async (props) => {
  const { query } = props;
  try {
    return {
      query,
    };
  } catch (error) {
    return {
      query,
      err: error,
    };
  }
};
