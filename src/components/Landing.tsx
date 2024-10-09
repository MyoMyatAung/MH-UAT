import React, { useEffect, useState } from "react";
import land from "../assets/login/land.png";
import ad1 from "../assets/login/ad1.png";
import hunter from "../assets/login/hunter.png";
import { useDispatch } from "react-redux";
import { setPanding } from "../features/login/ModelSlice";
interface LandingProps {}

const Landing: React.FC<LandingProps> = ({}) => {
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(6);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (skip > 0) {
                setSkip((prev) => prev - 1);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [skip]);

    return (
        <div className="relative min-h-[100svh]">
            {/* Adjusted Image Section */}
            <img
                // src={ad1}
                src={skip <= 3 ? ad1 : land}
                className="object-cover w-screen h-[75vh] md:h-[80vh]"
                alt="land"
            />
            
            {/* Logo Section */}
            <div className="absolute bottom-0 bg-[#190A01] py-[5vw] px-[5vw] w-screen h-[25vh] md:h-[20vh]">
                <img src={hunter} alt="hunter logo" />
            </div>
            
            {/* Countdown */}
            <div
                onClick={() => dispatch(setPanding(false))}
                style={{
                    borderRadius: "52px",
                    background: "rgba(0, 0, 0, 0.98)",
                    backdropFilter: "blur(2px)",
                }}
                className="absolute top-[2vh] right-[2vh]"
            >
                <h1 className="text-white text-xs md:text-sm font-[400] py-[4px] px-[12px]">
                    跳过广告 <span>{skip}</span>
                </h1>
            </div>
        </div>
    );
};

export default Landing;