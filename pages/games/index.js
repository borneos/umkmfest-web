import Card from "@/components/Card";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";

export default function Games() {
  return (
    <>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 flex flex-col gap-3">
          <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Halo <span className="font-bold"></span>
              <span className="font-bold">Mission Games </span>{" "}
              PKTUMKMFEST 2023, Segera dimulai Nantikan
            </p>
          </div>
          {/* <div className="bg-orange-100 mt-2 rounded-xl flex gap-3 items-center text-black p-1">
            <HiInformationCircle size={18} color="#F2994A" />
            <p className="text-xs">
              Halo <span className="font-bold">Agung</span>, yuk{" "}
              <span className="font-bold"> Mulai Mission Games </span>{" "}
              PKTUMKMFEST 2023
            </p>
          </div>
          <Card
            type="games"
            title="Mission Game Day 1"
            description="Jumat, 8 Desember 2023"
            link="game-day-1"
          /> */}
        </div>
      </Layout>
    </>
  );
}
