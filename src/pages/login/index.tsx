import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./login.css";
import logo from "../../assets/login/logo.png";
import Button from "../../components/login/Button";
import blue from "../../assets/login/blue.png";
import eye from "../../assets/login/eye.png";
import weChat from "../../assets/login/weChat.png";
import LoginEmail from "../../components/login/LoginEmail";
import SignUp from "../../components/login/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { setLoginOpen, setSignupOpen } from "../../features/login/ModelSlice";
import Captch from "../../components/login/Captch";


const Login: React.FC = () => {
    const [showCapt, setShowCapt] = useState(true);

  const dispatch = useDispatch();
  const { openLoginModel, openSignupModel,openCaptcha } = useSelector(
    (state: any) => state.model
  );
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = (login: boolean, signup: boolean) => {
    setIsVisible(false);
    dispatch(setLoginOpen(login));
    dispatch(setSignupOpen(signup));
  };

  const handleBack = () => {
    setIsVisible(true);
    dispatch(setLoginOpen(false));
    dispatch(setSignupOpen(false));
  };

  const variants = {
    hidden: { y: 300 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: {
      y: "100%",
      transition: { type: "tween", duration: 0.5 },
    },
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y > 100) setIsVisible(false);
  };

  return (
    <div className="h-screen whole flex items-center justify-center overflow-hidden ">
      {/* {openCaptcha && <Captch /> } */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="login_box h-[410px] absolute bottom-0 z-[999] w-full max-w-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            // drag="y"
            // dragConstraints={{ top: 0 }}
            // dragElastic={0.2}
            // onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col justify-center items-center gap-[32px]">
              <motion.p className="w-[60px] h-[4px] drag_line mt-[12px] cursor-pointer" />
              <img src={logo} className="w-[168px] h-[60px]" alt="Logo" />
              <div className="flex flex-col gap-[10px]">
                <Button
                  onClick={() => toggleVisibility(true, false)}
                  text={"Login"}
                />
                <Button
                  onClick={() => toggleVisibility(false, true)}
                  text={"Sign Up"}
                />
              </div>
              <p className="text-[#888] text-[12px] font-[500] leading-[18px]">
                Link account with
              </p>
              <div className="flex gap-[22px]">
                <img className="w-[50px] h-[50px]" src={weChat} alt="WeChat" />
                <img className="w-[50px] h-[50px]" src={blue} alt="Blue" />
                <img className="w-[50px] h-[50px]" src={eye} alt="Eye" />
              </div>
            </div>
          </motion.div>
        )}

        {openLoginModel && <LoginEmail handleBack={handleBack} />}
        {openSignupModel && <SignUp handleBack={handleBack} />}
      </AnimatePresence>
    </div>
  );
};

export default Login;
