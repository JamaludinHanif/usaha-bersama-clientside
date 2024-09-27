import { useState } from "react";
import axios from "axios";
import { API } from "../../config/api";
import { message, Spin } from "antd";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(`${API.Ngrok_URL}/password/email`, {
        email,
      });
      message.success("Link reset password sudah dikirim, silahkan periksa gmail kamu");
    } catch (error) {
      message.error("Gagal mengirim email reset password.");
    }
    setLoading(false)
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
          <button type="submit">Kirim Link Reset</button>
        </form>
        {message && <p>{message}</p>}
      </div> */}

      <div className="flex bg-gray-100 min-h-screen flex-1 flex-col justify-center">
        <div className="bg-white shadow-sm border rounded-md mx-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Reset Password
            </h3>
            <div className="mt-6 max-w-xl text-sm text-gray-500">
              <p>Nanti Kamu Akan Mendapatkan Link Verifikasi Dari Gmail Kamu</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 sm:flex sm:items-center"
            >
              <div className="w-full sm:max-w-xs">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masukan email kmu yng terdaftar diakun kamu"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:ml-3 sm:text-sm sm:leading-6"
                />
              </div>
              <button
                type="submit"
                className="mt-10 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Kirim Link
                {Loading ? (
                  <>
                    <Spin indicator={antIcon} className="ml-5 mb-1" />
                  </>
                ) : null}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
