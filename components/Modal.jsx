import React from "react";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function Modal(props) {
  const { name, title } = props;
  const handleConfetti = () => {
    confetti({
      zIndex: 9999,
    });
  };

  const handleModal = () => {
    const target = document.getElementById("my_modal_4");
    target.showModal();
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => handleModal()}>
        open modal
      </button>
      <dialog id="my_modal_4" className="modal z-0">
        <div className="modal-box bg-[#049548] max-w-md min-h-full rounded-none flex flex-col justify-center items-center">
          <div className="text-center">
            <h3 className="font-bold text-lg">Hai, {name ?? "User"}</h3>
            <p className="py-4 ">
              Anda telah berhasil menyelesaikan {title ?? "Mission Game"} Semoga
              Anda beruntung hari ini dan dapatkan Doorprize!
            </p>
            <Image
              src="/images/success_mission 1.png"
              width={285}
              height={315}
              alt="Success"
              className="mx-auto"
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
