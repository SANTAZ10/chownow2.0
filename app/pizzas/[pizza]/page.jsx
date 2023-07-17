"use client";

import { getPizza } from "@/sanity/sanity-utils";
import { urlFor } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import Layout from "@/components/Layout";
import logo from "@/assets/chownow.png";
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from "react-icons/ai";

export default function Pizza({ params }) {
  const slug = params.pizza;
  const [pizza, setPizza] = useState(null);
  const [src, setSrc] = useState(null);
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [mobileQuantity, setMobileQuantity] = useState(1);

  const handleQuantity = (type) => {
    type === "inc"
      ? setQuantity((prev) => prev + 1)
      : quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };
  const handleMobileQuantity = (type) => {
    type === "inc"
      ? setMobileQuantity((prev) => prev + 1)
      : mobileQuantity === 1
      ? null
      : setMobileQuantity((prev) => prev - 1);
  };
  useEffect(() => {
    getPizza(slug)
      .then((pizzaData) => {
        setPizza(pizzaData);
        const imageUrl = urlFor(pizzaData.image).url();
        setSrc(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching pizza:", error);
      });
  }, [slug]);

  // Wait for the pizza data to be fetched before rendering
  if (!pizza) {
    return <></>;
  }

  // Now you can safely access the properties of 'pizza'
  return (
    <div>
      <div className="hidden sm:block">
        <Layout className="hidden sm:block">
          <div className="flex gap-16 my-20 mx-8">
            {/* left side */}
            <div className="relative overflow-hidden h-[36rem] w-[44rem] border rounded-[2rem] ">
              <Image
                src={src}
                fill={true}
                alt={pizza.name}
                layout="fill"
                style={{ objectFit: "cover" }}
                className=" hover:scale-110  ease-in duration-200 cursor-pointer"
              />
            </div>
            {/* right side */}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-12">
                <span className="text-gray-800 font-bold text-4xl">{pizza.name}</span>
                <span className="text-gray-500 text-lg">{pizza.details}</span>
              </div>
              <span className="text-gray-800 text-3xl font-bold">
                {" "}
                <span className="text-red-500 ">$</span> {pizza.price[size]}
              </span>
              <div className="flex flex-row gap-12 items-center justify-center">
                <span className="text-gray-800 font-semibold text-2xl">Size</span>
                <div className="flex gap-4">
                  <span
                    onClick={() => setSize(0)}
                    className={`${
                      size === 0
                        ? "border bg-red-500 text-white  py-[.3rem] px-[1.5rem] rounded-full cursor-pointer hover:bg-red-500 hover:text-white hover:duration-200 ease-in text-[.8rem]"
                        : "border border-red-500 bg-transparent text-red-500  py-[.3rem] px-[1.5rem] rounded-full cursor-pointer hover:bg-red-500 hover:text-white hover:duration-200 ease-in text-[.8rem]"
                    }`}
                  >
                    Small
                  </span>
                  <span
                    onClick={() => setSize(1)}
                    className={`${
                      size === 1
                        ? "border bg-red-500 text-white  py-[.3rem] px-[1.5rem] rounded-full cursor-pointer hover:bg-red-500 hover:text-white hover:duration-200 ease-in text-[.8rem]"
                        : "border border-red-500 bg-transparent text-red-500  py-[.3rem] px-[1.5rem] rounded-full cursor-pointer hover:bg-red-500 hover:text-white hover:duration-200 ease-in text-[.8rem]"
                    }`}
                  >
                    Medium
                  </span>
                  <span
                    onClick={() => setSize(2)}
                    className={`${
                      size === 2
                        ? "border bg-red-500 text-white  py-[.3rem] px-[1.5rem] rounded-full cursor-pointer hover:bg-red-500 hover:text-white hover:duration-200 ease-in text-[.8rem]"
                        : "border border-red-500 bg-transparent text-red-500  py-[.3rem] px-[1.5rem] rounded-full cursor-pointer hover:bg-red-500 hover:text-white hover:duration-200 ease-in text-[.8rem]"
                    }`}
                  >
                    Large
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-8 text-2xl text-gray-800 font-semibold">
                <span>Quantity</span>
                <div className="flex justify-center items-center gap-2 text-red-500">
                  <BiSolidLeftArrow
                    onClick={() => handleQuantity("dec")}
                    className="cursor-pointer"
                  />
                  <span className="text-gray-800">{quantity}</span>
                  <BiSolidRightArrow
                    onClick={() => handleQuantity("inc")}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className="bg-red-500 max-w-max text-white px-4 py-2 rounded-full cursor-pointer">
                Add to Cart
              </div>
            </div>
          </div>
        </Layout>
      </div>
      {/* MOBILE SCREEN ONLY   */}
      <div className="sm:hidden flex flex-col">
        {/* navbar */}
        <div className="m-8 flex justify-between items-center text-gray-800">
          <Link href="/">
            <IoMdArrowBack size={30} className="cursor-pointer" />
          </Link>

          <Link href="/" className="flex self-end relative cursor-pointer">
            <AiOutlineShoppingCart size={40} className="text-gray-800" />
            <span className="absolute top-[-.4rem] right-[-.2rem] px-[.25rem] py-[.1rem] bg-red-500 rounded-full">
              0
            </span>
          </Link>
        </div>
        {/* left side */}
        <div className="relative flex justify-center items-center h-[18rem] w-[18rem] mx-auto overflow-hidden">
          <Image
            src={src}
            fill={true}
            alt={pizza.name}
            layout="fill"
            style={{ objectFit: "cover" }}
            className="border rounded-[1rem]"
          />
        </div>
        {/* right side */}
        <div className="flex flex-col m-4 gap-8 h-full">
          <div className=" flex flex-col justify-center items-center gap-4">
            <span className="font-bold text-gray-800 text-2xl">{pizza.name}</span>

            <span className="text-gray-500 text-sm">{pizza.details}</span>
          </div>
          <div className="flex flex-row gap-6  items-center justify-center">
            <span
              onClick={() => setSize(0)}
              className={`${
                size === 0
                  ? "border bg-red-500 text-white  py-2 px-4 rounded-full cursor-pointer  text-[.8rem]"
                  : "border border-red-500 bg-transparent text-red-500  py-2 px-4 rounded-full cursor-pointer  text-[.8rem]"
              }`}
            >
              Small
            </span>
            <span
              onClick={() => setSize(1)}
              className={`${
                size === 1
                  ? "border bg-red-500 text-white  py-2 px-4 rounded-full cursor-pointer  text-[.8rem]"
                  : "border border-red-500 bg-transparent text-red-500  py-2 px-4 rounded-full cursor-pointer  text-[.8rem]"
              }`}
            >
              Medium
            </span>
            <span
              onClick={() => setSize(2)}
              className={`${
                size === 2
                  ? "border bg-red-500 text-white  py-2 px-4 rounded-full cursor-pointer  text-[.8rem]"
                  : "border border-red-500 bg-transparent text-red-500  py-2 px-4 rounded-full cursor-pointer  text-[.8rem]"
              }`}
            >
              Large
            </span>
          </div>
          {/* price and counter */}
          <div className="flex justify-around  text-2xl  font-bold">
            <span>
              {" "}
              <span className="text-red-500 ">$</span> {pizza.price[size]}
            </span>
            <div className="flex justify-center items-center gap-2 text-red-500">
              <BiSolidLeftArrow onClick={() => handleMobileQuantity("dec")} />
              <span className="text-gray-800">{mobileQuantity}</span>
              <BiSolidRightArrow onClick={() => handleMobileQuantity("inc")} />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-red-500 text-white mb-8  py-4 px-8 rounded-full">Add to Cart</div>
          </div>
          <div className=" flex flex-col gap-8 mb-10 items-center justify-center">
            <div>
              <span className="text-lg text-red-500  font-bold">ALL RIGHTS RESERVED</span>
            </div>
            <div className="flex gap-6">
              <AiOutlineFacebook size={40} className="text-red-500" />
              <AiOutlineInstagram size={40} className="text-red-500" />
              <AiOutlineTwitter size={40} className="text-red-500" />
            </div>
            <div>
              <Link href="/" className=" flex justify-center items-center gap-2">
                <Image src={logo} alt="" width={40} height={40} />
                <h1 className="font-bold text-red-500 text-xl ">ChowNow</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
