import React from "react";

interface Tab1Props {
  inretralDetails : any
}

const Tab1: React.FC<Tab1Props> = ({inretralDetails}) => {
  // console.log(inretralDetails)
  return <div className=" text-white">this is details</div>;
};

export default Tab1;
