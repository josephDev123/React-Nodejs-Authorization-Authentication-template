import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Register() {
  const actionData = useActionData();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  console.log(actionData);
  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 justify-center items-center">
      <div className="w-[80%] md:w-[50%] lg:w-[400px] bg-white rounded-md p-4">
        <h3 className="text-center font-bold text-lg mb-5">Register</h3>
        <Form method="post" action="/register">
          <div className="flex flex-col">
            <label>Names</label>
            <input
              name="name"
              type="text"
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your names"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="p-2 border-2 rounded-md outline-none focus:border-green-300 mt-1"
              placeholder="Enter your correct Email"
            />
          </div>

          <div className="flex flex-col mt-2 relative">
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
          </div>

          <button
            type="submit"
            className="p-2 border-2 rounded-md mt-4 w-full font-semibold bg-slate-500 flex items-center justify-center relative"
          >
            <span className="flex items-center justify-center">Register</span>
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
          {" "}
          Already registered,{" "}
          <Link to="/login" className="text-blue-600 font-semibold ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
