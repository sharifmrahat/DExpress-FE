/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { ILorry } from "@/types";
import Link from "next/link";
import CreateBooking from "../dashboard/customer/CreateBooking";
import { useState } from "react";
import { isLoggedIn } from "@/services/auth.service";

type LorryCardProps = {
  lorry: ILorry;
};

const LorryCard = ({ lorry }: LorryCardProps) => {
  let [openCreate, setOpenCreate] = useState(false);
  const userLoggedIn = isLoggedIn();
  return (
    <>
      <div className="bg-white shadow-sm rounded border overflow-hidden hover:shadow-lg p-3">
        <div className="w-fit mx-auto">
          <img
            src={lorry.imageUrl ?? ""}
            className="w-16 h-16 text-primary"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3">
          <h3 className="w-fit mx-auto font-semibold text-primary text-center">
            {lorry.model}
          </h3>
          <div className="mt-3 text-sm">
            <p>Category: {lorry.category?.title}</p>
            <p>Size: {lorry.type}</p>
            <p>Rent Price: ${lorry.price} /day</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-4">
          <Link
            href="/lorries"
            className="w-full inline-flex justify-center rounded border border-transparent bg-blue-100 px-4 py-0.5 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Detail
          </Link>
          {userLoggedIn && (
            <button
              onClick={() => setOpenCreate(true)}
              type="button"
              className="w-full inline-flex justify-center rounded border border-transparent bg-primary px-4 py-0.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Book
            </button>
          )}
        </div>
      </div>
      <CreateBooking
        lorry={lorry}
        isOpen={openCreate}
        setIsOpen={setOpenCreate}
      />
    </>
  );
};

export default LorryCard;
