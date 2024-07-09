import { Link, Navigate, useLocation } from "react-router-dom";
import { userAPI } from "../service/UserService";
import { z } from "zod";
import { Key } from "../components/enum/cache.key";
import { useForm } from "react-hook-form";
import { IUserRequest } from "model/ICredentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { IResponse } from "model/IResponse";


const loginSchema = z.object({
    email: z
      .string()
      .min(2, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(5, "Password length should not be less than 5 characters"),
  });

const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = (JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean) || false;
    const [loginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();
    const { register, handleSubmit,reset, formState: form,getFieldState,} = useForm<IUserRequest>({resolver: zodResolver(loginSchema), mode: "onTouched",});
    const handleLogin = (credentials: IUserRequest) =>{
      loginUser(credentials);
      reset();
    } 
    const isFieldValid = (fieldName: keyof IUserRequest): boolean =>getFieldState(fieldName, form).isTouched &&!getFieldState(fieldName, form).invalid;
    if (isLoggedIn) { return location?.state?.from?.pathname ? ( <Navigate to={location?.state?.from?.pathname} replace />) : (  <Navigate to={"/"} replace />);}
    if (isSuccess ) {localStorage.setItem(Key.LOGGEDIN, "true");return location?.state?.from?.pathname ? (  <Navigate to={location?.state?.from?.pathname} replace />) : (  <Navigate to={"/"} replace />);}
  return (
    <div className="flex flex-col items-center">
    <div className="flex flex-col w-full gap-2">
      <section className="h-[100vh] ">
        <div className="flex justify-center mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-28">
          <div className="w-[50%] rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            {/* <div className="col-span-6">
        <h1 className="text-2xl ml-8">Login</h1>
      </div> */}
        

            <form
              onSubmit={handleSubmit(handleLogin)}
              action="#"
              className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            >
                  <div className=" ">
              {error && (
                <div className="col-span-6 bg-red-50 py-2 w-full text-center rounded-lg text-red-500">
                  {"data" in error
                    ? (error.data as IResponse<void>).message
                    : "An error occurred"}
                </div>
              )}
            </div>
              <div>
             

                <div
                  className={`relative w-full rounded-lg border-[1px] ${
                    form.errors.email ? "border-red-500" : ""
                  } ${
                    isFieldValid("email") ? "border-green-500" : ""
                  }  border-gray-200  text-sm`}
                >
                  <input
                    type="email"
                    className="h-full rounded-lg p-3 w-full bg-white outline-none text-blue-950"
                    placeholder="Enter email"
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
                <span className="text-red-600">
                  {form.errors.email?.message}
                </span>
              </div>

              <div>
                <label className="sr-only">Password</label>

                <div className="relative">
                  <input
                    type="password"
                    className={`w-full rounded-lg border-[1px] text-blue-950 outline-none ${
                      form.errors.password ? "border-red-500" : ""
                    } ${
                      isFieldValid("password") ? "border-green-500" : ""
                    }  border-gray-200 p-3 text-sm`}
                    placeholder="Enter password"
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
                <span className="text-red-600">
                  {form.errors.password?.message}
                </span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label className="ms-2 text-sm  text-gray-900 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
                <Link
                  to={"/resetpassword"}
                  className="text-sm font-semibold text-blue-700 hover:underline dark:text-blue-700"
                >
                  Lost Password?
                </Link>
              </div>
              <button
                disabled={form.isSubmitting || isLoading}
                type="submit"
                className="w-full flex rounded-lg gap-2 items-center justify-center bg-blue-800 px-5 py-3 text-sm font-medium text-white"
              >
                {(form.isSubmitting || isLoading) && (
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
                {form.isSubmitting || isLoading
                  ? "Loading..."
                  : "Login to your account"}
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Not registered?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-700 hover:underline dark:text-blue-700"
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
);
  
}

export default Login