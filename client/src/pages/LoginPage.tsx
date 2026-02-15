import { Link, useNavigate } from "react-router-dom";
import LoginBG from "../assets/login-bg.jpg";
import LuminaLogo from "../assets/Lumina Logo.svg";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(8, "Password must be 8 characters."),
});

type LoginFormData = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();

  const useUserLogin = useMutation<Response, AxiosError<any>, LoginFormData>({
    mutationFn: (userData: LoginFormData) =>
      axios
        .post("http://lumina.com/api/login", userData, {
          withCredentials: true,
        })
        .then((res) => res.data),

    // In a real app, onSuccess would likely navigate the user
    onSuccess: (reqUser) => {
      console.log("Login successful:", reqUser);
      navigate("/");
    },
    onError: (error) => {
      // Log the error for debugging purposes
      console.error("Login mutation failed:", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const SubmitHandler = (data: LoginFormData) => {
    useUserLogin.mutate(data);
  };

  const isPending = useUserLogin.isPending;
  const apiError = useUserLogin.error;

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(SubmitHandler)}
        className="bg-cover bg-center h-screen text-black overflow-auto no-scrollbar"
      >
        <div className="grid h-screen grid-cols-1 lg:grid-cols-[50%_50%]">
          <div
            style={{ backgroundImage: `url(${LoginBG})` }}
            className="hidden md:block bg-cover p-10"
          >
            <div
              className="w-md 
              backdrop-blur-2xl
              bg-white/20
              p-8
              rounded-2xl
              "
            >
              <img
                src={LuminaLogo}
                alt="Logo"
                className="
              w-24
            "
              />
              <p className="text-gray-50 mt-2">
                Welcome back to Lumina. Continue exploring inspiring photography
                and connect with creators around the world.
              </p>
            </div>
          </div>
          <div className="my-auto p-2">
            <div
              className="
              bg-white/20
              sm:border-0
              max-w-xl
              xl:max-w-3xl
              xl:p-20
              mx-auto
              rounded-2xl
              p-8
              "
            >
              <div className="md:hidden">
                <img
                  src={LuminaLogo}
                  alt="Logo"
                  className="
                    w-20
                    mb-2
                    "
                />
                <p className="mb-4 text-gray-500">
                  Discover creators, follow your favorites, and share your work
                  too.
                </p>
              </div>
              <h3 className="text-sky-900 text-lg md:text-3xl">LOGIN</h3>

              {apiError && (
                <span className="text-red-600 font-semibold block my-2 p-3 bg-red-100 border border-red-300 rounded-md">
                  {apiError.response?.data?.message ||
                    `Login failed. Server responded with: ${apiError.message}`}
                </span>
              )}

              <div className="grid grid-cols-1 grid-rows-2 gap-4 gap-y-2 mt-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="
                      text-sm
                  "
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    className="
                    text-md
                    rounded-md
                    p-2 
                    py-2.5
                    border
                    border-gray-300
                    hover:outline-2
                    outline-sky-200
                    "
                  />
                  <span
                    className="
                  font-bold
                  text-red-500
                  w-full
                  text-md
                  py-2
                  block
                  h-8
                "
                  >
                    {errors.email?.message}
                  </span>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="
                      text-sm
                  "
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    type="password"
                    className="
                    text-md
                    rounded-md
                    px-2 
                    py-2.5
                    border
                    border-gray-300
                    hover:outline-2
                    outline-sky-200
                    "
                  />
                  <span
                    className="
                  font-bold
                  text-red-500
                  w-full
                  text-md
                  py-2
                  block
                  h-8
                "
                  >
                    {errors.password?.message}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div>
                  <input
                    id="email_box"
                    type="checkbox"
                    className="
                      my-3 mr-3
                      cursor-pointer
                    "
                  />
                  <label htmlFor="email_box">Remember me</label>
                </div>
              </div>
              <button
                disabled={isPending}
                type="submit"
                className="border
                    mt-4
                    duration-400
                    text-white
                    py-2
                    px-4
                    rounded-md
                    font-semibold
                    flex 
                    items-center
                    justify-center
                    text-sm             
                    bg-sky-900
                    hover:text-sky-50
                    transition-all
                    cursor-pointer
                    "
              >
                {isPending ? "Loading" : "Login"}
              </button>
              <p className="text-gray-500 text-sm mt-6 md:text-lg">
                Don't have an account?{"  "}
                <Link
                  className="font-bold text-sky-900 underline"
                  to="/register"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
