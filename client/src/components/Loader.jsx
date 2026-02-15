import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4f46e5"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
