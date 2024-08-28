import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ShopProducts = ({ isSorted }) => {
  const { products } = useSelector((state) => state.products);
  console.log("products:", products);

  const { sortedProductsArray } = useSelector((state) => state.sortedProducts);

  const productsToDisplay = isSorted ? sortedProductsArray : products;
  useEffect(() => {}, [productsToDisplay]);

  return (
    <div className="w-full flex justify-center flex-wrap gap-5">
      {productsToDisplay.map((product, index) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ShopProducts;