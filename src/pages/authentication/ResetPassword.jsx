import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// ant desain
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

function ResetPassword() {
  const { token } = useParams(); // Ambil token dari URL
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [Loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.post(`${API.Ngrok_URL}/password/reset`, {
//         token,
//         email,
//         password,
//         password_confirmation: passwordConfirmation,
//       });
//       message.success(response.data.message)
//     } catch (error) {
//         message.error("Reset password gagal")
//     }
//     setLoading(false)
//   };

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        `${API.Ngrok_URL}/password/reset`,
        {
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        {
          headers: {
            "bypass-tunnel-reminder": "true",
          },
        }
      )
      .then((response) => {
        navigate('/')
        message.success(response.data.message)
        message.success("Silahkan Login Ulang")
    })
    .catch((err) => {
        message.error(err)
        console.error("Check Member Error: ", err);
        return false;
      });
    setLoading(false);
  };

  return (
    <>
      {/* <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password baru"
            required
          />
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Konfirmasi password baru"
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
      </div> */}

      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Your Company"
            src="https://i.pinimg.com/236x/88/ef/45/88ef4583aa9e81b18d6baa9ebf3e5486.jpg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form
              autoComplete="off"
              onSubmitCapture={() => handleSubmit()}
            >
              <div className="mb-1 lg:mb-2">
                <label htmlFor="email" className="font-bold">
                  Masukan Email :
                </label>
              </div>
              <Form.Item
                name="email"
                id="email"
                rules={[
                  {
                    required: true,
                    message: "Silahkan isi dengan email yng terdaftar diakun anda",
                  },
                ]}
              >
                <input
                  placeholder="Silahkan isi dengan email yng terdaftar diakun anda"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm rounded-lg outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs disabled:bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 p-2"
                />
              </Form.Item>
              <div className="mb-1 mt-10 lg:mb-2">
                <label className="font-bold">Password :</label>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password harus di isi",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukan password baru kamu (minimal 8 karakter)"
                />
              </Form.Item>

              <div className="mb-1 mt-10 lg:mb-2">
                <label className="font-bold pb-5">Konfirmasi Password :</label>
              </div>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Password harus di isi",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Konfirmasi Password harus sama dengan Password diatas !"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Konfirmasi password kamu"
                  value={passwordConfirmation}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-primary mt-10"
              >
                Ubah Password
                {Loading ? (
                  <>
                    <Spin indicator={antIcon} className="ml-5 mb-1" />
                  </>
                ) : null}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
