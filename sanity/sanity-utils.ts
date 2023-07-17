import { createClient, groq } from "next-sanity";
import { Pizza } from "@/types/Project";
import imageUrlBuilder from "@sanity/image-url";
import clientConfig from "./config/client-config";

const urlFor = (source: string) => {
  const client = createClient({
    projectId: "2r1izu8i",
    dataset: "production",
    apiVersion: "2023-07-08",
    useCdn: true
  });

  const builder = imageUrlBuilder(client);
  return builder.image(source);
};

export  function getPizzas(): Promise<Pizza[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "pizza"]{
      _id,
      _createdAt,
      name,
      details,
      price,
      "slug": slug.current,
      "image": image.asset->url,
    }`
  );
}

export function getPizza(slug: string): Promise<Pizza> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "pizza" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      details,
      price,
      "slug": slug.current,
      "image": image.asset->url,
    }`,
    { slug }
  );
}

export { urlFor };
