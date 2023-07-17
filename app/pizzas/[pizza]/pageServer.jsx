import { getPizza } from "@/sanity/sanity-utils";

export async function fetchPizzaData(slug) {
  const pizzaData = await getPizza(slug);
  return pizzaData;
}
