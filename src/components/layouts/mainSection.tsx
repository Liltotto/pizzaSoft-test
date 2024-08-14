
import { useState } from "react";
import { MyModal } from "../UI/myModal/myModal";
import FormCreateOrEdit from "../forms/formCreateOrEdit/formCreateOrEdit";
import { fetcherPost } from "@/helpers/fetcher";
import { getCookie } from "@/app/_actions/cookie";
import { _apiBase } from "@/constants/apiBase";
import { userStore } from "@/store/user";

interface IMainSection {
  children?: React.ReactNode;
  setSelectedOption: (selectedOption: string) => void;
  selectedOption: string;
  setSearchQuery: (searchQuery: string) => void;
  searchQuery: string;
}

export interface IDataTOCreateOrEdit {
  name: string;
  price: string;
  quantity: number;
  photoUrl: string;
  manufacturerId: number;
}

export default function MainSection({
  children,
  setSelectedOption,
  selectedOption,
  setSearchQuery,
  searchQuery,
}: IMainSection) {

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const [isCreating, setIsCreating] = useState(false);

  const [dataToCreate, setDataToCreate] = useState<IDataTOCreateOrEdit>({
    name: "",
    price: "",
    quantity: 0,
    photoUrl: '',
    manufacturerId: 0,
  });

  const setIsCreatingProduct = userStore((state) => state.setIsCreatingProduct);

  const handlerDataToCreate = (data: IDataTOCreateOrEdit) => {
    setDataToCreate(data);
  };

  const buttonsOptions_creating = {
    firstButton: ["bg-neutral-700 hover:bg-neutral-500 text-white", "Отмена"],
    secondButton: [" bg-slate-300 hover:bg-slate-400", "Создать"],
  };

  const handlerCreateProduct = async () => {
    const cookieToken = await getCookie();
    fetcherPost(_apiBase + "/products", cookieToken!, dataToCreate).then(() => {
      setIsCreatingProduct(true);
      setIsCreating(false);
    });
  };

  return (
    <>
      {isCreating && (
        <MyModal
          visible={isCreating}
          setVisible={setIsCreating}
          buttonsOptions={buttonsOptions_creating}
          handlerClick={handlerCreateProduct}
        >
          <FormCreateOrEdit
            isEditing={false}
            dataToPost={dataToCreate}
            setDataToCreate={handlerDataToCreate}
          />
        </MyModal>
      )}

      <div className="relative w-[1024px] flex flex-col my-0 mx-auto gap-[30px] py-8">
        <div className="flex justify-between p-2.5">
          <div>
            <input
              name="search"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[240px] bg-[#1118271F] placeholder:text-[#888F99] pl-[10px] py-[6px] block rounded-md border focus:border-[#1118271F] focus:bg-transparent outline-none"
            />
          </div>

          <div className="flex gap-[16px]">
            <div>
              <div className="flex">
                <button
                  onClick={() => handleOptionChange("tabular")}
                  className={`px-[15.81px] py-[13.13px] rounded-md rounded-r-none font-medium text-base transition duration-200 bg-slate-300 hover:bg-[#11182742] ${selectedOption === "tabular" ? "bg-slate-400" : ""}`}
                >
                  <svg
                    width="20"
                    height="13"
                    viewBox="0 0 20 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.8125 1.25C0.8125 0.62868 1.31618 0.125 1.9375 0.125C2.55882 0.125 3.0625 0.62868 3.0625 1.25C3.0625 1.87132 2.55882 2.375 1.9375 2.375C1.31618 2.375 0.8125 1.87132 0.8125 1.25ZM5.6875 1.25C5.6875 0.835786 6.02329 0.5 6.4375 0.5H18.4375C18.8517 0.5 19.1875 0.835786 19.1875 1.25C19.1875 1.66421 18.8517 2 18.4375 2H6.4375C6.02329 2 5.6875 1.66421 5.6875 1.25ZM0.8125 6.5C0.8125 5.87868 1.31618 5.375 1.9375 5.375C2.55882 5.375 3.0625 5.87868 3.0625 6.5C3.0625 7.12132 2.55882 7.625 1.9375 7.625C1.31618 7.625 0.8125 7.12132 0.8125 6.5ZM5.6875 6.5C5.6875 6.08579 6.02329 5.75 6.4375 5.75H18.4375C18.8517 5.75 19.1875 6.08579 19.1875 6.5C19.1875 6.91421 18.8517 7.25 18.4375 7.25H6.4375C6.02329 7.25 5.6875 6.91421 5.6875 6.5ZM0.8125 11.75C0.8125 11.1287 1.31618 10.625 1.9375 10.625C2.55882 10.625 3.0625 11.1287 3.0625 11.75C3.0625 12.3713 2.55882 12.875 1.9375 12.875C1.31618 12.875 0.8125 12.3713 0.8125 11.75ZM5.6875 11.75C5.6875 11.3358 6.02329 11 6.4375 11H18.4375C18.8517 11 19.1875 11.3358 19.1875 11.75C19.1875 12.1642 18.8517 12.5 18.4375 12.5H6.4375C6.02329 12.5 5.6875 12.1642 5.6875 11.75Z"
                      fill="#1E293B"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleOptionChange("card")}
                  className={`px-[15.5px] py-[10.5px] rounded-md rounded-l-none font-medium text-base transition duration-200 bg-slate-300 hover:bg-[#11182742] ${selectedOption === "card" ? "bg-slate-400" : ""}`}
                >
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 3.5C0 1.84315 1.34315 0.5 3 0.5H5.25C6.90685 0.5 8.25 1.84315 8.25 3.5V5.75C8.25 7.40685 6.90685 8.75 5.25 8.75H3C1.34315 8.75 0 7.40685 0 5.75V3.5ZM9.75 3.5C9.75 1.84315 11.0931 0.5 12.75 0.5H15C16.6569 0.5 18 1.84315 18 3.5V5.75C18 7.40685 16.6569 8.75 15 8.75H12.75C11.0931 8.75 9.75 7.40685 9.75 5.75V3.5ZM0 13.25C0 11.5931 1.34315 10.25 3 10.25H5.25C6.90685 10.25 8.25 11.5931 8.25 13.25V15.5C8.25 17.1569 6.90685 18.5 5.25 18.5H3C1.34315 18.5 0 17.1569 0 15.5V13.25ZM9.75 13.25C9.75 11.5931 11.0931 10.25 12.75 10.25H15C16.6569 10.25 18 11.5931 18 13.25V15.5C18 17.1569 16.6569 18.5 15 18.5H12.75C11.0931 18.5 9.75 17.1569 9.75 15.5V13.25Z"
                      fill="#1E293B"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={() => setIsCreating(true)}
                className={
                  "px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400"
                }
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
