import React from "react";
import loginImg from "../../../public/logImg.png";
import instagramLogo from "../../../public/2227.jpg";
import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Spin,
  message,
  notification,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../../config/api";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { AiFillPicture } from "react-icons/ai";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

const Register = () => {
  // antd
  const [api, contextHolder2] = notification.useNotification();
  const [messageApi, contextHolder] = message.useMessage();

  // router
  const navigate = useNavigate();

  //state
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const register = async () => {
    let body = {
      name: Name,
      username: Username,
      email: Email,
      role: "user",
      password: `${Password}`,
    };
    console.log("ini body", body);
    setLoading(true);
    await axios
      .post(`${API.Ngrok_URL}/auth/register`, body, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      })
      .then((response) => {
        if (response?.data?.status == true) {
          navigate(`/`);
          api.open({
            message: "Buat akun berhasil",
            description: "Silahkan Login",
            duration: 4,
            type: "success",
            showProgress: true,
          });
          message.success("Buat akun berhasil")
          message.success("Silahkan Login")
          console.log(response?.data);
        } else if (response?.data?.status == false) {
          const errorMessages = Object.values(response.data.message)
            .map((errArr) => errArr.join(", "))
            .join(" & ");

          api.open({
            message: "Buat akun gagal",
            description: errorMessages,
            duration: 7,
            type: "error",
            showProgress: true,
          });
          console.log("ini false", errorMessages);
        } else {
          console.log(response?.data);
        }
      })
      .catch((err) => {
        message.error("login gagal");
        console.error("Terjadi Kesalahan: ", err);
      });
    setLoading(false);
  };

  return (
    <>
      {contextHolder2}
      <body class="lg:h-screen">
        <div class="flex min-h-full">
          <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  class="h-10 w-auto"
                  src="./src/img/dudul.jpg"
                  alt="Udin Company"
                />
                <h2
                  class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
                >
                  Daftar untuk membuat akun
                </h2>
                <p class="mt-2 text-sm leading-6 text-gray-500">
                  Sudah punya akun ?
                  <span
                    // href="https://wa.me/6285161310017?text=daftarin%20saya%20dong%20minn%20"
                    onClick={() => navigate(`/`)}
                    class="font-semibold text-indigo-600 ml-1 hover:text-indigo-500"
                  >
                    Login sekarang
                  </span>
                </p>
              </div>

              <div class="mt-10">
                <div>
                  <Form autoComplete="off" onSubmitCapture={() => register()}>
                    <div className="mb-1 lg:mb-2">
                      <label htmlFor="Nama" className="font-bold pb-5">
                        Name :
                      </label>
                    </div>
                    <Form.Item
                      name="Nama"
                      id="Nama"
                      rules={[
                        {
                          required: true,
                          message: "Nama Harus Di isi!",
                        },
                      ]}
                    >
                      <input
                        placeholder="Masukan Nama kamu"
                        type="text"
                        autoComplete="off"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-sm rounded-lg outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 px-2 py-2.5"
                      />
                    </Form.Item>

                    <div className="mb-1 lg:mb-2">
                      <label htmlFor="username" className="font-bold pb-5">
                        Username :
                      </label>
                    </div>
                    <Form.Item
                      name="username"
                      id="username"
                      rules={[
                        {
                          required: true,
                          message: "Username Harus Di isi!",
                        },
                      ]}
                    >
                      <input
                        placeholder="Masukan Username kamu"
                        type="text"
                        autoComplete="off"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full text-sm rounded-lg outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 px-2 py-2.5"
                      />
                    </Form.Item>

                    <div className="mb-1 lg:mb-2">
                      <label htmlFor="Email" className="font-bold pb-5">
                        Email :
                      </label>
                    </div>
                    <Form.Item
                      name="Email"
                      id="Email"
                      rules={[
                        {
                          required: true,
                          message: "Email Harus Di isi!",
                        },
                      ]}
                    >
                      <input
                        placeholder="Masukan Email kamu"
                        type="email"
                        autoComplete="off"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm rounded-lg outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 px-2 py-2.5"
                      />
                    </Form.Item>

                    <div className="mb-1 mt-10 lg:mb-2">
                      <label htmlFor="password" className="font-bold pb-5">
                        Password
                      </label>
                    </div>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Password harus di isi",
                        },
                      ]}
                    >
                      <Input.Password
                        id="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukan password kamu"
                        className="py-1.5"
                      />
                    </Form.Item>
                    <div className="mb-3 mt-8">
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      // onClick={() => login()}
                      className="w-full bg-primary py-2"
                    >
                      Daftar
                      {Loading ? (
                        <>
                          <Spin indicator={antIcon} className="ml-5 mb-1" />
                        </>
                      ) : null}
                    </Button>
                  </Form>
                </div>

                <div class="mt-10">
                  <div class="relative">
                    <div
                      class="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div class="w-full border-t border-gray-200"></div>
                    </div>
                    <div class="relative flex justify-center text-sm font-medium leading-6">
                      <span class="bg-white px-6 text-gray-900">About Me</span>
                    </div>
                  </div>

                  <div class="mt-6 grid grid-cols-2 gap-4">
                    <a
                      href="https://www.instagram.com/_ha_nif/"
                      class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                      <img src={instagramLogo} className="w-5 h-5" alt="" />

                      <span class="text-sm font-semibold leading-6">
                        Instagram
                      </span>
                    </a>

                    <a
                      href="https://github.com/jamaludinhanif"
                      class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                      <svg
                        class="h-5 w-5 fill-[#24292F]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="text-sm font-semibold leading-6">
                        GitHub
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative hidden w-0 flex-1 lg:block">
            <img
              class="absolute inset-0 h-full w-full object-cover"
              src={loginImg}
              alt=""
            />
          </div>
        </div>
      </body>
      {contextHolder}
    </>
  );
};

export default Register;
