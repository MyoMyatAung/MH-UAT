import axios from "axios";
import {
  encryptWithRsa,
  generateSignature,
  decryptWithAes,
} from "./newEncryption";

const API_URL = "https://cc3e497d.qdhgtch.com:2345/api/";
const PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY-----
  MIIBCgKCAQEA02F/kPg5A2NX4qZ5JSns+bjhVMCC6JbTiTKpbgNgiXU+Kkorg6Dj
  76gS68gB8llhbUKCXjIdygnHPrxVHWfzmzisq9P9awmXBkCk74Skglx2LKHa/mNz
  9ivg6YzQ5pQFUEWS0DfomGBXVtqvBlOXMCRxp69oWaMsnfjnBV+0J7vHbXzUIkqB
  LdXSNfM9Ag5qdRDrJC3CqB65EJ3ARWVzZTTcXSdMW9i3qzEZPawPNPe5yPYbMZIo
  XLcrqvEZnRK1oak67/ihf7iwPJqdc+68ZYEmmdqwunOvRdjq89fQMVelmqcRD9RY
  e08v+xDxG9Co9z7hcXGTsUquMxkh29uNawIDAQAB
  -----END RSA PUBLIC KEY-----`;
// GET request


/**
 * Fetch captcha image and key status
 * @returns {Promise<{captchaImage: string, keyStatus: string}>}
 */
export const getCaptcha = async () => {
  try {
    const response = await fetch(`${API_URL}v1/user/get_captcha`, {
      method: "GET",
    });

    const captchaData = await response.json();

    if (captchaData && captchaData.data) {
      return {
        captchaImage: captchaData.data.base64,
        keyStatus: captchaData.data.key,
      };
    } else {
      throw new Error("Failed to fetch captcha data");
    }
  } catch (err) {
    console.error("Error fetching captcha:", err);
    throw err;
  }
};

/**
 * Login function
 * @param {string} username
 * @param {string} password
 * @param {string} captchaCode
 * @param {string} keyStatus
 * @returns {Promise<object>}
 */
export const login = async (
  username: string,
  password: string,
  captchaCode: string,
  keyStatus: string
) => {
  try {
    // Step 1: Verify captcha
    const captchaResult = await fetch(`${API_URL}v1/user/check_captcha`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: captchaCode,
        key: keyStatus,
      }),
    });

    const captchaResponse = await captchaResult.json();

    if (!captchaResponse.data) {
      throw new Error("Captcha verification failed");
    }

    const formData = {
      username,
      password,
      captcha: captchaResponse.data.key,
      timestamp: new Date().getTime(),
    };

    console.log("formData is=<", formData);
    // Step 2: Encrypt the data
    const encryptedData = encryptWithRsa(JSON.stringify(formData), PUBLIC_KEY);

    // Step 3: Generate signature
    const signature = generateSignature(encryptedData);

    // Step 4: Make the login API call
    const loginResponse = await fetch(`${API_URL}v1/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pack: encryptedData,
        signature,
      }),
    });

    const dataIsEncrypt = loginResponse.headers.get("x-app-data-encrypt");
    const resultText = await loginResponse.text();

    // Step 5: Handle the response (decrypt if needed)
    if (!dataIsEncrypt) {
      return JSON.parse(resultText);
    } else {
      return decryptWithAes(resultText);
    }
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
};

// fetch(API_URL + /v1/app/config?pack=${encrypted}&signature=${signature}).then(r => r.json()).then(d => {
//   console.log(d)
// });
// export const getOtp = async (
//   captchaCode: string,
//   // keyStatus: string,
//   email: string
// ): Promise<void> => {
//   try {
//     const otpResponse = await axios.get(
//       "https://cc3e497d.qdhgtch.com:2345/api/v1/user/get_code",
//       {
//         params: {
//           send_type: "email",
//           to: email,
//           captcha: captchaCode,
//         },
//       }
//     );

//     console.log("OTP Request successful:", otpResponse.data);
//   } catch (error) {
//     console.error("Error requesting OTP:", error);
//   }
// };

export const registerEmail = async (
  email: string,
  password: string,
  email_code: string
) => {
  const formData = {
    email,
    password,
    email_code,
  };
  const encryptedData = encryptWithRsa(JSON.stringify(formData), PUBLIC_KEY);

  const signature = generateSignature(encryptedData);

  console.log(formData);
  try {
    const response = await axios.post(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/user/register/email",
      encryptedData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const registerPhone = async (
  Phone: string,
  password: string,
  sms_code: string
) => {
  const formData = {
    Phone,
    password,
    sms_code,
  };

  console.log(formData);
  try {
    const response = await axios.post(
      "https://cc3e497d.qdhgtch.com:2345/api/v1/user/register/phone",
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getOtp = async (
  captchaCode: string,
  email: string
): Promise<void> => {
  try {
    // Step 1: Create formData with required fields
    const formData = {
      send_type: "email",
      to: email,
      captcha: captchaCode,
      timestamp: new Date().getTime(), // Add timestamp for extra security
    };

    // Step 2: Encrypt the data
    const encryptedData = encryptWithRsa(JSON.stringify(formData), PUBLIC_KEY);

    // Step 3: Generate signature for the encrypted data
    const signature = generateSignature(encryptedData);

    console.log(encryptedData)

    // Step 4: Make the GET request with encrypted data and signature as query parameters
    const otpResponse = await axios.get(
      `${API_URL}v1/user/get_code`, 
      {
        params: {
          pack: encryptedData,
          signature: signature,
        }
      }
    );

    console.log("OTP Request successful:", otpResponse.data);
  } catch (error) {
    console.error("Error requesting OTP:", error);
  }
};
