import { getPizzas } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/sanity-utils";

export default async function Home() {
  const pizzas = await getPizzas();

  return (
    <div className="mt-12 flex flex-col items-center justify-center font-bold">
      <div className=" flex flex-col items-center justify-center my-6 sm:text-2xl">
        <span className=" text-red-500 mb-4">OUR MENU</span>
        <span>Menu That Always</span>
        <span>Make You Fall In Love</span>
      </div>
      <div className="sm:flex sm:flex-wrap sm:justify-around sm:gap-8 sm:text-xl text-slate-800">
        {pizzas.map((pizza) => {
        const src = urlFor(pizza.image).url();
        return (
            <div key={pizza._id} className=" flex flex-col mb-4 gap-2">
            {pizza.image && (
              <Link href={`/pizzas/${pizza.slug}`}>
                <div className="relative overflow-hidden border rounded-[1rem] h-[15.4rem] w-[20.8rem] sm:rounded-[2rem] sm:h-[22.4rem] sm:w-[30.8rem]">
                  <Image
                    src={src}
                    fill={true}
                    alt={pizza.name}
                    className="object-cover md:hover:scale-110 ease-in duration-200"
                  />
                </div>
              </Link>
            )}
            <span>{pizza.name}</span>
            <span>
              {" "}
              <span className="text-red-500">$</span> {pizza.price[1]}
            </span>
          </div>       
        );
      })}
      </div>
      
    </div>
  );
}
