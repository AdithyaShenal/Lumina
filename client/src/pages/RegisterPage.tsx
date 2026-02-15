import { Link, useNavigate } from "react-router-dom";
import SignupBG from "../assets/signup-bg.jpg";
import LuminaLogo from "../assets/Lumina Logo.svg";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const schema = z
  .object({
    first_name: z
      .string()
      .min(1, "First name is required.")
      .min(3, "First name must be atleast 3 charaters."),
    last_name: z
      .string()
      .min(1, "Last name is required.")
      .min(3, "Last name must be atleast 3 characters"),
    email: z.email("Invalid email address"),
    username: z
      .string()
      .min(1, "Username is required.")
      .min(3, "Username must be atleast 3 characters")
      .max(20, "Username must be under 20 characters."),
    password: z.string().min(3, "Password must be atleast 8 characters."),
    confirm_password: z.string().min(3, "Please confirm the password again."),
    email_notifications: z.boolean(),
    check_terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // Assign error to relevent field.
  });

type RegisterFormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const getError = (errors: any) => {
    const fields = Object.keys(errors);

    if (fields.length === 0) return "";
    return errors[fields[0]]?.message;
  };

  // useMutation
  // TData,      = Response data returned from the server
  // TError,     = Error type
  // TVariables, = Input variables passed to mutate()
  // TContext    = Optional: context for optimistic updates

  const useUserRegsiter = useMutation<Response, AxiosError<any>, FormData>({
    mutationFn: (user: FormData) =>
      axios
        .post("http://lumina.com/api/users", user, {
          withCredentials: true,
        })
        .then((res) => res.data),

    onSuccess: () => {
      console.log("Registration Successfull.");
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },

    onError: (error: AxiosError<any>) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const submitHandler = (data: RegisterFormData) => {
    // Send as form data
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append(
      "email_notifications",
      (data.email_notifications ?? false).toString(),
    );

    console.log(data);

    useUserRegsiter.mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-cover bg-center h-screen text-black overflow-auto no-scrollbar"
      >
        <div className="grid h-screen grid-cols-1 lg:grid-cols-[50%_50%]">
          <div
            style={{ backgroundImage: `url(${SignupBG})` }}
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
                Start your journey with Lumina. A place to showcase your talent
                and discover photography that inspires you.
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
                  Create your account and start building your visual story.
                  Upload your work, follow others, and grow your creative
                  network.
                </p>
              </div>
              <h3 className="text-sky-900 text-lg md:text-3xl">SIGN UP</h3>
              <input
                disabled
                value={errors && getError(errors)}
                className="
                    font-bold
                    text-red-500
                    w-full
                    mt-2
                    text-md
                    "
              />

              <div className="grid grid-cols-2 grid-rows-3 gap-4 gap-y-6 mt-2 transition-all duration-300">
                <div className="flex flex-col">
                  <label
                    htmlFor="fname"
                    className="
                      text-sm
                  "
                  >
                    First Name
                  </label>
                  <input
                    {...register("first_name")}
                    id="fname"
                    type="text"
                    className="
                    p-2
                    text-md
                    py-2.5
                    rounded-md
                    border
                    border-gray-300
                    hover:outline-2
                    outline-sky-200
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lname"
                    className="
                      text-sm
                  "
                  >
                    Last Name
                  </label>
                  <input
                    {...register("last_name")}
                    id="lname"
                    type="text"
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
                </div>
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
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="
                      text-sm
                  "
                  >
                    Username
                  </label>
                  <input
                    {...register("username")}
                    id="username"
                    type="text"
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
                    p-2 
                    py-2.5
                    border
                    border-gray-300
                    hover:outline-2
                    outline-sky-200
                    "
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="cpassword"
                    className="
                      text-sm
                  "
                  >
                    Confirm Password
                  </label>
                  <input
                    {...register("confirm_password")}
                    id="cpassword"
                    type="password"
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
                </div>
              </div>
              <div className="mt-2">
                <div>
                  <input
                    {...register("email_notifications")}
                    id="email_box"
                    type="checkbox"
                    className="
                      my-3 mr-3
                      cursor-pointer
                    "
                  />
                  <label htmlFor="email_box">Remember me</label>
                </div>
                <div>
                  <input
                    {...register("check_terms")}
                    id="policy"
                    type="checkbox"
                    className="my-3 mr-3 bg-sky-400"
                  />
                  <label htmlFor="policy">Yes, I want to receive emails</label>
                </div>
              </div>
              <button
                type="submit"
                className={`border mt-4 duration-400 text-white bg-sky-600 py-2 px-4 rounded-md font-semibold flex items-center justify-center text-sm hover:bg-sky-900 transition-all 
                    ${!isValid ? "cursor-not-allowed" : "cursor-pointer"}
                  `}
              >
                Sign Up
              </button>
              <p className="text-gray-500 text-sm mt-6 md:text-lg">
                Already have an account?{"  "}
                <Link className="font-bold text-sky-900 underline" to="/login">
                  Log in.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;

{
  /* <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000, // auto-dismiss after 3s
          style: {
            background: "#1E90FF", // DodgerBlue
            color: "white",
            fontWeight: "bold",
          },
        }}
      /> */
}
