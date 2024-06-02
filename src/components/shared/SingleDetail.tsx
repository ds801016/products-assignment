import React from "react";

const SingleDetail = ({ label, value }: { label: string; value?: string }) => {
  return (
    <div className="flex flex-col text-lg">
      <p className="text-[13px] font-semibold">{label}</p>
      <p className="text-[13px]">{value ?? "--"}</p>
    </div>
  );
};

export default SingleDetail;
