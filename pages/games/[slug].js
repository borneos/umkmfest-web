import Button from '@/components/Button';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

export default function Game() {
  const router = useRouter();

  const rules = [
    {
      id: 0,
      label: 'Permainan dimainkan oleh 1 orang pemain.'
    },{
      id: 1,
      label: 'Peta yang didapatkan para pemain akan berbeda beda.'
    },{
      id: 2,
      label: '1 peta berisi masing-masing 5 pertanyaan yang berisi clue booth yang masih berhubungan dengan produk ataupun nama booth yang berada di area festival umkm baik indoor maupun outdoor.'
    },{
      id: 3,
      label: 'Jika merasa menemukan jawaban, pemain harus memindai kode qr yang terdapat di depan booth. dan lakukan tangkapan layar sebagai bukti untuk mencocokkan jawaban.'
    },{
      id: 4,
      label: 'Untuk lanjut ke pertanyaan selanjutnya pemain harus menyelesaikan misi atau pertanyaan yang ada di booth tersebut'
    },{
      id: 5,
      label: 'Selesaikan 1 peta untuk mendapatkan hadiah menarik dari kami, dan kamu berkesempatan mendapatkan doorprize'
    },{
      id: 6,
      label: 'Untuk 50 orang pertama menyelesaikan misi akan berkesempatan mendapatkan voucher senilai 20K.'
    }
  ];

  useEffect(() => {
    document.getElementById('modal_rules').showModal()
  }, []) 

  return (
    <>
      <Layout>
        <Header />
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
            <div className="collapse collapse-arrow bg-white text-black shadow-sm">
              <input type="radio" name="my-accordion-2" checked="checked" />
              <div className="collapse-title text-xl font-medium">Misi 1</div>
              <div className="collapse-content">
                <div className="px-3">
                  <p className="font-bold">Peta dan Instruksi</p>
                  <ul className="list-disc">
                    <li>
                      Periksa peta di tas petualanganmu. Di sana terdapat
                      petunjuk lokasi awal dan jejak menuju harta karun.
                    </li>
                    <li>
                      Catat instruksi tentang tanda-tanda alam yang akan
                      membimbingmu.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-white text-black">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">Misi 1</div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
              <HiInformationCircle size={24} color="#F2994A" />
              <p className="text-xs">
                Jika sudah menyelesaikan misi, dapatkan Passcode & Bingkisan.
                Silakan Hubungi Panitia!
              </p>
            </div>
            <div className="text-black">
              <p>Masukkan Passcode</p>

              <form>
                <div className="flex justify-between my-3">
                  <input
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 rounded-md bg-white border-2 border-gray-200 text-center"
                  />
                  <input
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 rounded-md bg-white border-2 border-gray-200 text-center"
                  />
                  <input
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 rounded-md bg-white border-2 border-gray-200 text-center"
                  />
                  <input
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 rounded-md bg-white border-2 border-gray-200 text-center"
                  />
                  <input
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 rounded-md bg-white border-2 border-gray-200 text-center"
                  />
                  <input
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 rounded-md bg-white border-2 border-gray-200 text-center"
                  />
                </div>
                <Button variant="primary" label="Submit" />
              </form>
            </div>
          </div>
        </div>
        <dialog id="modal_rules" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Rules Permainan Mission Games PKT UMKM Fest 2023</h3>
            <p className="py-4">
              <ul className='list-disc ml-4'>
                {rules?.map(item => 
                  <li>
                    <span>{item.label}</span>
                  </li>
                )}
              </ul>
            </p>
            <div className="modal-action">
              <form className='w-full' method="dialog">
                <button className="btn w-full">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </Layout>
    </>
  );
}
