import { useState, useEffect } from "react";
import ENV from "@/constant/env";
import axios from "axios";
import Link from "next/link";
import { STATUS } from "@/constant/status";

export default function Merchants() {
  const [dataMerchants, setDataMerchants] = useState([])
  const fetchMerchants = async () => {
    await axios
    .get(`${ENV.API}merchants`)
    .then((response) => {
      console.log("🚀 ~ file: index.jsx:9 ~ .then ~ response:", response)
      if(response.status === STATUS.SUCCESS)
      setDataMerchants(response.data.data)
    })
    .catch((error) => {
      fetchDestroy();
      console.error(error, 'Login failed');
      return;
    });
  };

  useEffect(() => {
    fetchMerchants();
  }, [])

  return (
    <>
      <div className="bg-white max-w-md min-h-screen container mx-auto">
        <div className="bg-white">
          {dataMerchants.map((item, id) => 
            <div key={id} className="m-2 border-gray-500">
              <Link href={`/merchants/${item.slug}`}>
                {item.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}