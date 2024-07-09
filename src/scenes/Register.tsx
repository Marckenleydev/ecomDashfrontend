import { Link } from "react-router-dom";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IRegisterRequest } from "../model/ICredentials";
import { userAPI } from "../service/UserService";
import { IResponse } from "../model/IResponse";
import React from "react";

const Register = () => {
  const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(3, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(5, "Password length should not be less than 5 characters"),
  });

  const { register, handleSubmit, reset, formState, getFieldState } =
    useForm<IRegisterRequest>({
      resolver: zodResolver(registerSchema),
      mode: "onTouched",
    });
  const [registerUser, { data, error, isLoading, isSuccess }] =
    userAPI.useRegisterUserMutation();
  const handleRegister = async (registerRequest: IRegisterRequest) =>
    await registerUser(registerRequest);

  const isFieldValid = (fieldName: keyof IRegisterRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  React.useEffect(() => reset(), [isSuccess]);
  return (
    <div className="flex flex-col w-full gap-2">
      <section className="h-[100vh] ">
       
        <div className="flex justify-center mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-28">
          <div className="w-[50%] rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          {/* <h2 className="text-center font-normal text-2xl text-gray-800">Register</h2> */}
            
              {error && (
                <div className="col-span-6 bg-red-50 py-2 w-full text-center rounded-lg text-red-500">
                  {"data" in error
                    ? (error.data as IResponse<void>).message
                    : "An error occurred"}
                </div>
              )}
        
            
              {isSuccess && (
                <div className="bg-green-100 text-green-500 w-full py-2 text-center rounded text-sm">
                  {data.message}
                </div>
              )}
        

            <form
              onSubmit={handleSubmit(handleRegister)}
              action="#"
              className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            >
            

              <div>
                <div
                  className={`relative w-full rounded-lg border-[1px] ${
                    formState.errors.name ? "border-red-500" : ""
                  } ${
                    isFieldValid("name") ? "border-green-500" : ""
                  }  border-gray-200  text-sm`}
                >
                  <input
                    type="text"
                    className="h-full rounded-lg p-3 w-full bg-white outline-none text-blue-950"
                    placeholder=" name"
                    {...register("name")}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    {isFieldValid("name") && (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          className={`bi bi-check text-green-500`}
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                        </svg>
                      </div>
                    )}
                  </span>
                </div>
                <span className="text-sm text-red-600">
                  {formState.errors.name?.message}
                </span>
              </div>

              <div>
                <div
                  className={`relative w-full rounded-lg border-[1px] ${
                    formState.errors.email ? "border-red-500" : ""
                  } ${
                    isFieldValid("email") ? "border-green-500" : ""
                  }  border-gray-200  text-sm`}
                >
                  <input
                    type="email"
                    className="h-full rounded-lg p-3 w-full bg-white outline-none text-blue-950"
                    placeholder=" email"
                    {...register("email")}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    {isFieldValid("email") && (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          className={`bi bi-check text-green-500`}
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                        </svg>
                      </div>
                    )}
                  </span>
                </div>
                <span className="text-sm text-red-600 text-sm">
                  {formState.errors.email?.message}
                </span>
              </div>

              <div>
                <div className="relative">
                  <input
                    type="password"
                    className={`text-blue-950 w-full rounded-lg border-[1px] outline-none ${
                      formState.errors.password ? "border-red-500" : ""
                    } ${
                      isFieldValid("password") ? "border-green-500" : ""
                    }  border-gray-200 p-3 text-sm`}
                    placeholder=" password"
                    {...register("password")}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    {isFieldValid("password") && (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          className={`bi bi-check text-green-500`}
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                        </svg>
                      </div>
                    )}
                  </span>
                </div>
                <span className="text-sm text-red-600">
                  {formState.errors.password?.message}
                </span>
              </div>

              <button
                disabled={formState.isSubmitting || isLoading}
                type="submit"
                className="w-full flex rounded-lg tracking-wide gap-2 items-center justify-center bg-blue-800 px-5 py-3 text-sm font-medium text-white"
              >
                {(formState.isSubmitting || isLoading) && (
                  <span>
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </span>
                )}
                {formState.isSubmitting || isLoading
                  ? "Loading..."
                  : "Register"}
              </button>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500 ">
                  <Link
                    to={"/resetpassword"}
                    className="text-blue-700 hover:underline dark:text-blue-700"
                  >
                    Lost Password?
                  </Link>
                </div>

                <div className="text-sm font-medium text-gray-500 ">
                  Already an user?{" "}
                  <Link
                    to={"/login"}
                    className="text-blue-700 hover:underline dark:text-blue-700"
                  >
                    Go to login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
