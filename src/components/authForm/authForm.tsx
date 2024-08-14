"use client";

import { signup } from "@/app/_actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import { userStore } from "@/store/user";

function Button() {
  const { pending } = useFormStatus();
  const isErrorInvalidUser = userStore((state) => state.isErrorInvalidUser);

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        disabled={pending}
        className={`px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400 ${pending ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {pending ? "Submitting..." : "Login"}
      </button>
      {isErrorInvalidUser && (
        <p className="text-red-500 text-sm mt-1 ml-1">
          Incorrect email or password
        </p>
      )}
    </div>
  );
}

export default function AuthForm() {
  const initialState = {
    errors: {
      email: [],
      password: [],
    },
  };

  const setIsErrorInvalidUser = userStore(
    (state) => state.setIsErrorInvalidUser,
  );
  const [state, action] = useFormState(
    (state: any, formData: FormData) =>
      signup({ state, formData, setIsErrorInvalidUser }),
    initialState,
  );

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-slate-100 text-zinc-900">
        <div className="absolute inset-0 flex flex-col">
          <div className="h-2/5 bg-slate-800" />
        </div>
        <div className="relative flex justify-center items-center min-h-screen">
          <form
            className="bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10"
            action={action}
          >
            <h2 className="text-center">Authorization</h2>
            <div className="flex flex-col gap-9 pt-8 pb-[10px]">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <h6>Email</h6>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none"
                  />
                </div>
                {state?.errors?.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <h6>Password</h6>
                  <input
                    name="password"
                    placeholder="Password"
                    className="p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none"
                  />
                </div>
                {state?.errors?.password &&
                  state?.errors?.password?.length > 0 && (
                    <div>
                      <p className="text-red-500 text-xs mt-1 ml-1 ">
                        Password must:
                      </p>
                      <ul>
                        {state.errors.password.map((error: string) => (
                          <li
                            className="text-red-500 text-sm mt-1 ml-1"
                            key={error}
                          >
                            - {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
            <div className="block mx-auto">
              <Button />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
