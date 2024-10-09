// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   useChangeEmailMutation,
//   useChangePhnumberMutation,
// } from "../../services/profileApi"; // Import your mutation
// import { useDispatch, useSelector } from "react-redux";
// import { setOtpOpen } from "../../../../features/login/ModelSlice";
// import { setCaptchaOpen } from "../../../../features/login/ModelSlice";
// import { setUser } from "../slice/UserSlice";

// const Otp: React.FC<{ data: string; type: string }> = ({ data, type }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // For 6 OTP digits
//   const [timer, setTimer] = useState(60); // Set timer to 60 seconds
//   const [errorMessage, setErrorMessage] = useState("");

//   const [changeEmail, { isError, isSuccess }] = useChangeEmailMutation(); // RTK Mutation for email change
//   const [changePhumber, { isError: ph_error, isSuccess: ph_success }] =
//     useChangePhnumberMutation(); // RTK Mutation for email change
//   const user = useSelector((state: any) => state.user.user);

//   // Countdown for resending OTP
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => setTimer(timer - 1), 1000);
//       return () => clearInterval(countdown);
//     }
//   }, [timer]);

//   // Handle OTP input changes
//   const handleChange = (value: string, index: number) => {
//     if (value.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Automatically move to the next input if the current one is filled
//       const nextInput = document.getElementById(`otp-input-${index + 1}`);
//       if (nextInput && value) {
//         (nextInput as HTMLInputElement).focus();
//       }

//       // If the OTP is fully filled, automatically call the API
//       if (newOtp.every((digit) => digit.length === 1)) {
//         handleSubmit(newOtp.join(""));
//       }
//     }
//   };

//   // Function to handle OTP submission automatically when fully filled
//   const handleSubmit = async (otpString: string) => {
//     try {
//       if (otpString.length === 6) {
//         console.log("OTP entered:", otpString);
//         let response;

//         if (type === "email") {
//           // Call the changeEmail mutation with the verified OTP and email
//           response = await changeEmail({
//             new_email: data, // The email passed from the parent component
//             email_code: otpString, // The 6-digit OTP
//           }).unwrap();
//           dispatch(
//             setUser({
//               ...user,
//               email: data, // Update the nickname
//             })
//           );
//         } else {
//           response = await changePhumber({
//             new_phone: data, // The email passed from the parent component
//             sms_code: otpString, // The 6-digit OTP
//           }).unwrap();
//           dispatch(
//             setUser({
//               ...user,
//               phone: data, // Update the nickname
//             })
//           );
//         }
//         setErrorMessage("");

//         dispatch(setOtpOpen(false));
//         dispatch(setCaptchaOpen(false));
//         navigate("/info");
//         console.log(`${type} changed successfully:`, response);
//       }
//     } catch (error) {
//       console.log(error);
//       setErrorMessage((error as any)?.data?.msg || "An error occurred");
//       console.error("Failed to change email:", error);
//     }
//   };
//   const handleResend = () => {
//     console.log("a");
//   };

//   return (
//     <div className="text-white">
//       <div className="flex items-center justify-between w-full mt-5 px-4">
//         <button
//           onClick={() => {
//             dispatch(setOtpOpen(false));
//             dispatch(setCaptchaOpen(false));
//           }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="10"
//             height="14"
//             viewBox="0 0 10 14"
//             fill="none"
//           >
//             <path
//               d="M9.2651 0.490513C9.16609 0.406457 9.04848 0.339768 8.91899 0.294266C8.7895 0.248764 8.65069 0.225342 8.51049 0.225342C8.3703 0.225342 8.23148 0.248764 8.102 0.294266C7.97251 0.339768 7.85489 0.406457 7.75589 0.490513L0.670255 6.49096C0.59121 6.55776 0.528499 6.63711 0.485711 6.72446C0.442923 6.81181 0.420898 6.90545 0.420898 7.00002C0.420898 7.09459 0.442923 7.18823 0.485711 7.27558C0.528499 7.36293 0.59121 7.44228 0.670255 7.50908L7.75589 13.5095C8.17369 13.8633 8.8473 13.8633 9.2651 13.5095C9.68291 13.1557 9.68291 12.5853 9.2651 12.2315L3.09182 6.99641L9.27363 1.76136C9.68291 1.41477 9.68291 0.837109 9.2651 0.490513Z"
//               fill="white"
//             />
//           </svg>
//         </button>
//         <div className="text-lg font-semibold">OTP Verification</div>
//         <div />
//       </div>
//       <div className="flex flex-col justify-center items-center mt-10 p-3">
//         {/* OTP Input Boxes */}
//         <div className="flex mt-8 space-x-2">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-input-${index}`}
//               type="text"
//               maxLength={1}
//               className="w-10 h-10 otp-input text-center text-white border-b-2 focus:outline-none"
//               value={digit}
//               onChange={(e) => handleChange(e.target.value, index)}
//             />
//           ))}
//         </div>

//         {/* OTP Verification Message */}
//         <p className="mt-4 text-center text-sm text-gray-400">
//           Verification code sent to <span className="text-white">{data}</span>.
//           Please check your messages and be sure to check your spam folder.
//         </p>

//         {/* Resend OTP Timer */}
//         <div className="mt-6 otp_btn">
//           {timer > 0 ? (
//             <p className="text-gray-400">{timer} s</p>
//           ) : (
//             <button className="text-white" onClick={handleResend}>
//               Resend OTP
//             </button>
//           )}
//         </div>

