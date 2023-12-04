import Button from "@/components/Button";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { HiInformationCircle } from "react-icons/hi";

export default function Game() {
  const router = useRouter();
  console.log("🚀 ~ file: [slug].js:7 ~ Game ~ router:", router.pathname);

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
                <Button type="primary" label="Submit" />
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
