// Login.tsx
import React, { useState } from "react";
import { loginUser } from "../../services/userService";
import { motion, AnimatePresence } from "framer-motion";
import "./login.css";
import logo from "../../assets/login/logo.png";
import Button from "../../components/login/Button";
import blue from "../../assets/login/blue.png";
import eye from "../../assets/login/eye.png";
import weChat from "../../assets/login/weChat.png";
import LoginEmail from "../../components/login/LoginEmail"; // Import your LoginEmail component

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isEmailVisible, setEmailVisible] = useState(false); // State for LoginEmail visibility

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser(username, password);
      console.log("Login success:", result);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleShowLoginEmail = () => {
    setIsVisible(false); // Hide the login component
    setEmailVisible(true); // Show the LoginEmail component
  };

  const handleBack = () => {
    setIsVisible(true); // Show the login component
    setEmailVisible(false); // Hide the LoginEmail component
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
    if (info.offset.y > 100) {
      setIsVisible(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="login_box h-[410px] absolute bottom-0 z-[999] w-full max-w-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            drag="y" // Allow dragging only in the vertical direction
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col justify-center items-center gap-[32px]">
              <motion.p className="w-[60px] h-[4px] drag_line mt-[12px] cursor-pointer"></motion.p>
              <img src={logo} className="w-[168px] h-[60px]" alt="Logo" />
              <div className="flex flex-col gap-[10px]">
                <Button onClick={handleShowLoginEmail} text={"Login"} />
                <Button onClick={() => console.log("click")} text={"Sign Up"} />
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
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          </motion.div>
        )}

        {isEmailVisible && <LoginEmail handleBack={handleBack} />}
      </AnimatePresence>
    </div>
  );
};

export default Login;
