import React, { useState, useEffect } from "react";
import Select from "react-select";
import { HiOutlineX } from "react-icons/hi";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Spin,
  message,
  notification,
} from "antd";
import { matchSorter } from "match-sorter";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../../../config/api";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

const SelectProducts = () => {
  // navigate
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // session storage manage
  const sessionUserData = sessionStorage.getItem("@userData");
  const userData = JSON.parse(sessionUserData);

  // usesstate
  const [items, setItems] = useState([
    { id: 1, value: null, quantity: 1, price: 0, totalPrice: 0 },
  ]);
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [TotalAmount, setTotalAmount] = useState(0);

  const options = [
    {
      value: "nabati ukuran 720g rasa coklat",
      label: "nabati ukuran 720g rasa coklat",
      price: 2000,
      stok: 5,
    },
    {
      value: "nabati ukuran 720g rasa vanilla",
      label: "nabati ukuran 720g rasa vanilla",
      price: 2500,
      stok: 5,
    },
    {
      value: "nabati ukuran 720g rasa strawberry",
      label: "nabati ukuran 720g rasa strawberry",
      price: 1500,
      stok: 5,
    },
  ];

  const getAllProduct = async () => {
    setIsLoading(true);
    await axios
      .post(`${API.Ngrok_URL}/product/all-product`, {}, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      })
      .then((response) => {
        setData(response?.data?.data);
        // console.log("ini response user all", response?.data?.data);
      })
      .catch((err) => {
        console.error("Check Member Error: ", err);
        return false;
      });
    setIsLoading(false);
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, value: null, quantity: 1, price: 0 },
    ]);
  };

  const handleSelectChange = (selectedOption, index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          value: selectedOption,
          price: selectedOption ? selectedOption.price : 0,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleQuantityChange = (event, index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: parseInt(event.target.value, 10) };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleBlur = (index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index && item.quantity === "") {
        return { ...item, quantity: 0 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const customFilter = (candidate, input) => {
    // Gunakan match-sorter untuk memfilter data dengan beberapa kata
    return matchSorter([candidate], input, { keys: ["label"] }).length > 0;
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    // setTotalAmount(items.reduce((acc, item) => acc + item.price * item.quantity, 0))
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const validations = () => {
    let isValid = true;

    if (items.length == 0 || items == undefined) {
      notification.open({
        message: "Gagal melanjutkan",
        description: `tidak ada barang yang dipilih!!!`,
        duration: 7,
        type: "error",
        showProgress: true,
      });
      isValid = false;
    } else {
      items.forEach((item, index) => {
        // data stok dari item yang dipilih
        const selectedItem = Data.find(
          (stok) => stok.value === item?.value?.value
        );
        if (!item.value) {
          notification.open({
            message: "Gagal melanjutkan",
            description: `Barang/product pada nomor ${
              index + 1
            } tidak boleh kosong!!`,
            duration: 7,
            type: "error",
            showProgress: true,
          });
          isValid = false;
        } else if (!item.quantity || item.quantity <= 0) {
          notification.open({
            message: "Gagal melanjutkan",
            description: `Kuantitas/jumlah barang pada nomor ${
              index + 1
            } tidak boleh kosong!!`,
            duration: 7,
            type: "error",
            showProgress: true,
          });
          isValid = false;
        } else if (!item.quantity || item.quantity > selectedItem?.stock) {
          notification.open({
            message: "Gagal melanjutkan",
            description: `Jumlah barang pada nomor ${
              index + 1
            } yng dipilih melebihi batas stok, stok yng tersedia : ${
              selectedItem?.stock
            } stok!!`,
            duration: 7,
            type: "error",
            showProgress: true,
          });
          isValid = false;
        }
      });
    }

    if (isValid == true) {
      //   preCheckout();
      navigate(`/precheckout`, {
        state: {
          data: items,
          totalPrice: calculateTotal(),
        },
      });
      message.success("yeay berhasil");
    }

    return isValid;
  };

  let body = {
    data: items,
    totalPrice: calculateTotal(),
  };

  const bayar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      validations();
    }, 2000);
  };

  useEffect(() => {
    getAllProduct();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-3 lg:p-4 pt-12 lg:px-5">
        <div className="lg:flex text-xs lg:text-base">
          <div className="lg:w-5/12 max-w-lg mx-auto h-2/4 bg-white shadow-md rounded-lg p-3 lg:p-6">
            <h2 className="lg:text-2xl text-xl font-semibold text-center mb-4">
              Aplikasi Kasir
            </h2>

            {/* Form untuk barang dan jumlah */}
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center mb-3 space-x-2">
                <div className="flex w-full">
                  <div className="p-1 mr-1 text-xs">{index + 1}.</div>
                  <Select
                    options={Data}
                    value={item.value}
                    onChange={(option) => handleSelectChange(option, index)}
                    placeholder={`Pilih Barang ${index + 1}`}
                    className="text-sm w-full"
                    filterOption={customFilter}
                  />
                </div>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, index)}
                  onBlur={() => handleBlur(index)}
                  className="lg:w-14 w-8 p-2 border rounded-md text-center"
                  placeholder="Jumlah"
                />
                {/* <div className="flex flex-col md:flex-row items-center md:space-x-2">
              <span className="text-gray-700 text-sm">Harga Total:</span>
              <span className="text-sm font-semibold">
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </span>
            </div> */}
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="bg-red-500 rounded-full text-white p-1 text-base hover:bg-red-600"
                >
                  <HiOutlineX />
                </button>
              </div>
            ))}

            {/* Tombol tambah barang */}
            <button
              onClick={addItem}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Tambah Barang
            </button>
          </div>

          <div className="lg:w-5/12 max-w-lg h-1/2 mx-auto">
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
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between mb-2 lg:px-5"
                  >
                    <div className="w-3/5 text-left">
                      {item?.value?.label || `Barang ke ${index + 1}`}
                    </div>
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
                <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <div
                onClick={() => bayar()}
                className="bg-green-500 lg:w-1/4 w-1/2 py-2 mt-4 rounded-lg cursor-pointer text-white text-center font-semibold hover:opacity-75 transition duration-200"
              >
                Bayar{" "}
                {Loading ? (
                  <>
                    <Spin indicator={antIcon} className="ml-5 mb-1" />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectProducts;
