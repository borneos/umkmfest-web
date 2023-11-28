import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function CountdownPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => (
    <p className="font-bold text-xl">
      {" "}
      {days} Hari, {hours} Jam, {minutes} menit, {seconds} detik{" "}
    </p>
  );

  if (isClient) {
    return (
      <div className="mx-auto max-w-md bg-white min-h-screen pb-20 text-black">
        <div className="flex flex-col items-center pt-[150px]">
          <p className="font-bold text-xl">PKT UMKM Fest 2023</p>
          <Countdown date="2023-12-8" renderer={renderer} />
        </div>
      </div>
    );
  }
}
