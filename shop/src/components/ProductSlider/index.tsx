"use client";

import { Container, Product } from "./styles";
import Image from "next/image";
import camiseta1 from "../../assets/1.png";
import camiseta2 from "../../assets/2.png";
import camiseta3 from "../../assets/3.png";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface ProductSliderProps {
  products: Product[];
}

export function ProductSlider({ products = [] }: ProductSliderProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <Container ref={sliderRef}>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} alt="" width={520} height={480} />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </Container>
  );
}
