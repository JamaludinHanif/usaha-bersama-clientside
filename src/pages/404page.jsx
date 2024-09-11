import React from "react";
import { Link } from "react-router-dom";
import loginImg from "../../public/logImg.png";

const NotFound = () => {
  return (
    <>
      <div
        className="h-screen w-full lg:py-14 py-14"
        style={{ backgroundColor: "#f8f8f8" }}
      >
        <div className="flex flex-col justify-center items-center">
            <p className="lg:text-9xl text-6xl font-bold text-blue-600">
                404
            </p>
            <p className="text-xl text-gray-600 font-bold">
                Halaman Tidak Di temukan
            </p>
            <Link to={"/"}>
                <p className="text-lg text-blue-400">
                    Kembali ke halaman utama
                </p>
            </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;