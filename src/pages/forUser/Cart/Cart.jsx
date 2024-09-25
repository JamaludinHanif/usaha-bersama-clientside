import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { message, Modal, Empty } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../../../config/api";
import { HiOutlineX } from "react-icons/hi";
import { HiOutlineSquare2Stack, HiEye } from "react-icons/hi2";
import CopyToClipboard from "react-copy-to-clipboard";
import { ShoppingCartOutlined, LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

const Cart = () => {
  // navigate
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // session storage manage
  const sessionUserData = sessionStorage.getItem("@userData");
  const userData = JSON.parse(sessionUserData);

  //   usestate
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Open2, setOpen2] = useState(false);

  const [Items, setItems] = useState([
    { id: 1, value: null, quantity: 1, price: 0, totalPrice: 0 },
  ]);
  const [quantities, setQuantities] = useState({});
  const [Selected, setSelected] = useState();
  const [SelectedIndex, setSelectedIndex] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // function Copy to clipboard
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Setelah 2 detik, reset copied ke false
  };

  const getMycart = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${API.Ngrok_URL}/product/my-cart?userId=${userData?.id}`,
        {},
        {
          headers: {
            "bypass-tunnel-reminder": "true",
          },
        }
      )
      .then((response) => {
        const itemsByCode = Object.entries(response.data.data).map(
          ([index, items]) => ({
            index,
            items,
          })
        );
        setData(itemsByCode);
        console.log("ini response data myCart", itemsByCode);
      })
      .catch((err) => {
        console.error("Check Member Error: ", err);
        return false;
      });
    setIsLoading(false);
  };

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      validations();
    }, 1000);
  };

  const calculateTotal = () => {
    return Selected?.products.reduce((acc, item) => acc + item.total_amount, 0);
  };
  

  console.log('ini item terpilih', Selected)
  console.log('ini kalkulate', calculateTotal())

  useEffect(() => {
    getMycart();
  }, []);

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
      <div className="min-h-screen bg-gray-100 p-3 lg:p-4 pt-12 lg:px-5">
        <p className="text-lg font-semibold mb-10" onClick={() => getMycart()}>
          Kode Keranjang Kamu :
        </p>
        {Data.map((cart, index) => (
          <>
            <div className="bg-white py-3 px-6 rounded-lg border shadow-sm mt-5">
              <div className="flex flex-row justify-between mt-3">
                <div className="">
                  <p className="lg:text-xl text-lg font-bold">
                    {cart?.items?.code}
                  </p>
                  <div></div>
                </div>
                <div className="">
                  <div
                    className="flex flex-row items-center mb-1 font-semibold text-blue-600 cursor-pointer"
                    onClick={() => {
                      setOpen2(true);
                      setSelected(cart?.items)
                    }}
                  >
                    <p className="text-sm">Detail</p>
                    <i className="ml-1">
                      <HiEye />
                    </i>
                  </div>
                  <CopyToClipboard text={cart?.items?.code}>
                    <div
                      className="flex flex-row items-center font-semibold text-blue-600 cursor-pointer"
                      onClick={() => {
                        handleCopy(), message.info("Text berhasil di Copy");
                      }}
                    >
                      <p className="text-sm">Salin</p>
                      <i className="ml-1">
                        <HiOutlineSquare2Stack />
                      </i>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <Modal
        open={Open2}
        title={`Produk yang dipilih :`}
        // onOk={() => setOpen2(false)}
        onCancel={() => setOpen2(false)}
        footer={[]}
        width={400}
      >
        <div className="mt-7 text-xs">
          {Selected == undefined ? (
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
                  {Selected?.products.map((item, index) => (
                    <>
                      {" "}
                      <tr className="text-center border-b">
                        <td className="border-r py-2">
                          <div className="mr-1 text-xs">{index + 1}.</div>
                        </td>
                        <td className="border-r py-2">
                          <p className="">
                            {item?.name.slice(0, 20)}.....
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
                            Rp. {item?.total_amount.toLocaleString("id-ID")}
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
                <p className="">Rp. {calculateTotal().toLocaleString("id-ID")}</p>
              </div>
            </>
          )}
        </div>
        <div className="items-center mt-5">
          <div className="flex flex-row justify-around">
          <CopyToClipboard text={Selected?.code}>

            <button
            //   disabled={Items[0]?.value == null}
              onClick={() => {handleCopy(), message.info("Text berhasil di Copy");}}
              className="bg-blue-600 w-3/4 disabled:bg-gray-400 text-white font-semibold rounded-lg py-2 px-6 text-center cursor-pointer hover:opacity-75"
            >
              Salin Kode
              {/* {Loading ? (
                <>
                  <Spin indicator={antIcon} className="ml-5 mb-1" />
                </>
              ) : null} */}
            </button>
            </CopyToClipboard>
          </div>
        </div>

      </Modal>
    </>
  );
};

export default Cart;
