import { SaleButton } from "@/components/SaleButton";
import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import Image from "next/image";
import { cache } from "react";
import Stripe from "stripe";

const getProduct = cache(
  async (productId: string) =>
    await stripe.products.retrieve(productId, { expand: ["default_price"] })
);

export const metadata = {
  title: "Shop - Product",
};

export default async function Product({ params }: { params: { id: string } }) {
  const response = await getProduct(params.id);
  const price = response.default_price as Stripe.Price;

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    description: response.description,
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format((price.unit_amount ?? 0) / 100),
    defaultPriceId: price.id,
  };

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <SaleButton defaultPriceId={product.defaultPriceId} />
      </ProductDetails>
    </ProductContainer>
  );
}

export const revalidate = 7200; // 2 horas
