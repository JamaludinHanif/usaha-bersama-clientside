import React from "react";
import img from "../assets/notAdmin.png";

const BukanAdmin = () => {
  return (
    <>
      <div className="h-screen lg:w-8/12 p-3 lg:p-4 pt-12 lg:px-5 mt-6 m-auto">
        <img src={img} alt="" className="w-72 m-auto" />
        <p className="font-bold text-lg lg:text-xl text-primary mt-5 text-center">
          Kamu Tidak Mempunyai Akses
        </p>
        <p className="text-center lg:text-base text-xs mt-2">
          Silahkan Nikmati Fitur Yang Disediakan Untuk <span className="text-blue-600 font-semibold">User</span>
        </p>
        <div
          onClick={() => navigate("/package")}
          className="bg-primary lg:w-1/3 w-1/2 cursor-pointer py-2 mt-4 m-auto rounded-md hover:opacity-80"
        >
          <p className="text-center text-white font-semibold">Gabung</p>
        </div>
      </div>
    </>
  );
};

export default BukanAdmin;
