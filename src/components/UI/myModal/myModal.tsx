"use client";

import { formStore } from "@/store/user";
import cl from "./MyModal.module.scss";

type Props = {
  children?: React.ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  buttonsOptions: {
    firstButton: string[];
    secondButton: string[];
  };
  handlerClick?: () => void;
};

export const MyModal = ({
  children,
  visible,
  setVisible,
  buttonsOptions,
  handlerClick,
}: Props) => {
  const rootClasses = [cl.myModal];

  if (visible) {
    rootClasses.push(cl.active);
  }

  const handleSubmit = formStore((state) => state.handleSubmit);

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className="bg-slate-100 px-[10px] py-[16px] rounded-[10px] shadow-md w-[360px] flex flex-col gap-[20px]"
        onClick={(event) => event.stopPropagation()}
      >
        {children}

        <div className="flex justify-end gap-2.5">
          {buttonsOptions.firstButton[1] === "Удалить" ? (
            <>
              <button
                form="createOrEditFrom"
                onClick={handlerClick}
                className={`px-6 py-2 rounded-md font-medium text-base transition duration-200 ${buttonsOptions.firstButton[0]}`}
              >
                {buttonsOptions.firstButton[1]}
              </button>
              <button
                onClick={() => setVisible(false)}
                className={`px-6 py-2 rounded-md font-medium text-base transition duration-200 ${buttonsOptions.secondButton[0]}`}
              >
                {buttonsOptions.secondButton[1]}
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                form="createOrEditFrom"
                onClick={() => setVisible(false)}
                className={`px-6 py-2 rounded-md font-medium text-base transition duration-200 ${buttonsOptions.firstButton[0]}`}
              >
                {buttonsOptions.firstButton[1]}
              </button>
              <button
                onClick={handleSubmit ? handleSubmit(handlerClick!) : handlerClick}
                className={`px-6 py-2 rounded-md font-medium text-base transition duration-200 ${buttonsOptions.secondButton[0]}`}
              >
                {buttonsOptions.secondButton[1]}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
