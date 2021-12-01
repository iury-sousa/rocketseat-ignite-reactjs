import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized/dist/commonjs/List";

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

  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />
      {/* {results.map((product) => {
        return (
          <ProductItem
            product={product}
            onAddToWishlist={onAddToWishlist}
            key={product.id}
          />
        );
      })} */}
    </div>
  );
};
