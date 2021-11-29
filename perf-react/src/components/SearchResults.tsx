import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
};
export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div>
      {results.map((product) => {
        return <ProductItem product={product} />;
      })}
    </div>
  );
};
