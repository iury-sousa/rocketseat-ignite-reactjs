import { memo } from "react";

type ProductItemProps = {
  product: { id: number; price: number; title: string };
  onAddToWishlist: (id: number) => void;
};

const ProductItemComponent = ({
  product,
  onAddToWishlist,
}: ProductItemProps) => {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button type="button" onClick={() => onAddToWishlist(product.id)}>
        Add
      </button>
    </div>
  );
};

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);

/**
 * FLuxo de renderização do React
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */

/**
 * Quando utilizar o memo
 * 1. Pure Functions Component - Componentes puros que exibem sempre o mesmo dado
 * 2. Renders too often - Quando rederizam muitas vezes
 * 3. Re-renders with same props
 * 4. Medium to big size
 */

/**
 * useMemo
 * 1. Cáculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um component filho )
 *
 * useCallback
 * 1. Igualdade referencial (quando a função precisa ser passada para componentes filhos)
 */
