"use client";

import React, { useEffect, useState } from "react";
import MySelector from "../../UI/mySelector/mySelector";
import { MyFileUploader } from "../../UI/myFileUploader/myFileUploader";
import { formStore, userStore } from "@/store/user";
import {
  getManufacturerId,
  getProductWithManufactorName,
} from "@/utils/updatedProducts";
import { IDataTOCreateOrEdit } from "@/components/layouts/mainSection";
import { ResultProduct } from "@/components/listWrapper/listWrapper";
import { getProductById } from "@/utils/getProduct";
import { useForm } from "react-hook-form";

interface Props {
  isEditing?: boolean;
  dataToPost?: IDataTOCreateOrEdit;
  setDataToCreate?: (data: IDataTOCreateOrEdit) => void;
  currentProductId?: number;
  setUpdatedProduct?: (product: IDataTOCreateOrEdit) => void;
}

export default function FormCreateOrEdit({
  isEditing,
  dataToPost,
  setDataToCreate,
  currentProductId,
  setUpdatedProduct,
}: Props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const setHandleSubmit = formStore((state) => state.setHandleSubmit);

  const [resultProductById, setResultProductById] = useState<ResultProduct>();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>();
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [manufacturerId, setManufacturerId] = useState(0);

  const [manufacturersArray, setManufacturersArray] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] = useState("Компания");

  const manufacturers = userStore((state) => state.manufacturers);

  useEffect(() => {
    if (setHandleSubmit) setHandleSubmit(handleSubmit);
  }, [setHandleSubmit]) 

  useEffect(() => {
    if (currentProductId) {
      getProductById(currentProductId).then((product) => {
        const productWidthManufacturerName = getProductWithManufactorName(
          product.data,
          manufacturers,
        );
        setResultProductById(productWidthManufacturerName);
      });
    }
  }, []);

  useEffect(() => {
    if (!resultProductById) return;
    setName(resultProductById.name);
    setQuantity(resultProductById.quantity);
    setPrice(resultProductById.price);
    setPhotoUrl(resultProductById.photoUrl);
    setSelectedOption(resultProductById.manufacturerName);
    setManufacturerId(resultProductById.manufacturerId);

    setValue("name", resultProductById.name);
    setValue("price", resultProductById.price);
    setValue("quantity", resultProductById.quantity);
  }, [resultProductById]);

  useEffect(() => {
    if (!setUpdatedProduct) return;
    setUpdatedProduct({
      name,
      price,
      quantity: quantity!,
      photoUrl: resultProductById?.photoUrl!,
      manufacturerId,
    });
  }, [name, price, quantity, resultProductById, manufacturerId]);

  useEffect(() => {
    if (!manufacturers) return;
    manufacturers.map((manufacturer) => {
      setManufacturersArray((prev) => [...prev, manufacturer.name]);
    });
  }, [manufacturers]);

  useEffect(() => {
    if (!manufacturers) return;
    const manufacturerIdData = getManufacturerId(selectedOption, manufacturers);
    setManufacturerId(manufacturerIdData!);
  }, [selectedOption]);

  useEffect(() => {
    if (!setDataToCreate) return;
    setDataToCreate({
      name,
      price,
      quantity: quantity!,
      photoUrl: file ? URL.createObjectURL(file) : photoUrl,
      manufacturerId,
    });
  }, [name, price, quantity, file, manufacturerId]);

  return (
    <>
      <h2 className="text-center text-2xl font-medium leading-[29px] tracking-[0%]">
        {isEditing ? "Редактирование товара" : "Создание товара"}
      </h2>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-1 px-2.5">
          <h6 className="text-[15px] font-normal leading-[18px] tracking-[0%]">
            Название
          </h6>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-text bg-[#1118271F] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#1118271F] focus:bg-transparent outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1 ml-1">Это поле обязательно</p>}
        </div>

        <div className="flex flex-col gap-1 px-2.5">
          <h6 className="text-[15px] font-normal leading-[18px] tracking-[0%]">
            Количество
          </h6>
          <input
            {...register("quantity", { required: true })}
            placeholder="Количество"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-text bg-[#1118271F] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#1118271F] focus:bg-transparent outline-none"
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1 ml-1">Это поле обязательно</p>}
        </div>

        <div className="flex flex-col gap-1 px-2.5">
          <h6 className="text-[15px] font-normal leading-[18px] tracking-[0%]">
            Цена
          </h6>
          <input
            {...register("price", { required: true })}
            placeholder="Цена"  
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)}}
            className="p-text bg-[#1118271F] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#1118271F] focus:bg-transparent outline-none"
           
          />
          {errors.price && <p className="text-red-500 text-sm mt-1 ml-1">Это поле обязательно</p>}
        </div>

        <div className="flex flex-col gap-1 px-2.5">
          <h6 className="text-[15px] font-normal leading-[18px] tracking-[0%]">
            Производитель
          </h6>
          <MySelector
            options={manufacturersArray}
            selectedOption={selectedOption}
            onOptionSelect={setSelectedOption}
          />
        </div>
        <MyFileUploader
          file={file}
          setFile={setFile}
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
        />
      </div>
    </>
  );
}
