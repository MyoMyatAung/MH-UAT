import { useDispatch } from "react-redux";
import { showToast } from "../../../pages/profile/error/ErrorSlice";
import copy from "copy-to-clipboard";
import axios from "axios";
import Cookies from "js-cookie";
import {
  convertToSecureUrl,
  decryptWithAes,
} from "../../../services/newEncryption";

const sendEventToNative = ({ value }: { value: any }) => {
  if (
    (window as any).webkit &&
    (window as any).webkit.messageHandlers &&
    (window as any).webkit.messageHandlers.jsBridge
  ) {
    (window as any).webkit.messageHandlers.jsBridge.postMessage({
      eventName: "socialMediaShare",
      value: value,
    });
  }
};

const ShareButton = () => {
  const dispatch = useDispatch();
  const copyToClipboard = async (text: string) => {
    try {
      copy(text);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    } finally {
      dispatch(
        showToast({
          message: "已复制分享链接",
          type: "success",
        })
      );
    }
  };
  const handleShare = async () => {
    const cookieKey = "shareContent";

    try {
      // Check if the cookie exists
      const cachedContent = Cookies.get(cookieKey);
      if (cachedContent) {
        copyToClipboard(JSON.parse(cachedContent).data.content);
        sendEventToNative(JSON.parse(cachedContent).data.content);
        return;
      }

      // Call the API if no cached content is found
      const response = await axios.get(
        convertToSecureUrl(`${process.env.REACT_APP_API_URL}/user/get_share`),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      const result: any = await decryptWithAes(data);

      if (data && result) {
        // Save to cookie with a 2-hour expiry
        Cookies.set(cookieKey, JSON.stringify(result), { expires: 1 / 12 }); // 1/12 day = 2 hours
        sendEventToNative(result?.data.content);
        copyToClipboard(result?.data.content);
      }
    } catch (error) {
      console.error("Error fetching share content:", error);
    } finally {
    }
  };
  return (
    <button className="flex items-center gap-x-2" onClick={handleShare}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
      >
        <path
          d="M17.2918 2.71541H13.0443C12.8491 2.71541 12.6819 2.78412 12.5441 2.92291C12.4768 2.9878 12.4236 3.06588 12.3878 3.15226C12.352 3.23863 12.3344 3.33146 12.3361 3.42494C12.3361 3.61961 12.4048 3.78589 12.5441 3.92422C12.6815 4.06301 12.8491 4.13218 13.0443 4.13218H15.5824L9.70869 10.0045C9.64197 10.0691 9.5894 10.1469 9.55432 10.233C9.51923 10.319 9.50239 10.4114 9.50485 10.5042C9.50485 10.7058 9.57219 10.8743 9.7064 11.0081C9.84061 11.1446 10.0096 11.2119 10.2126 11.2119C10.4118 11.2119 10.5795 11.1428 10.716 11.0058L16.5837 5.1335V7.67114C16.5837 7.86765 16.6524 8.03438 16.7912 8.17271C16.9295 8.31105 17.0963 8.38021 17.2918 8.38021C17.487 8.38021 17.6542 8.31151 17.792 8.17271C17.9308 8.03438 18 7.86765 18 7.67068V3.42448C18 3.23026 17.9313 3.06124 17.792 2.92291C17.7273 2.85596 17.6495 2.803 17.5635 2.76731C17.4774 2.73162 17.385 2.71396 17.2918 2.71541ZM9.4334 2.75434C8.48567 2.84687 7.56406 3.11575 6.71482 3.54587C5.00585 4.40599 3.67242 5.86397 2.9679 7.64274C2.60837 8.5532 2.4245 9.52352 2.42602 10.5024C2.42602 11.5601 2.63077 12.5701 3.03936 13.5329C3.41955 14.4435 3.97471 15.2699 4.7044 16.0096C5.44508 16.7407 6.27142 17.2945 7.18204 17.6751C8.14396 18.0837 9.15398 18.2889 10.2126 18.2889C11.1912 18.2904 12.1613 18.1062 13.0713 17.7461C13.9493 17.399 14.7571 16.8956 15.4555 16.2602C16.1603 15.618 16.7414 14.8519 17.17 14.0001C17.599 13.151 17.8671 12.2297 17.9606 11.2829C17.9789 11.0708 17.9194 10.889 17.7806 10.7333C17.7148 10.6585 17.6334 10.599 17.5422 10.5591C17.4509 10.5192 17.352 10.4999 17.2525 10.5024C17.072 10.5024 16.9144 10.5629 16.7797 10.6838C16.6441 10.8052 16.5681 10.9586 16.5498 11.1382C16.4752 11.9143 16.257 12.6698 15.9062 13.3662C15.556 14.0644 15.0783 14.691 14.4977 15.2135C13.9307 15.7376 13.2703 16.1506 12.5509 16.431C11.806 16.7239 11.0125 16.8737 10.2121 16.8726C9.34545 16.8726 8.51957 16.7059 7.734 16.3752C6.9892 16.0614 6.31264 15.6047 5.70434 15.0079C5.10704 14.4 4.65172 13.7253 4.33887 12.9787C4.00686 12.1955 3.83731 11.353 3.8405 10.5024C3.8405 9.6953 3.988 8.91477 4.28253 8.16172C4.56226 7.44208 4.97516 6.78163 5.49959 6.21497C6.55364 5.04562 8.00777 4.3139 9.57494 4.16425C9.75587 4.14501 9.90703 4.06943 10.0284 3.93293C10.1503 3.79917 10.2116 3.64114 10.2116 3.46158C10.2116 3.32096 10.1851 3.20187 10.131 3.10247C10.0832 3.00926 10.0094 2.93193 9.91848 2.87985C9.83904 2.83608 9.7544 2.80253 9.66655 2.77999C9.58929 2.76234 9.51035 2.75313 9.43111 2.75251L9.43294 2.75434H9.4334Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default ShareButton;
