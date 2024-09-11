import React, { useState } from "react";
import Select from "react-select";
import { HiOutlineX } from "react-icons/hi";
import Sidebar from "../../components/SideBar";
import { matchSorter } from 'match-sorter';

const SelectProducts = () => {
  const [items, setItems] = useState([
    { id: 1, value: null, quantity: 1, price: 0 },
  ]);

  const options = [
    { value: "nabati ukuran 720g rasa coklat", label: "nabati ukuran 720g rasa coklat", price: 2000 },
    { value: "nabati ukuran 720g rasa vanilla", label: "nabati ukuran 720g rasa vanilla", price: 2500 },
    { value: "nabati ukuran 720g rasa strawberry", label: "nabati ukuran 720g rasa strawberry", price: 1500 },
  ];

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
      if (i === index && item.quantity === '') {
        return { ...item, quantity: 0 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const customFilter = (candidate, input) => {
    // Gunakan match-sorter untuk memfilter data dengan beberapa kata
    return matchSorter([candidate], input, { keys: ['label'] }).length > 0;
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <>
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <div className="min-h-screen text-sm lg:text-base bg-gray-100 p-4 pt-12 lg:px-5 lg:flex">
        <div className="lg:w-5/12 max-w-lg mx-auto h-2/4 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Aplikasi Kasir
          </h2>

          {/* Form untuk barang dan jumlah */}
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center mb-3 space-x-2">
              <div className="flex-1">
                <Select
                  options={options}
                  value={item.value}
                  onChange={(option) => handleSelectChange(option, index)}
                  placeholder={`Pilih Barang ${index + 1}`}
                  className="text-sm"
                  filterOption={customFilter}
                />
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, index)}
                onBlur={() => handleBlur(index)}
                className="w-14 p-2 border rounded-md text-center"
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
                className="bg-red-500 rounded-full text-white p-1 text-xl hover:bg-red-600"
              >
                <HiOutlineX />
              </button>
            </div>
          ))}

          {/* Tombol tambah barang */}
          <button
            onClick={addItem}
            className="w-full bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600 transition duration-200"
          >
            Tambah Barang
          </button>
        </div>

        <div className="lg:w-5/12 max-w-lg h-1/2 mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mt-4 lg:mt-0">
            <h2 className="text-2xl font-semibold text-center mb-4">Total</h2>
            <div className="flex justify-between mb-2 lg:px-5">
              <div className="w-3/5 font-semibold text-left">Nama Produk</div>
              <div className="w-1/6 font-semibold text-center">Kuantitas</div>
              <div className="w-1/4 font-semibold text-right">Harga</div>
              <span></span>
            </div>
            <div className="flex flex-col">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2 lg:px-5">
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
            <div className="bg-green-500 lg:w-1/4 w-1/2 py-2 mt-4 rounded-lg cursor-pointer text-white text-center font-semibold hover:opacity-75 transition duration-200">
              Bayar
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectProducts;
