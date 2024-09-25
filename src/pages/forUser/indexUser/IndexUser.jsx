import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config/api";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { BsArrowRight, BsFillNodeMinusFill, BsSearch } from "react-icons/bs";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  FloatButton,
  Modal,
  Spin,
  notification,
  Button,
  Empty,
  Typography,
  message,
} from "antd";
import { ShoppingCartOutlined, LoadingOutlined } from "@ant-design/icons";
import { HiOutlineSquare2Stack, HiEye } from "react-icons/hi2";
import CopyToClipboard from "react-copy-to-clipboard";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

const IndexUser = () => {
  // Modal Ant Desain
  const [open, setOpen] = useState(false);
  const [Open2, setOpen2] = useState(false);
  const [Open3, setOpen3] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // navigate
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // session storage manage
  const sessionUserData = sessionStorage.getItem("@userData");
  const userData = JSON.parse(sessionUserData);

  //   usestate
  const [Data, setData] = useState();
  // const [items, setItems] = useState([
  //   { id: 1, value: null, quantity: 1, price: 0, totalPrice: 0 },
  // ]);

  const [Items, setItems] = useState([
    { id: 1, value: null, quantity: 1, price: 0, totalPrice: 0 },
  ]);
  const [quantities, setQuantities] = useState({});
  const [Search, setSearch] = useState();
  const [Selected, setSelected] = useState();
  const [SelectedIndex, setSelectedIndex] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Code, setCode] = useState();

  const getAllProduct = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${API.Ngrok_URL}/product/all-product`,
        {},
        {
          headers: {
            "bypass-tunnel-reminder": "true",
          },
        }
      )
      .then((response) => {
        setData(response?.data?.data);
        // console.log("ini response data all", response?.data?.data);
      })
      .catch((err) => {
        console.error("Check Member Error: ", err);
        return false;
      });
    setIsLoading(false);
  };

  //   get produk api
  const getSearch = async (search) => {
    setIsLoading(true);
    await axios
      .post(
        `${API.Ngrok_URL}/product/search-product?name=${search}`,
        {},
        {
          headers: {
            "bypass-tunnel-reminder": "true",
          },
        }
      )
      .then((response) => {
        console.log("ini reponse dari api seacrh", response?.data);
        setData(response?.data?.data);
      })
      .catch((err) => {
        console.error("Terjadi Kesalahan: ", err);
      });
    setIsLoading(false);
  };

  //   handle live seacrh
  const handleInputChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    if (search !== "") {
      getSearch(search);
    } else {
    }
  };

  let body = {
    userId: userData?.id,
    data: Items,
  };

  const addRedeemCode = async () => {
    setLoading(true);
    await axios
      .post(`${API.Ngrok_URL}/product/make-redeem-code`, body, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      })
      .then((response) => {
        console.log("ini response data all", response?.data?.data);
        if (response?.data?.status == true) {
          setOpen2(false);
          setOpen3(true);
          setCode(response?.data?.data);
        }
      })
      .catch((err) => {
        console.error("Check Member Error: ", err);
        return false;
      });
    setLoading(false);
  };

  const handleQuantityChange = (event, index) => {
    const updatedItems = Items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: parseInt(event.target.value, 10),
          totalPrice: item?.price * parseInt(event.target.value, 10),
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  console.log("ini items", Items);

  const removeNullItems = () => {
    setItems((prevItems) => prevItems.filter((item) => item.value !== null));
    console.log("item null terhapus");
  };

  const handleSelectChange = (selectedOption, index) => {
    console.log("Selected Option:", selectedOption);
    console.log("Selected Index:", index);
    const updatedItems = Items.map((item, i) => {
      if (i === index) {
        const price = selectedOption.price;
        const quantity = item.quantity;
        return {
          ...item,
          value: selectedOption,
          price: selectedOption ? selectedOption.price : 0,
          totalPrice: price * quantity,
        };
      }
      return item; // Kembalikan item yang tidak berubah
    });

    // Cek jika item sudah ada, jika belum, tambahkan
    const isItemExist = updatedItems.find(
      (item) => item.id === selectedOption.id
    );
    if (!isItemExist) {
      setItems((prevItems) => [
        ...prevItems,
        {
          id: selectedOption.id,
          value: selectedOption,
          quantity: 1,
          price: selectedOption.price,
          totalPrice: selectedOption.price,
        },
      ]);
    } else {
      // Jika item sudah ada, cukup perbarui item yang ada
      setItems(updatedItems);
    }
    removeNullItems();
  };

  // Fungsi untuk menghapus item berdasarkan index
  const handleRemoveItem = (index) => {
    const updatedItems = Items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    const total = Items.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalAmount(total);
  };

  const validations = () => {
    let isValid = true;

    if (Items.length == 0 || Items == undefined) {
      notification.open({
        message: "Gagal melanjutkan",
        description: `tidak ada barang yang dipilih!!!`,
        duration: 7,
        type: "error",
        showProgress: true,
      });
      isValid = false;
    } else {
      Items.forEach((item, index) => {
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
      // navigate(`/precheckout`, {
      //   state: {
      //     data: Items,
      //     totalPrice: calculateTotal(),
      //   },
      // });
      addRedeemCode();
      // message.success("yeay berhasil");
    }

    return isValid;
  };

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      validations();
    }, 1000);
  };

  // USEEFFECT
  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    calculateTotalAmount();
  }, [Items]);

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
      <div className="min-h-screen bg-gray-100 p-3 lg:p-4 pt-12 lg:px-5">
        {/* search */}
        <div
          // onClick={() => navigate("/searchproduk")}
          className="bg-white py-2 lg:py-4 px-3 cursor-text hover:opacity-80 border rounded-xl w-11/12 lg:w-8/12 m-auto mb-5 lg:mb-10 flex flex-row justify-between items-center"
        >
          {/* <p className="text-sm text-gray-500">Cari Ex. Voucher, Indomaret....</p> */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Cari Ex. Nabati, Gelas...."
            className="text-sm text-gray-500 focus:outline-none focus:border-none"
          />
          <p className="">
            {" "}
            <BsSearch size={25} />
          </p>
        </div>

        <div className="lg:hidden">
          <div className="flex flex-wrap justify-start gap-4 w-full">
            {Data?.map((produk, index) => (
              <div
                onClick={() => {
                  if (Open2 == true) return; // Jika Open2 true, keluar dari fungsi dan tidak menjalankan apapun.
                  showModal();
                  console.log("onclick aktip");
                  setSelected(produk);
                  setSelectedIndex(index);
                }}
                className="max-w-sm w-40 flex-shrink-0 rounded-lg border bg-white hover:opacity-75 cursor-pointer shadow-lg pb-1 relative group overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-95"
                key={index}
              >
                <img
                  className="h-28 w-44 object-cover m-auto rounded-lg"
                  src={produk?.image}
                />
                <div className="px-2 py-1 border-t">
                  <div className="flex justify-between">
                    {produk?.category === "makanan" ? (
                      <>
                        <div className="bg-teal-300 w-8/12 rounded-tr-xl my-1">
                          <p className="text-white text-xs text-center">
                            Makanan
                          </p>
                        </div>
                        <div
                          className={`${
                            produk?.unit === "pcs"
                              ? "bg-red-300"
                              : produk?.unit === "dos"
                              ? "bg-blue-300"
                              : produk?.unit === "pak"
                              ? "bg-green-300"
                              : "bg-red-300"
                          } w-3/12 rounded-tl-xl my-1`}
                        >
                          <p className="text-white text-xs text-center">
                            {produk?.unit}
                          </p>
                        </div>
                      </>
                    ) : produk?.category === "minuman" ? (
                      <>
                        <div className="bg-yellow-300 w-8/12 rounded-tr-xl my-1">
                          <p className="text-white text-xs text-center">
                            Minuman
                          </p>
                        </div>
                        <div
                          className={`${
                            produk?.unit === "pcs"
                              ? "bg-red-300"
                              : produk?.unit === "dos"
                              ? "bg-blue-300"
                              : produk?.unit === "pak"
                              ? "bg-green-300"
                              : "bg-red-300"
                          } w-3/12 rounded-tl-xl my-1`}
                        >
                          <p className="text-white text-xs text-center">
                            {produk?.unit}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-pink-400 w-8/12 rounded-tr-xl my-1">
                          <p className="text-white text-xs text-center">
                            Pembersih
                          </p>
                        </div>
                        <div
                          className={`${
                            produk?.unit === "pcs"
                              ? "bg-red-300"
                              : produk?.unit === "dos"
                              ? "bg-blue-300"
                              : produk?.unit === "pak"
                              ? "bg-green-300"
                              : "bg-red-300"
                          } w-3/12 rounded-tl-xl my-1`}
                        >
                          <p className="text-white text-xs text-center">
                            {produk?.unit}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {produk?.name}
                  </p>

                  <div className="font-bold flex items-end text-base mt-1 lg:mt-2 lg:mb-2">
                    <p className="">
                      Rp. {produk?.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FloatButton
          type="primary"
          badge={{
            count: `${Items[0]?.value == null ? 0 : Items?.length}`,
            color: "red",
            showZero: true,
          }}
          onClick={() => setOpen2(true)}
          icon={<ShoppingCartOutlined />}
          style={{
            insetInlineEnd: 24,
            width: 56,
            height: 56,
          }}
        />
      </div>

      <Modal
        open={open}
        title={`Pilih`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={400}
      >
        <div className="flex my-7">
          <div className="w-1/2">
            <img
              src={Selected?.image}
              className="h-28 w-28 object-cover p-1 border rounded-lg"
              alt=""
            />
          </div>
          <div className="w-1/2">
            <p className="font-semibold mb-1">{Selected?.name}</p>
            <p className="font-semibold mb-1">
              {Selected?.stock > 0 ? (
                <span className="text-blue-600">Stok {Selected?.stock}</span>
              ) : (
                <span className="text-red-600">Stok Habis</span>
              )}
            </p>
            <div className="flex justify-between">
              {Selected?.category === "makanan" ? (
                <>
                  <div className="bg-teal-300 w-8/12 rounded-tr-xl my-1">
                    <p className="text-white text-xs text-center">Makanan</p>
                  </div>
                  <div
                    className={`${
                      Selected?.unit === "pcs"
                        ? "bg-red-300"
                        : Selected?.unit === "dos"
                        ? "bg-blue-300"
                        : Selected?.unit === "pak"
                        ? "bg-green-300"
                        : "bg-red-300"
                    } w-3/12 rounded-tl-xl my-1`}
                  >
                    <p className="text-white text-xs text-center">
                      {Selected?.unit}
                    </p>
                  </div>
                </>
              ) : Selected?.category === "minuman" ? (
                <>
                  <div className="bg-yellow-300 w-8/12 rounded-tr-xl my-1">
                    <p className="text-white text-xs text-center">Minuman</p>
                  </div>
                  <div
                    className={`${
                      Selected?.unit === "pcs"
                        ? "bg-red-300"
                        : Selected?.unit === "dos"
                        ? "bg-blue-300"
                        : Selected?.unit === "pak"
                        ? "bg-green-300"
                        : "bg-red-300"
                    } w-3/12 rounded-tl-xl my-1`}
                  >
                    <p className="text-white text-xs text-center">
                      {Selected?.unit}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-pink-400 w-8/12 rounded-tr-xl my-1">
                    <p className="text-white text-xs text-center">Pembersih</p>
                  </div>
                  <div
                    className={`${
                      Selected?.unit === "pcs"
                        ? "bg-red-300"
                        : Selected?.unit === "dos"
                        ? "bg-blue-300"
                        : Selected?.unit === "pak"
                        ? "bg-green-300"
                        : "bg-red-300"
                    } w-3/12 rounded-tl-xl my-1`}
                  >
                    <p className="text-white text-xs text-center">
                      {Selected?.unit}
                    </p>
                  </div>
                </>
              )}
            </div>
            <p className="font-bold mb-1 mt-1 text-base">
              Rp. {Selected?.price.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        <div
          className="mt-10 items-center"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="flex flex-row justify-center">
            <div
              onClick={() => handleSelectChange(Selected, SelectedIndex)}
              className="bg-blue-600 w-1/2 text-white font-semibold rounded-lg py-2 text-center cursor-pointer hover:opacity-75"
            >
              <div className="flex justify-center items-center">
                <FaCartPlus size={15} />
                <p className="ml-2">Tambah</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={Open2}
        title={`Produk yang dipilih :`}
        // onOk={() => setOpen2(false)}
        onCancel={() => setOpen2(false)}
        footer={[]}
        width={400}
      >
        <div className="mt-7 text-xs">
          {Items[0]?.value == null ? (
            <>
              <div className="my-6">
                <Empty
                  description={<p>Silahkan Pilih barang terlebih dahulu</p>}
                />
              </div>
            </>
          ) : (
            <>
              <table class="table-auto w-full">
                <thead className="">
                  <tr className="">
                    <th className="pb-3 underline underline-offset-4">No</th>
                    <th className="pb-3 underline underline-offset-4">
                      Nama Produk
                    </th>
                    <th className="pb-3 underline underline-offset-4">Qty</th>
                    <th className="pb-3 underline underline-offset-4">
                      Total Harga
                    </th>
                    <th className="pb-3 underline underline-offset-4">Hps</th>
                  </tr>
                </thead>
                <tbody>
                  {Items.map((item, index) => (
                    <>
                      {" "}
                      <tr className="text-center border-b">
                        <td className="border-r py-2">
                          <div className="mr-1 text-xs">{index + 1}.</div>
                        </td>
                        <td className="border-r py-2">
                          <p className="">
                            {item?.value?.name.slice(0, 20)}.....
                          </p>
                        </td>
                        <td className="border-r py-2">
                          {" "}
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(e, index)}
                            className="lg:w-14 w-6 p-1 text-center text-xs text-gray-500 focus:outline-none "
                            placeholder="Jumlah"
                          />
                        </td>
                        <td className="border-r py-2">
                          {" "}
                          <p className="">
                            Rp. {item?.totalPrice.toLocaleString("id-ID")}
                          </p>
                        </td>
                        <td className="border-r py-2">
                          {" "}
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="bg-red-500 rounded-full text-white p-0.5 text-sm hover:bg-red-600"
                          >
                            <HiOutlineX />
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>

              <div className="text-right text-sm font-semibold mt-10">
                <p>Total</p>
                <p className="">Rp. {totalAmount.toLocaleString("id-ID")}</p>
              </div>
            </>
          )}
        </div>
        <div className="items-center mt-5">
          <div className="flex flex-row justify-around">
            <button
              disabled={Items[0]?.value == null}
              onClick={() => generate()}
              className="bg-blue-600 w-3/4 disabled:bg-gray-400 text-white font-semibold rounded-lg py-2 px-6 text-center cursor-pointer hover:opacity-75"
            >
              Generate Kode
              {Loading ? (
                <>
                  <Spin indicator={antIcon} className="ml-5 mb-1" />
                </>
              ) : null}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={Open3}
        title={`Kode Keranjang Kamu :`}
        // onOk={() => setOpen2(false)}
        onCancel={() => setOpen3(false)}
        footer={[]}
        width={400}
      >
        <div className="my-7 text-xs flex justify-center">
          <p className="font-semibold text-xl mr-5">{Code}</p>
          <CopyToClipboard text={Code}>
            <div
              className="flex flex-row items-center font-semibold text-blue-600 cursor-pointer"
              onClick={() => {
                message.info("Text berhasil di Copy");
              }}
            >
              <p className="text-sm">Salin</p>
              <i className="ml-1">
                <HiOutlineSquare2Stack />
              </i>
            </div>
          </CopyToClipboard>
        </div>
        <p className="mt-10 text-xs px-4">
          note : *kmu juga bisa menggunakan kode ini berkali-kali, lihat kode
          keranjang yang tersimpan, dihalaman <span className="text-blue-600">Keranjang</span>
        </p>
        <div className="items-center mt-8">
          <div className="flex flex-row justify-around">
            <button
              onClick={() => setOpen3(false)}
              className="bg-blue-600 w-3/4 disabled:bg-gray-400 text-white font-semibold rounded-lg py-2 px-6 text-center cursor-pointer hover:opacity-75"
            >
              Oke
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IndexUser;
