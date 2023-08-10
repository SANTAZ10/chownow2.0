"use client";

import { urlFor } from "@/sanity/sanity-utils";
import { useStore } from "@/store/store";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import OrderModal from "@/components/OrderModal"
import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const cartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(null)
  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };
  const total = () => cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== 'undefined' && localStorage.setItem('total', total());
  }
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
        {cartData.pizzas.length > 0 ? (
          <div className="flex justify-center gap-2 items-center mt-8 flex-col">
            <button
              
              className="bg-red-500 text-white mx-auto py-4 w-[12rem] rounded-full text-center"
            >
              Pay Online
            </button>
            <button
              
              onClick={handleOnDelivery}
              className="bg-red-500 text-white mx-auto py-4 w-[12rem] rounded-full text-center"
            >
              Pay on Delvery
            </button>
          </div>
        ) : 
        <div className="text-center flex justify-center items-center w-full h-[22rem] text-2xl text-gray-800 font-normal">
          Your Cart is Empty 
        </div>
        }
      </div>
      {/* non mobile screen */}
      <div className="hidden sm:block">
        <Layout className="hidden sm:block">
          <div className="p-8 grid grid-cols-[2.2fr,1fr] mb-[10rem]">
            <div>
              <table className=" w-[100%] border-separate border-spacing-4">
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
                        <tr className="text-center" key={i}>
                          <td>
                            <Image
                              loader={() => src}
                              src={src}
                              alt={pizza.name}
                              objectFit="cover"
                              width={85}
                              height={85}
                              className="rounded-2xl"
                            />
                          </td>
                          <td className="w-[15%]">{pizza.name}</td>
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
            <div className=" flex flex-col items-center justify-between h-[22rem] p-[1.6rem] rounded-2xl bg-gray-400 shadow-xl shadow-gray-800/40">
              <span className="font-bold text-2xl">Cart</span>
              <div className="w-[100%] flex flex-col gap-[0.6rem]">
                <div className=" flex justify-between">
                  <span>Items</span>
                  <span>{cartData.pizzas.length}</span>
                </div>
                <div className=" flex justify-between">
                  <span>Total</span>
                  <span>$ {total()}</span>
                </div>
              </div>
              {cartData.pizzas.length > 0 ? (
                <div onClick={handleOnDelivery} className="text-[0.8rem] p-[.8rem] flex gap-4">
                  <button className="bg-red-500 text-white mx-auto py-2 w-[8rem] rounded-full text-center">
                    Pay on Delivery
                  </button>
                  <button className="bg-red-500 text-white mx-auto py-2 w-[8rem] rounded-full text-center">
                    Pay Online
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </Layout>
      </div>
      <Toaster />
      <OrderModal
        opened={paymentMethod === 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </div>
  );
}
