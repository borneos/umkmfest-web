import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function CountdownPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => (
    <p className="text-center font-bold text-3xl">
      {" "}
      {days} <span className="text-sm text-gray-500">Hari</span>, {hours} <span className="text-sm text-gray-500">Jam</span>, {minutes} <span className="text-sm text-gray-500">menit</span>, {seconds} <span className="text-sm text-gray-500">detik</span>{" "}
    </p>
  );

  if (isClient) {
    return (
      <Layout hideBottomMenu>
        <div className="text-black bg-fill bg-no-repeat bg-cover bg-center bg-[url('https://res.cloudinary.com/borneos-co/image/upload/v1701133434/pktbeedufest/asset/bg-countdown_rgiiaq.webp')]">
            <div className="flex items-center justify-center py-[47vh]">
              <div className="flex flex-col items-center">
                <p className="font-bold text-2xl mb-5">PKT <span className="text-blue-500">U</span><span className="text-green-500">M</span><span className="text-orange-500">K</span><span className="text-red-400">M</span> Fest 2023</p>
                <Countdown date="2023-12-7" renderer={renderer} />
              </div>
            </div>
        </div>
      </Layout>
    );
  }
}
