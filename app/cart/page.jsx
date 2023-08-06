"use client";

import { urlFor } from "@/sanity/sanity-utils";
import { useStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

export default function Cart() {
  const cartData = useStore((state) => state.cart);

  return (
    <div>
      <div className=" flex flex-col m-8">
        <div className=" flex flex-col gap-4">
          <Link href="/">
            <IoMdArrowBack size={30} className="cursor-pointer" />
          </Link>
          <span className="text-gray-800 text-xl font-semibold">My Cart</span>
        </div>
        <div>
          {cartData.pizzas.length > 0 &&
            cartData.pizzas.map((pizza, i) => {
              const src = urlFor(pizza.image).url();
              return (
                <div key={i}>
                  <div className="flex h-[7.5rem] w-full mx-auto gap-2 m-4 bg-gray-500 rounded-lg">
                    <Image
                      src={src}
                      width={150}
                      height={100}
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />

                    <div className="flex flex-col justify-around justify-items-center w-full m-2 text-gray-200">
                      <div className="flex flex-row justify-between ">
                        <span>{pizza.name}</span>
                        <MdDeleteOutline className="text-red-500" size={20} />
                      </div>
                      <div className="">
                        <span>
                          {" "}
                          <span className=" text-red-500">$</span> {pizza.price}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between ">
                        <span>Quantity: {pizza.mobileQuantity}</span>
                        <span>
                          <span className=" text-red-500">$</span>{" "}
                          {pizza.price * pizza.mobileQuantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div>
          <span  className=" font-semibold text-gray-800">
            {" "}
            <span className="font-[500]">Total Amount :</span>{" "}
            <span className=" font-semibold text-red-500">$</span> 300
          </span>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Link href="/" className="bg-red-500 text-white mb-8  py-4 px-16 rounded-full">
            Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
}
