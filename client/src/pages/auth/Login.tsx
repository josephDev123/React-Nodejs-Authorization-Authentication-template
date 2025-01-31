import { Link } from "react-router-dom";
// import { useActionData } from "react-router-dom";
import { Form } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useNavigation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import { AiOutlineEye } from "react-icons/ai";
// import { useState } from "react";

export default function Login() {
  // const actionData = useActionData();
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  function FederatedLogin() {
    window.location.href = "http://localhost:7000/auth/login/federated/google";
  }

  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4">
        <h3 className="text-center font-bold text-lg mb-5">Login</h3>
        <Form action="/login" method="post">
          <div className="flex flex-col">
            <label>Names</label>
            <input
              type="text"
              name="name"
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your names"
            />
          </div>

          {/* <div className="flex flex-col mt-2 relative">
            <label>Password</label>
            <input
              name="password"
              type={`${!showPassword ? "password" : "text"}`}
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your correct password"
            />
            <AiOutlineEye
              className="absolute right-1 top-11 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div> */}

          <div className="flex flex-col mt-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your correct Email"
            />
          </div>

          <button
            type="submit"
            className="p-2 border-2 rounded-md mt-4 w-full font-semibold bg-slate-500 flex items-center justify-center relative"
          >
            <span className="flex items-center justify-center">Login</span>
            <span className="absolute right-2">
              {isSubmitting ? (
                <FaSpinner className="animate-spin text-white" />
              ) : (
                ""
              )}
            </span>
          </button>
        </Form>
        <p className="mt-4">
          Not registered yet,
          <Link to="/register" className="text-blue-600 font-semibold ">
            Register
          </Link>
        </p>

        <button
          onClick={() => FederatedLogin()}
          type="button"
          className="rounded-full p-2 border inline-flex items-center justify-center gap-2 w-full mt-4 "
        >
          <FcGoogle className="text-lg" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
