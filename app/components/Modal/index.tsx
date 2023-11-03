"use client";

import { sendScore } from "@/app/actions";
import { useGame } from "@/app/context/GameContext";
import React, { useState } from "react";
import { toast } from "sonner";

export const Modal = () => {
  const { modal, setModal, name, handleName, score, time } = useGame();

  const handleSendScore = () => {
    sendScore({
      user_name: name,
      score,
      time,
    })
      .then(({ message }) => {
        toast.success(message);
        setModal(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setModal(false);
  };

  if (!modal) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 sm:mx-0 sm:h-14 sm:w-14">
                  🎉
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-center w-full flex flex-col">
                  <h4
                    className="text-2xl font-semibold leading-6 text-gray-900 text-center"
                    id="modal-subtitle"
                  >
                    Tebrikler
                  </h4>
                  <h3
                    className="text-md font-semibold leading-6 text-gray-500 text-center my-4"
                    id="modal-title"
                  >
                    Skorunuz: {score.toFixed(2)}
                  </h3>
                  <div>
                    <input
                      type="text"
                      className="w-full border-gray-300 focus:ring-indigo-500 rounded-md shadow-sm text-md mb-2"
                      value={name}
                      onChange={handleName}
                    />

                    <p className="text-[10px] text-gray-500 text-left">
                      * Aldığınız skoru kaydetmek için isminizi giriniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex items-center justify-center w-full">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-full"
                onClick={handleSendScore}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
