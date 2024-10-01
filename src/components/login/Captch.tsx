import React, { useState, useEffect } from "react";
import capClose from "../../assets/login/capClose.svg";
import {
  encryptWithRsa,
  generateSignature,
  decryptWithAes,
} from "../../services/newEncryption";
import { useDispatch } from "react-redux";
import { setCaptchaOpen } from "../../features/login/ModelSlice";

const API_URL = "https://cc3e497d.qdhgtch.com:2345/api/";
const PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA02F/kPg5A2NX4qZ5JSns+bjhVMCC6JbTiTKpbgNgiXU+Kkorg6Dj
76gS68gB8llhbUKCXjIdygnHPrxVHWfzmzisq9P9awmXBkCk74Skglx2LKHa/mNz
9ivg6YzQ5pQFUEWS0DfomGBXVtqvBlOXMCRxp69oWaMsnfjnBV+0J7vHbXzUIkqB
LdXSNfM9Ag5qdRDrJC3CqB65EJ3ARWVzZTTcXSdMW9i3qzEZPawPNPe5yPYbMZIo
XLcrqvEZnRK1oak67/ihf7iwPJqdc+68ZYEmmdqwunOvRdjq89fQMVelmqcRD9RY
e08v+xDxG9Co9z7hcXGTsUquMxkh29uNawIDAQAB
-----END RSA PUBLIC KEY-----`;

interface CaptchProps {}

const Captch: React.FC<CaptchProps> = ({}) => {
  const dispatch = useDispatch();
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [keyStatus, setkeyStatus] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Fetch captcha when the component loads
  useEffect(() => {
    getCaptcha();
  }, []);

  // Update button state based on captcha input
  useEffect(() => {
    setIsButtonDisabled(captchaCode.length !== 4);
  }, [captchaCode]);

  const getCaptcha = async () => {
    try {
      const result = await fetch(`${API_URL}v1/user/get_captcha`, {
        method: "GET",
      });
      const captcha = await result.json();
      setCaptchaImage(captcha.data.base64);
      setkeyStatus(captcha.data.key);
    } catch (err) {
      setError("Failed to load captcha");
      console.error("Captcha error:", err);
    }
  };

  const handleLogin = async () => {
    // Login logic here
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-[12px] w-screen h-screen flex justify-center items-center">
      {captchaImage && (
        <div className="bg-[#1C1B20] w-[310px] h-[170px] p-[20px]">
          <div className="flex justify-between items-center pb-[16px]">
            <h1 className="text-white text-[16px] font-[400] text-center">Verify</h1>
            <img
              onClick={() => dispatch(setCaptchaOpen(false))}
              className="p-1 bg-white"
              src={capClose}
              alt="Close"
            />
          </div>
          <div className="flex justify-center items-center gap-[4px]">
            <input
              type="text"
              placeholder="Enter Code"
              className="bg-[#333237] rounded-[4px] text-white p-[10px] focus:outline-none h-[40px]"
              value={captchaCode}
              onChange={(e) => setCaptchaCode(e.target.value)}
            />
            <img className="w-[87px] h-[40px]" src={captchaImage} alt="Captcha" />
          </div>
          <button
            className={`mt-[16px] w-full rounded-[4px] p-[10px] text-[14px] font-[400] ${
              isButtonDisabled ? "bg-[#333237] text-[#777]" : "bg-white text-black"
            }`}
            disabled={isButtonDisabled}
            onClick={handleLogin}
          >
            Sure
          </button>
        </div>
      )}
    </div>
  );
};

export default Captch;
