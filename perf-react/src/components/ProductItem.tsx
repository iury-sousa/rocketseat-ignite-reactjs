import { memo } from "react";

type ProductItemProps = {
  product: { id: number; price: number; title: string };
};

const ProductItemComponent = ({ product }: ProductItemProps) => {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
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
