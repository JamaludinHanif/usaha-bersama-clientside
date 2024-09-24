/* eslint-disable no-unused-vars */

// libraries react
import React, { useState, useEffect } from "react";

// libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Spin, message } from "antd";

import { API } from "./../config/api";
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

const Logout = ({ UsersId }) => {
  const navigate = useNavigate();

  // Modal ANTD
  const [modal2Open, setModal2Open] = useState(false);
  const [Loading, setLoading] = useState(false);

  // integrasi API logout
  const clickLogout = async () => {
    setLoading(true)
    await axios
      .post(`${API.Ngrok_URL}/auth/logout?userId=${UsersId}`, {}, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      })
      .then((response) => {
        if (response?.data?.status == true) {
          sessionStorage.clear();
          setModal2Open(false);
          message.success('Logout Berhasil')
          navigate("/");
        } else {
          console.log(response);
        }
      });
      setLoading(false)
  };

  return (
    <>
      <h1 onClick={() => setModal2Open(true)} className="cursor-pointer">
        Logout
      </h1>
      <Modal
        title="Apakah kamu yakin ingin keluar"
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
            onClick={() => clickLogout()}
          >
            Iya
            {Loading ? (
                <>
                  <Spin indicator={antIcon} className="ml-5 mb-1" />
                </>
              ) : null}
          </Button>
        ]}
      >
        <div>
          <p>
            Klik tombol "Iya" untuk keluar, dan klik tombol "Batalkan" untuk
            batalkan
          </p>
          <div style={{ height: 15 }} />
        </div>
      </Modal>
    </>
  );
};

export default Logout;
