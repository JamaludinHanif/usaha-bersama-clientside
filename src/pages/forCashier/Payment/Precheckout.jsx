import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Button, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { API } from "../../../config/api";
import axios from "axios";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

const Precheckout = () => {
  // navigate
  const navigate = useNavigate();
  const location = useLocation();
  const items = location?.state;
  console.log("ini location", location?.state);
  const { pathname } = useLocation();

  // session storage manage
  const sessionUserData = sessionStorage.getItem("@userData");
  const userData = JSON.parse(sessionUserData);

  //   usesate
  const [IsLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [Email, setEmail] = useState(userData?.email);
  const [Name, setName] = useState("Pembeli");

  let body = {
    data: items,
    userId: userData?.id,
    name: Name,
    email: Email,
  };

  const checkout = async () => {
    setLoading(true);
    await axios
      .post(`${API.Ngrok_URL}/product/checkout`, body, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      })
      .then((response) => {
        if (response?.data?.status == true) {
          console.log("ini response preCheckout", response?.data);
          message.success("Pembelian Berhasil");
          setModal2Open(false);
        }
      })
      .catch((err) => {
        console.error("Check Member Error: ", err);
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
      <div className="min-h-screen text-xs lg:text-base bg-gray-100 p-3 lg:p-4 pt-12 lg:px-5">
        {/* <p>precheckout</p> */}

        <div className="">
          <div className="bg-white shadow-md rounded-lg p-6 mt-4 lg:mt-0">
            <h2 className="lg:text-2xl text-xl font-semibold text-center mb-4">
              Total
            </h2>
            <div className="flex justify-between mb-2 lg:px-5">
              <div className="w-3/5 font-semibold text-left">Nama Produk</div>
              <div className="w-1/6 font-semibold text-center">Kuantitas</div>
              <div className="w-1/4 font-semibold text-right">Harga</div>
              <span></span>
            </div>
            <div className="flex flex-col">
              {items?.data.map((item, index) => (
                <div key={index} className="flex justify-between mb-2 lg:px-5">
                  <div className="w-3/5 text-left">{item?.value?.label}</div>
                  <div className="w-1/6 text-center border-x-2">
                    x {item.quantity}
                  </div>
                  <div className="w-1/4 text-right">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                  <span></span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 font-semibold">
              <span>Total Keseluruhan:</span>
              <span>Rp {items?.totalPrice.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm mb-2 px-3">
            Masukan Email untuk penerimaan Invoice/Nota (*opsional) :
          </p>
          <input
            placeholder={`Masukan Email Pembeli, *contoh : ${userData?.email} `}
            type="text"
            autoComplete="off"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm rounded-lg outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 px-2 py-2.5"
          />
        </div>

        <div className="flex justify-between mt-6">
          <div
            onClick={() => navigate("/pilih-barang")}
            className="bg-red-500 lg:w-1/4 w-5/12 py-2 mt-4 rounded-lg cursor-pointer text-white text-center font-semibold hover:opacity-75 transition duration-200"
          >
            Kembali{" "}
          </div>
          <div
            onClick={() => setModal2Open(true)}
            className="bg-green-500 lg:w-1/4 w-5/12 py-2 mt-4 rounded-lg cursor-pointer text-white text-center font-semibold hover:opacity-75 transition duration-200"
          >
            Bayar{" "}
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        title="Apakah kamu yakin ??"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        okText={"Iya"}
        cancelText={"Batalkan"}
        footer={[
          <Button key="back" onClick={() => setModal2Open(false)}>
            Batalkan
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "#1B69DC", color: "white" }}
            onClick={() => checkout()}
          >
            Iya
            {Loading ? (
              <>
                <Spin indicator={antIcon} className="ml-5 mb-1" />
              </>
            ) : null}
          </Button>,
        ]}
      >
        <div>
          <p>
            Semua nya akan diproses, dan tidak dapat dikembalikan/dirubah lagi,{" "}
            <span className="font-semibold">
              pastikan untuk semuanya selesai.
            </span>
          </p>
          <div style={{ height: 15 }} />
        </div>
      </Modal>
    </>
  );
};

export default Precheckout;
