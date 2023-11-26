import Card from "@/components/Card";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";

export default function Trainings() {
  return (
    <>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Pilih <span className="font-bold"> Jenis Pelatihan </span> Anda
              Sekarang! Pastikan <span className="font-bold"> Tanggal </span>{" "}
              dan <span className="font-bold"> Waktu </span> Pelatihan.
            </p>
          </div>
          <Card
            type="trainings"
            title="Pelatihan Menjahit"
            description="Jumat, 8 Desember 2023"
          />
        </div>
      </Layout>
    </>
  );
}
