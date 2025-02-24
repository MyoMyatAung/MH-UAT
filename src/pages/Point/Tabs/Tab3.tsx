import React from 'react';

interface Tab3Props {
  inviteList : any
}

const Tab3: React.FC<Tab3Props> = ({inviteList}) => {
  console.log(inviteList)
  return (
    <div className=" text-white">this is invite</div>
  );
};

export default Tab3;