//         {/* Show success or error message */}
//         {isSuccess && (
//           <p className="text-green-500 mt-3">{type} changed successfully!</p>
//         )}
//         {isError && errorMessage && (
//           <p className="text-red-500 mt-3">{errorMessage}</p>
//         )}
//         {/* Show success or error message */}
//         {ph_success && (
//           <p className="text-green-500 mt-3">{type} changed successfully!</p>
//         )}
//         {ph_error && errorMessage && (
//           <p className="text-red-500 mt-3">{errorMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Otp;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useChangeEmailMutation,
  useChangePhnumberMutation,
  useLazySendCodeQuery, // Add the sendCode mutation
} from "../../services/profileApi"; // Import your mutation
import { useDispatch, useSelector } from "react-redux";
import {
  setOtpOpen,
  setCaptchaOpen,
} from "../../../../features/login/ModelSlice";
import { setUser } from "../slice/UserSlice";

const Otp: React.FC<{ data: string; type: string }> = ({ data, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // For 6 OTP digits
  const [timer, setTimer] = useState(60); // Set timer to 60 seconds
  const [errorMessage, setErrorMessage] = useState("");

  const [changeEmail, { isError, isSuccess }] = useChangeEmailMutation(); // RTK Mutation for email change
  const [changePhumber, { isError: ph_error, isSuccess: ph_success }] =
    useChangePhnumberMutation(); // RTK Mutation for phone number change
  const [triggerSendCode, { isLoading: isResending }] = useLazySendCodeQuery(); // Add sendCode mutation for resending OTP
  const user = useSelector((state: any) => state.user.user);

  // Countdown for resending OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Handle OTP input changes
  const handleChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input if the current one is filled
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput && value) {
        (nextInput as HTMLInputElement).focus();
      }

      // If the OTP is fully filled, automatically call the API
      if (newOtp.every((digit) => digit.length === 1)) {
        handleSubmit(newOtp.join(""));
      }
    }
  };

  // Function to handle OTP submission automatically when fully filled
  const handleSubmit = async (otpString: string) => {
    try {
      if (otpString.length === 6) {
        console.log("OTP entered:", otpString);
        let response;

        if (type === "email") {
          response = await changeEmail({
            new_email: data, // The email passed from the parent component
            email_code: otpString, // The 6-digit OTP
          }).unwrap();
          dispatch(setUser({ ...user, email: data }));
        } else {
          response = await changePhumber({
            new_phone: data, // The phone number passed from the parent component
            sms_code: otpString, // The 6-digit OTP
          }).unwrap();
          dispatch(setUser({ ...user, phone: data }));
        }
        setErrorMessage("");

        dispatch(setOtpOpen(false));
        dispatch(setCaptchaOpen(false));
        navigate("/info");
        console.log(`${type} changed successfully:`, response);
      }
    } catch (error) {
      setErrorMessage((error as any)?.data?.msg || "An error occurred");
      console.error("Failed to change:", error);
    }
  };

  // Function to handle OTP resend
  const handleResend = () => {
    dispatch(setOtpOpen(false));
    dispatch(setCaptchaOpen(true));
  };

  return (
    <div className="text-white">
      <div className="flex items-center justify-between w-full mt-5 px-4">
        <button
          onClick={() => {
            dispatch(setOtpOpen(false));
            dispatch(setCaptchaOpen(false));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
          >
            <path
              d="M9.2651 0.490513C9.16609 0.406457 9.04848 0.339768 8.91899 0.294266C8.7895 0.248764 8.65069 0.225342 8.51049 0.225342C8.3703 0.225342 8.23148 0.248764 8.102 0.294266C7.97251 0.339768 7.85489 0.406457 7.75589 0.490513L0.670255 6.49096C0.59121 6.55776 0.528499 6.63711 0.485711 6.72446C0.442923 6.81181 0.420898 6.90545 0.420898 7.00002C0.420898 7.09459 0.442923 7.18823 0.485711 7.27558C0.528499 7.36293 0.59121 7.44228 0.670255 7.50908L7.75589 13.5095C8.17369 13.8633 8.8473 13.8633 9.2651 13.5095C9.68291 13.1557 9.68291 12.5853 9.2651 12.2315L3.09182 6.99641L9.27363 1.76136C9.68291 1.41477 9.68291 0.837109 9.2651 0.490513Z"
              fill="white"
            />
          </svg>
        </button>
        <div className="text-lg font-semibold">OTP Verification</div>
        <div />
      </div>
      <div className="flex flex-col justify-center items-center mt-10 p-3">
        {/* OTP Input Boxes */}
        <div className="flex mt-8 space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              className="w-10 h-10 otp-input text-center text-white border-b-2 focus:outline-none"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        {/* OTP Verification Message */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Verification code sent to <span className="text-white">{data}</span>.
          Please check your messages and be sure to check your spam folder.
        </p>

        {/* Resend OTP Timer */}
        <div className="mt-6 otp_btn">
          {timer > 0 ? (
            <p className="text-gray-400">{timer} s</p>
          ) : (
            <button
              className="text-white"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

        {/* Show success or error message */}
        {isSuccess && (
          <p className="text-green-500 mt-3">{type} changed successfully!</p>
        )}
        {isError && errorMessage && (
          <p className="text-red-500 mt-3">{errorMessage}</p>
        )}
        {/* Show success or error message */}
        {ph_success && (
          <p className="text-green-500 mt-3">{type} changed successfully!</p>
        )}
        {ph_error && errorMessage && (
          <p className="text-red-500 mt-3">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Otp;
