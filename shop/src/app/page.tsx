import { ProductSlider } from "@/components/ProductSlider";
import { stripe } from "@/lib/stripe";
import { cache } from "react";
import Stripe from "stripe";

const getProducts = cache(
  async () =>
    await stripe.products.list({
      expand: ["data.default_price"],
    })
);

export default async function Home() {
  const products = (await getProducts()).data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount ?? 0) / 100),
    };
  });

  return <ProductSlider products={products} />;
}

export const revalidate = 60;
