import React, { useState } from "react";
import back from "../../assets/login/back.svg";
import eye from "../../assets/login/eye.svg";

interface ForgotPassProps {
  setForgot: React.Dispatch<React.SetStateAction<boolean>>;
  forgot: boolean;
}

const ForgotPass: React.FC<ForgotPassProps> = ({ setForgot }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const show = () => {
    console.log("show");
    setShowPassword(!showPassword);
  };
  return (
    <div className="  z-[11111111] w-screen h-screen bg-[#161619]">
      <div className=" p-[20px]">
        {/* head */}
        <div className=" flex justify-between w-2/3">
          <img onClick={() => setForgot(false)} src={back} alt="" />
          <h1 className=" text-white text-[16px] font-[600] leading-[20px]">
            Forgot Password
          </h1>
        </div>
        <form
          //   onSubmit={handleLogin}
          className="w-full flex flex-col gap-[40px] pt-[40px] px-[10px]"
        >
          <div className="relative ">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(email !== "")}
              className="w-full px-4 py-2 bg-transparent input_border focus:outline-none text-white placeholder-transparent"
              required
              placeholder="Enter Account Name, Phone Number, Email"
            />
            <label
              htmlFor="email"
              className={`absolute text-[14px] left-4 top-1/2 transform -translate-y-1/2 transition-all text-[#5B5B5B] pointer-events-none ${
                isFocusedEmail || email
                  ? "top-0 text-xs text-blue-500"
                  : "top-1/2"
              }`}
            >
              Enter Your Mail or Phone Number
            </label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(password !== "")}
              className="w-full px-4 py-2 bg-transparent input_border focus:outline-none text-white placeholder-transparent"
              required
              placeholder="Please Enter Your Password"
            />
            <label
              htmlFor="password"
              className={`absolute text-[14px] left-4 top-1/2 transform -translate-y-1/2 transition-all text-[#5B5B5B] pointer-events-none ${
                isFocusedPassword || password
                  ? "top-0 text-xs text-blue-500"
                  : "top-1/2"
              }`}
            >
              Set New Password
            </label>
            <img
              onClick={show}
              className=" absolute right-0 bottom-[15px]"
              src={eye}
              alt=""
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(password !== "")}
              className="w-full px-4 py-2 bg-transparent input_border focus:outline-none text-white placeholder-transparent"
              required
              placeholder="Please Enter Your Password"
            />
            <label
              htmlFor="password"
              className={`absolute text-[14px] left-4 top-1/2 transform -translate-y-1/2 transition-all text-[#5B5B5B] pointer-events-none ${
                isFocusedPassword || password
                  ? "top-0 text-xs text-blue-500"
                  : "top-1/2"
              }`}
            >
              Enter New Password Again
            </label>
            <img
              onClick={show}
              className=" absolute right-0 bottom-[15px]"
              src={eye}
              alt=""
            />
          </div>
          {/* notice */}
          <div className=" mt-[-20px] text-[12px] font-[500] leading-[20px] text-[#888]">
            <p>8-25 characters</p>
            <p>
              Must be a combination of at least two of the following: letters,
              numbers.
            </p>
          </div>

          <button
            disabled
            type="submit"
            className="w-full next_button mt-[20px] text-white/20 py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
