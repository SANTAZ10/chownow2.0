import { getPizza } from "@/sanity/sanity-utils";
import { urlFor } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import Layout from "@/components/Layout";
import logo from "@/assets/chownow.png";
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from "react-icons/ai";


export default async function Pizza({ params }) {
  const slug = params.pizza;
  const pizza = await getPizza(slug);
  const src = urlFor(pizza.image).url();

  return (
    <div>
      <div className="hidden sm:block">
        <Layout className="hidden sm:block">
          {/* Rest of your layout components */}
          {/* navbar */}

          {/* left side */}
          <div>
            <Image src={src} height={200} width={200} />
          </div>
          {/* right side */}
          <div></div>
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
          <Image src={src} fill={true} alt={pizza.name} layout="fill" objectFit="cover" className="border rounded-[1rem]" />
        </div>
        {/* right side */}
        <div className="flex flex-col m-4 gap-8 h-full">
          <div className=" flex flex-col justify-center items-center gap-4">
            <span className="font-bold text-gray-800 text-2xl">{pizza.name}</span>

            <span className="text-gray-500 text-sm">{pizza.details}</span>
          </div>
          <div className="flex flex-row gap-6  items-center justify-center">
            <span className="border border-red-500 bg-transparent text-red-500  py-2 px-4 rounded-full">
              Small
            </span>
            <span className="border border-red-500 bg-transparent text-red-500  py-2 px-4 rounded-full">
              Medium
            </span>
            <span className="border border-red-500 bg-transparent text-red-500  py-2 px-4 rounded-full">
              Large
            </span>
          </div>
          {/* price and counter */}
          <div className="flex justify-around  text-2xl  font-bold">
            <span>
              {" "}
              <span className="text-red-500 ">$</span> {pizza.price[1]}
            </span>
            <div className="flex justify-center items-center gap-2 text-red-500">
              <BiSolidLeftArrow />
              <span className="text-gray-800">1</span>
              <BiSolidRightArrow />
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
