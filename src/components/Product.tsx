import { ProductResponseData } from '../models/products-response';
import React, { Dispatch, SetStateAction } from 'react';

interface ProductProps {
    product: ProductResponseData;
    selectProduct: Dispatch<SetStateAction<ProductResponseData | null>>;
}

const Product = ({product, selectProduct}: ProductProps) => {
    const styles = { backgroundColor: product.color };
    return (
      <div
          className="w-full min-h-[100px] flex flex-col justify-center items-center cursor-pointer"
          style={styles}
          onClick={() => selectProduct(product)}
      >
          <p className="text-3xl uppercase">{product.name}</p>
          <p className="text-1xl uppercase">year: {product.year}</p>
          <p className="text-1xl uppercase">id: {product.id}</p>
      </div>
  );
}

export default Product;