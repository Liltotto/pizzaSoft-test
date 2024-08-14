import { useEffect, useState } from "react";
import CardsItem from "../cardsItem/cardsItem";
import { _apiBase } from "@/constants/apiBase";
import { ResultProduct } from "../listWrapper/listWrapper";

export default function CardList({
  products,
  setLimit,
}: {
  products: ResultProduct[];
  setLimit: (limit: number) => void;
}) {
  useEffect(() => {
    setLimit(8);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-[15px] mx-auto">
      {products?.map((product: ResultProduct) => (
        <CardsItem key={product.id} product={product} />
      ))}
    </div>
  );
}
