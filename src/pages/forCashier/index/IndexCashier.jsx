import React from "react";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BukanAdmin from "../../../components/BukanAdmin";

const IndexCashier = () => {
  // navigate
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // session storage manage
  const sessionUserData = sessionStorage.getItem("@userData");
  const userData = JSON.parse(sessionUserData);
  const role = userData?.role;

  console.log(role);

  //   usesate
  const [IsLoading, setIsLoading] = useState(false);

  // pindah halaman + loading
  const directTo = (direct) => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        navigate(direct)
      }, 1000);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {IsLoading == true ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        </>
      ) : (
        <></>
      )}
      {role == "admin" || role == "kasir" ? (
        <>
          <div className="min-h-screen bg-gray-100 p-3 lg:p-4 pt-12 lg:px-5">
            <div className="">
              <div className="lg:flex lg:flex-row lg:justify-between sm:flex-col lg:mt-24 mt-14">
              <div
                onClick={() => directTo('/pilih-barang')}
                  className="lg:w-40 w-full h-36 m-auto mt-8 rounded-lg shadow-lg bg-sky-400 flex hover:opacity-75 cursor-pointer items-center justify-center"
                >
                  <p className="text-3xl font-Silkscreen text-white">Cashier</p>
                </div>
                <div
                  className="lg:w-40 w-full h-36 m-auto mt-8 rounded-lg shadow-lg bg-emerald-400 flex hover:opacity-75 cursor-pointer items-center justify-center"
                >
                  <p className="text-xl font-Silkscreen text-white">Redeem Kode Pembelian</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <BukanAdmin />
        </>
      )}
    </>
  );
};

export default IndexCashier;
