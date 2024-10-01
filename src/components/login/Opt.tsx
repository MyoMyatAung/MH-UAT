import React, { useEffect, useRef, useState } from "react";
import back from "../../assets/login/back.svg";

interface OptProps {
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  showOtp: boolean;
}

const Opt: React.FC<OptProps> = ({ setShowOtp, showOtp }) => {
  const [otpDigits, setOtpDigits] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timer, setTimer] = useState<number>(10); 
  const [buttonText, setButtonText] = useState<string>("59 s"); 
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setButtonText("Resend Code");
    }
  }, [timer]);

  useEffect(() => {
    if (timer > 0) {
      setButtonText(`${timer} s`);
    }
  }, [timer]);

  const handleOTPChange = (index: number, value: string) => {
    const updatedOTP = [...otpDigits];
    updatedOTP[index] = value;
    setOtpDigits(updatedOTP);

    // Auto-focus on the next input box if current value is not empty
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className=" w-screen h-screen bg-[#161619] p-[20px]">
      <div className="flex justify-between w-2/3">
        <img onClick={() => setShowOtp(false)} src={back} alt="Back" />
        <h1 className="text-white text-[16px] font-[600] leading-[20px]">
          OTP Verification
        </h1>
      </div>

      {/* OTP Input Fields */}
      <div className="py-20 flex flex-col justify-center">
        <div className="">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="text"
              ref={(ref) => (inputRefs.current[index] = ref)}
              maxLength={1}
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              className="w-12 h-12 mx-1 pl-3 text-center rounded-[8px] bg-[#303030] text-white text-[20px]"
            />
          ))}
        </div>

        <p className="text-[#888] text-[10px] font-[400] leading-[15px] p-3 text-center">
          Verification code sent to{" "}
          <span className="text-white">DevelopX10@gmail.com</span> /{" "}
          <span className="text-white">+868880818.</span> Please check your
          messages and be sure to check your spam folder
        </p>
      </div>

      <div className="w-full py-[0px]">
        <button
          disabled={timer > 0}
          onClick={() => console.log('otp')}
          className={` px-[15px] py-[10px] w-full text-[16px] font-[600] leading-[22px]  ${timer > 0 ? "otp_button text-white" : " bg-white rounded-[80px] text-black"} `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Opt;
