import { ResultProduct } from "@/components/listWrapper/listWrapper";

export default function FormCheckCard({ product }: { product: ResultProduct }) {
  return (
    <div className="flex flex-col gap-5 py-3">
      <div className="my-0 mx-auto">
        <img
          className="rounded-[10px] w-[224px] h-[224px] object-cover"
          src={product.photoUrl}
          alt={product.name}
        />
      </div>
      <div className="text-center text-2xl font-medium leading-[29px] tracking-[0%]">
        {product.name}
      </div>
      <div className="flex flex-col gap-5 px-2.5">
        <div className="text-[15px] font-normal leading-[18px] tracking-[0%]">Количество: {product.quantity} шт</div>
        <div className="text-[15px] font-normal leading-[18px] tracking-[0%]">Цена: {product.price} р</div>
        <div className="text-[15px] font-normal leading-[18px] tracking-[0%]">Производитель: {product.manufacturerName}</div>
      </div>
    </div>
  );
}
