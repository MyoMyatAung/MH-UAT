import React, { useState, useEffect } from "react";
import capClose from "../../assets/login/capClose.svg";
import {
  encryptWithRsa,
  generateSignature,
  decryptWithAes,
} from "../../services/newEncryption";

const API_URL = "https://cc3e497d.qdhgtch.com:2345/api/";
const PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA02F/kPg5A2NX4qZ5JSns+bjhVMCC6JbTiTKpbgNgiXU+Kkorg6Dj
76gS68gB8llhbUKCXjIdygnHPrxVHWfzmzisq9P9awmXBkCk74Skglx2LKHa/mNz
9ivg6YzQ5pQFUEWS0DfomGBXVtqvBlOXMCRxp69oWaMsnfjnBV+0J7vHbXzUIkqB
LdXSNfM9Ag5qdRDrJC3CqB65EJ3ARWVzZTTcXSdMW9i3qzEZPawPNPe5yPYbMZIo
XLcrqvEZnRK1oak67/ihf7iwPJqdc+68ZYEmmdqwunOvRdjq89fQMVelmqcRD9RY
e08v+xDxG9Co9z7hcXGTsUquMxkh29uNawIDAQAB
-----END RSA PUBLIC KEY-----`;

interface CaptchProps {
  setShowCapt: React.Dispatch<React.SetStateAction<boolean>>;
  showCapt: boolean;
}

const Captch: React.FC<CaptchProps> = ({setShowCapt,showCapt}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [keyStatus, setkeyStatus] = useState("");
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<object | null>(null);

  // Fetch captcha when the component loads
  useEffect(() => {
    getCaptcha();
  }, []);

  const getCaptcha = async () => {
    try {
      const result = await fetch(`${API_URL}v1/user/get_captcha`, {
        method: "GET",
      });
      console.log(result);
      const captcha = await result.json();

      console.log(captcha);
      setCaptchaImage(captcha.data.base64);
      setkeyStatus(captcha.data.key);

      // setCaptchaImage(captcha.image);
    } catch (err) {
      setError("Failed to load captcha");
      console.error("Captcha error:", err);
    }
  };

  const handleLogin = async () => {
    try {
      // First, verify the captcha
      const captchaResult = await fetch(`${API_URL}v1/user/check_captcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: captchaCode,
          key: keyStatus,
        }),
      });

      const captchaResponse = await captchaResult.json();

      // if (!captchaResponse.success) {
      //   setError("Invalid captcha code");
      //   return;
      // }

      const formData = {
        username,
        password,
        captcha: captchaResponse.data.key,
        timestamp: new Date().getTime(),
      };

      // Encrypt the data
      const encryptedData = encryptWithRsa(
        JSON.stringify(formData),
        PUBLIC_KEY
      );

      // Generate signature
      const signature = generateSignature(encryptedData);

      // Make API call for login
      const result = await fetch(`${API_URL}v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pack: encryptedData,
          signature,
        }),
      });

      const dataIsEncrypt = result.headers.get("x-app-data-encrypt");
      const resultText = await result.text();

      // Handle the response (decrypt if needed)
      if (!dataIsEncrypt) {
        setResponse(JSON.parse(resultText));
      } else {
        const decryptedData = decryptWithAes(resultText);
        setResponse(decryptedData);
      }
    } catch (err) {
      setError("Login failed");
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[12px]  w-screen h-screen flex justify-center items-center">
      {/* <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}

      {captchaImage && (
        <div className=" bg-[#1C1B20] w-[310px] h-[170px] p-[20px]">
          <div className=" flex justify-between items-center pb-[16px]">
            <h1 className=" text-white text-[16px] font-[400] text-center ">
              Verify
            </h1>
            <img onClick={() => setShowCapt(false)} className=" p-1 bg-white" src={capClose} alt="" />
          </div>
          <div className=" flex justify-center items-center gap-[4px]">
            <input
              type="text"
              placeholder="Enter Code"
              className=" bg-[#333237] rounded-[4px] text-white p-[10px] focus:outline-none h-[40px]"
              value={captchaCode}
              onChange={(e) => setCaptchaCode(e.target.value)}
            />
            <img
              className=" w-[87px] h-[40px]"
              src={captchaImage}
              alt="Captcha"
            />
          </div>
          <button className=" mt-[16px] w-full bg-[#333237] rounded-[4px] p-[10px] text-[14px] font-[400] text-[#777]">Sure</button>
        </div>
      )}

      {/* <button onClick={handleLogin}>Login</button>

      {response && <div>Response: {JSON.stringify(response)}</div>}
      {error && <div>Error: {error}</div>} */}
    </div>
  );
};

export default Captch;
