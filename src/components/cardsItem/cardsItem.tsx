import { useState } from "react";
import { ResultProduct } from "../listWrapper/listWrapper";
import { MyModal } from "../UI/myModal/myModal";
import FormCheckCard from "../forms/formCheckCard/formCheckCard";
import { getCookie } from "@/app/_actions/cookie";
import { fetcherDelete } from "@/helpers/fetcher";
import { _apiBase } from "@/constants/apiBase";
import { userStore } from "@/store/user";

export default function CardsItem({ product }: { product: ResultProduct }) {

  const [isChecking, setIsChecking] = useState(false);

  const buttonsOptions_checking = {
    firstButton: ["bg-neutral-700 hover:bg-neutral-500 text-white", "Удалить"],
    secondButton: ["bg-slate-300 hover:bg-slate-400", "Назад"],
  };

  const setIsCheckingProduct = userStore((state) => state.setIsCreatingProduct);

  const handlerDeleteProduct = async () => {
    const cookieToken = await getCookie();
    fetcherDelete(
      _apiBase + "/products/" + product.id,
      cookieToken!,
    ).then(() => {
      setIsCheckingProduct(true);
      setIsChecking(false);
    });
  };

  return (
    <>  
    {
      isChecking && (
        <MyModal
          visible={isChecking}
          setVisible={setIsChecking}
          buttonsOptions={buttonsOptions_checking}
          handlerClick={handlerDeleteProduct}
        >
          <FormCheckCard
            product={product}
          />
        </MyModal>
      )
    }
    <div
    onClick={() => setIsChecking(true)}
    className="p-2.5 flex flex-col content-center gap-0.5 w-[244px] h-[334px]">
      <div className="my-0 mx-auto">
        <img
          className="rounded-[10px] w-[224px] h-[224px] object-cover"
          src={product.photoUrl}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="my-0 mx-auto w-full flex flex-col pt-[5px] gap-[10px]">
          <div className="text-center text-slate-900 text-base font-normal leading-[19px] tracking-[0%] text-ellipsis overflow-hidden whitespace-nowrap">
            {product.name}
          </div>
          <div className="text-center text-slate-900 text-[13px] font-normal leading-4 tracking-[0%]  text-ellipsis overflow-hidden whitespace-nowrap  ">
            {product.manufacturerName}
          </div>
        </div>
        <div className=" flex justify-between p-2.5">
          <span className="text-slate-900 text-[13px] font-normal leading-4 tracking-[0%]">
            {product.quantity} шт
          </span>
          <span className="text-slate-900 text-[13px] font-normal leading-4 tracking-[0%]">
            {product.price} р
          </span>
        </div>
      </div>
    </div>
    </>
    
  );
}
