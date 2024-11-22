// export const ConfirmOtp = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const { otp, email } = req.body;
//       const formatOtp = otp.split(",").join("");
//       // console.log(formatOtp);

//       const confirmOtp = await UserModel.findOne({
//         email: email,
//         otp: formatOtp,
//       });

//       // console.log(confirmOtp);

//       if (!confirmOtp) {
//         const error = new GlobalErrorHandler(
//           "OtpError",
//           "User/Otp not found",
//           500,
//           true,
//           "error"
//         );
//         next(error);
//         return;
//       } else {
//         const updatedUser = await UserModel.findOneAndUpdate(
//           { email: email },
//           { confirm_otp: true },
//           { new: true } // This option returns the updated document
//         );
//         res.cookie("user", JSON.stringify(updatedUser));

//         return (
//           res
//             .status(200)
//             // .json({ error: false, showMessage: true, message: "Otp confirm" });
//             .json({
//               error: false,
//               showMessage: true,
//               message: "New user created",
//             })
//         );
//       }
//     } catch (error) {
//       const errorFormat = error as GlobalErrorHandler;
//       const errorObj = new GlobalErrorHandler(
//         errorFormat.name,
//         "Something went wrong",
//         500,
//         false,
//         "error"
//       );

//       return next(errorObj);
//     }
//   };

//   export const refresh_token = async (req: Request, res: Response) => {
//     const { email } = req.query;

//     try {
//       //  1. check whether the user exist
//       const userExists = await UserModel.findOne({ email });

//       if (userExists) {
//         // The user with the specified email exists
//         // You can add your logic here
//         // const token = await createToken(email);
//         // console.log(token);
//         // res.cookie("token", token, {
//         //   maxAge: 300000,
//         //   secure: true,
//         //   httpOnly: false,
//         // });
//         // return res.status(200).json({
//         //   error: false,
//         //   showMessage: true,
//         //   message: "token created successful",
//         //   data: token,
//         // });
//       } else {
//         // The user with the specified email does not exist
//         // You can add your logic here
//         return res.status(400).json({
//           error: true,
//           showMessage: false,
//           message: "User doesn't exist",
//           data: "",
//         });
//       }
//     } catch (error) {
//       // Handle any errors, such as a database connection issue
//       console.error(`Error checking if the user exists: ${error}`);
//       return res.status(200).json({
//         error: true,
//         showMessage: false,
//         message: (error as Error).message,
//       });
//     }
//   };

//   export const MiddlewareTesting = async (req: Request, res: Response) => {
//     try {
//       return res.json({
//         error: false,
//         showMessage: true,
//         message: "hello world from the middleware testing",
//       });
//     } catch (error: any) {
//       return res.json({
//         error: true,
//         showMessage: true,
//         message: error.message,
//       });
//     }
//   };
