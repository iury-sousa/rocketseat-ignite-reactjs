import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
};

export const SearchResults = ({
  results,
  onAddToWishlist,
}: SearchResultsProps) => {
  const totalPrice = useMemo(
    () =>
      results.reduce((total, product) => {
        return total + product.price;
      }, 0),
    [results]
  );

  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map((product) => {
        return (
          <ProductItem
            product={product}
            onAddToWishlist={onAddToWishlist}
            key={product.id}
          />
        );
      })}
    </div>
  );
};
