import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BukanAdmin from "../../../components/BukanAdmin";
import { Modal, Spin } from "antd";
import { ShoppingCartOutlined, LoadingOutlined } from "@ant-design/icons";
import { API } from "../../../config/api";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

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
  const [Loading, setLoading] = useState(false);
  const [Open2, setOpen2] = useState(false);
  const [Code, setCode] = useState();

  // pindah halaman + loading
  const directTo = (direct) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(direct);
    }, 1000);
  };

  // kirim kode
  const getDataByCode = async () => {
    setLoading(true);
    await axios
      .post(
        `${API.Ngrok_URL}/product/redeem-code?code=${Code}`,
        {},
        {
          headers: {
            "bypass-tunnel-reminder": "true",
          },
        }
      )
      .then((response) => {
        // setData(response?.data?.data);
        navigate(`/pilih-barang`, {
          state: {
            data: response?.data?.data,
            // totalPrice: calculateTotal(),
          },
        });
        message.success("Reedem Code Berhasil");
        console.log("ini response data all by code", response?.data?.data);
      })
      .catch((err) => {
        console.error("Check Error: ", err);
        return false;
      });
    setLoading(false);
  };

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
                  onClick={() => directTo("/pilih-barang")}
                  className="lg:w-40 w-full h-36 m-auto mt-8 rounded-lg shadow-lg bg-sky-400 flex hover:opacity-75 cursor-pointer items-center justify-center"
                >
                  <p className="text-3xl font-Silkscreen text-white">Cashier</p>
                </div>
                <div onClick={() => setOpen2(true)} className="lg:w-40 w-full h-36 m-auto mt-8 rounded-lg shadow-lg bg-emerald-400 flex hover:opacity-75 cursor-pointer items-center justify-center">
                  <p className="text-xl font-Silkscreen text-white">
                    Redeem Kode Pembelian
                  </p>
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

      <Modal
        open={Open2}
        title={`Produk yang dipilih :`}
        // onOk={() => setOpen2(false)}
        onCancel={() => setOpen2(false)}
        footer={[]}
        width={400}
      >
        <div className="mt-7 py-5 text-xs flex justify-center">
        <input
            type="text"
            value={Code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Masukan Kode Reedem"
            className="text-base text-gray-800 text-center placeholder:text-gray-500 focus:outline-none focus:border-none"
          />
        </div>
        <div className="items-center mt-5">
          <div className="flex flex-row justify-center">
            <button
              onClick={() => {
                getDataByCode()
              }}
              className="bg-blue-600 w-3/4 disabled:bg-gray-400 text-white font-semibold rounded-lg py-2 px-6 text-center cursor-pointer hover:opacity-75"
            >
              Submit
              {Loading ? (
                <>
                  <Spin indicator={antIcon} className="ml-5 mb-1" />
                </>
              ) : null}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IndexCashier;
