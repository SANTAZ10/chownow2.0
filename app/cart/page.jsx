"use client";

import { urlFor } from "@/sanity/sanity-utils";
import { useStore } from "@/store/store";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const cartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };
  const total = () => cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

  return (
    <div>
      <div className="sm:hidden flex flex-col m-8">
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
                    <div className="relative overflow-hidden w-[70%] h-[7.5rem] ">
                      <Image
                        src={src}
                        fill={true}
                        layout="fill"
                        alt={pizza.name}
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col justify-around justify-items-center w-full m-2 text-gray-200">
                      <div className="flex flex-row justify-between ">
                        <span>{pizza.name}</span>
                        <MdDeleteOutline
                          onClick={() => handleRemove(i)}
                          className="text-red-500"
                          size={20}
                        />
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
          <span className=" font-semibold text-gray-800">
            {" "}
            <span className="font-[500]">Total Amount :</span>{" "}
            <span className=" font-semibold text-red-500">$</span>
            {total()}
          </span>
        </div>
        <div className="flex justify-center gap-2 items-center mt-8 flex-col">
          <Link
            href="/"
            className="bg-red-500 text-white mx-auto py-4 w-[12rem] rounded-full text-center"
          >
            Pay Online
          </Link>
          <Link
            href="/"
            className="bg-red-500 text-white mx-auto py-4 w-[12rem] rounded-full text-center"
          >
            Pay on Delvery
          </Link>
        </div>
      </div>
      {/* mobile screen */}
      <div className="hidden sm:block">
        <Layout className="hidden sm:block">
          <div className="p-8 grid grid-cols-[2.2fr,1fr]">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Pizza</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.pizzas.length > 0 &&
                    cartData.pizzas.map((pizza, i) => {
                      const src = urlFor(pizza.image).url();
                      return (
                        <tr key={i}>
                          <td>
                            <Image
                              loader={() => src}
                              src={src}
                              alt={pizza.name}
                              objectFit="cover"
                              width={85}
                              height={85}
                            />
                          </td>
                          <td>{pizza.name}</td>
                          <td>
                            {pizza.size === 0 ? "Small" : pizza.size === 1 ? "Medium" : "Large"}
                          </td>
                          <td>{pizza.price}</td>
                          <td>{pizza.quantity}</td>
                          <td>{pizza.price * pizza.quantity}</td>
                          <td
                            style={{ color: "var(--themeRed)", cursor: "pointer" }}
                            onClick={() => handleRemove(i)}
                          >
                            x
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {/* cart summary */}
            <div>
              <span>Cart</span>
              <div>
                <div>
                  <span>Items</span>
                  <span>{cartData.pizzas.length}</span>
                </div>
                <div>
                  <span>Total</span>
                  <span>$ {total()}</span>
                </div>
              </div>
              {cartData.pizzas.length > 0 ? (
                <div>
                  <button className="btn">Pay on Delivery</button>
                  <button className="btn">Pay Online</button>
                </div>
              ) : null}
            </div>
          </div>
        </Layout>
      </div>
      <Toaster />
    </div>
  );
}
