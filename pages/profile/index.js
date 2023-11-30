import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function Profile() {
  return (
    <>
      <Layout>
        <Header />
        <div className="flex flex-col gap-6 container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-black gap-2 mt-[-70px]">
            <Image
              src="/images/profil.png"
              width={120}
              height={120}
              alt="profil"
            />
            <p className="font-semibold text-xl">Ashari Novaldi</p>
            <p className="text-base">0812137263716</p>
          </div>
          <div>
            <p className="text-black font-semibold text-xl">History Tiket</p>
            <div className="flex flex-col gap-2">
              <Card
                type="tickets"
                title="Tiket Day 1"
                description="Jumat, 8 Desember 2023"
              />
              <Card
                type="tickets"
                title="Tiket Day 1"
                description="Jumat, 8 Desember 2023"
              />
            </div>
            <div className="divider"></div>
          </div>
          <div>
            <p className="text-black font-semibold text-xl">
              History Mission Game
            </p>
            <div className="flex flex-col gap-2">
              <Card
                type="games"
                title="Mission Game Day 1"
                description="Jumat, 8 Desember 2023"
              />
            </div>
            <div className="divider"></div>
          </div>
          <div>
            <p className="text-black font-semibold text-xl">
              History Pelatihan
            </p>
            <div className="flex flex-col gap-2">
              <Card
                type="trainings"
                title="Pelatihan Menjahit"
                description="Jumat, 8 Desember 2023"
              />
            </div>
            <div className="divider"></div>
          </div>
          <Button type="secondary" label="Keluar" />
        </div>
      </Layout>
    </>
  );
}
