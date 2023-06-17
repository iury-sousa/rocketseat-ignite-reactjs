"use client";

import axios from "axios";
import { Button } from "./styles";

interface SaleButtonProps {
  defaultPriceId: string;
}
export function SaleButton({ defaultPriceId }: SaleButtonProps) {
  async function handleBueProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        priceId: defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      alert("Falha ao redirecionar para o checkout");
    }
  }

  return <Button onClick={handleBueProduct}>Comprar agora</Button>;
}
