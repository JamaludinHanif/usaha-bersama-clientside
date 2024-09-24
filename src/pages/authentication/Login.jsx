import React from "react";
import loginImg from "../../../public/logImg.png";
import instagramLogo from "../../../public/2227.jpg";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../../config/api";
import axios from "axios";
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

const onFinish = (values) => {
  // console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
};

const Login = () => {
  // antd
  const [messageApi, contextHolder] = message.useMessage();

  // router
  const navigate = useNavigate();

  //state
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [Loading, setLoading] = useState(false);

  const login = async () => {
    let body = {
      username: Username,
      password: `${Password}`,
    };
    console.log("ini body", body);
    setLoading(true);
    await axios
      .post(`${API.Ngrok_URL}/auth/login`, body, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      })
      .then((response) => {
        if (response?.data?.status == true) {
          navigate(`/home`);
          sessionStorage.setItem(
            "@userData",
            JSON.stringify(response?.data?.data)
          );
          sessionStorage.setItem("@isLoggedIn", "true");
          message.success("login berhasil");
          console.log(response?.data);
        } else {
          message.error("login gagal");
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
                <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Log in ke akun mu
                </h2>
                <p class="mt-2 text-sm leading-6 text-gray-500">
                  Belum punya akun ?
                  <a
                    href="https://wa.me/6285161310017?text=daftarin%20saya%20dong%20minn%20"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Daftar sekarang
                  </a>
                </p>
              </div>

              <div class="mt-10">
                <div>
                  {/* <form
                    action="src/config/login.php"
                    method="POST"
                    class="space-y-6"
                  >
                    <div>
                      <label
                        for="Username"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div class="mt-2">
                        <input
                          id="Username"
                          name="Username"
                          type="text"
                          autocomplete="Username"
                          required
                          class="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        for="Password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      <div class="mt-2">
                        <input
                          id="Password"
                          name="Password"
                          type="password"
                          autocomplete="current-password"
                          required
                          class="block w-full px-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          for="remember-me"
                          class="ml-3 block text-sm leading-6 text-gray-700"
                        >
                          Remember me
                        </label>
                      </div>

                      <div class="text-sm leading-6">
                        <a
                          href="#"
                          class="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Log in
                      </button>
                    </div>
                  </form> */}
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    onSubmitCapture={() => login()}
                  >
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
                      <Link to={"/inputrecovery"}>
                        <p className="text-xs text-blue-400 cursor-pointer">
                          Lupa Password ?
                        </p>
                      </Link>
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      // onClick={() => login()}
                      className="w-full bg-primary py-2"
                    >
                      Login
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

export default Login;
