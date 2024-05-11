import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
import { useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function Otp() {
  const [pins, setPins] = useState(Array(7).fill(""));
  const [email, setEmail] = useState("");
  // const data = useActionData();
  const otpLoaderData = useLoaderData();
  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    // const user = Cookies.get("user");
    // if (user) {
    //   const userJson = JSON.parse(user);
    //   setEmail(userJson.email);
    //   console.log(userJson.email);
    // }
    setEmail(otpLoaderData as string);
  }, []);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPin = [...pins];
    newPin[index] = e.target.value;
    setPins(newPin);
  };

  const handleOnPasteData = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData.getData("Text");
    const passwordInArray = clipboardData.slice(0, 7).split("");
    const newPins = [...pins];
    passwordInArray.map((item, i) => {
      newPins[i] = item;
    });

    setPins(newPins);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-slate-200 ">
      <div className="h-96 rounded-md w-[90%] md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/4 flex flex-col justify-center items-center bg-white">
        <h2 className="font-extrabold text-2xl">Enter code</h2>
        <p className="mb-4">We sent a code to {email}</p>
        <p></p>
        <Form action="/confirm-otp" method="post">
          {pins.map((value, index) => (
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e, index)
              }
              onPaste={handleOnPasteData}
              key={index}
              type="text"
              maxLength={1}
              value={value}
              className="border text-center border-green-300 rounded-md p-2 mx-1 w-10 h-10 md:w-14 md:h-14 focus:outline-none focus:border-2 focus:border-green-300"
            />
          ))}
          <input name="data" type="hidden" value={pins} />
          <div className="flex gap-4 mt-3">
            <button
              type="submit"
              className="mt-2 text-customGreen font-medium block border rounded-md p-2"
            >
              Send code
            </button>
            <button className="mt-2 text-customGreen font-medium">
              Resend code
            </button>
            {isSubmitting ? (
              <FaSpinner className="animate-spin text-white" />
            ) : (
              ""
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

// registration
// 1. what should we call u(username)?
// 2 Otp
// 3.

// after login
// 1. set profile pic
// 2. where do you live
// 3. pick theme
// 4. describe yourself
