import React from "react";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  // navigate
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // session storage manage
  const sessionUserData = sessionStorage.getItem("@userData");
  const userData = JSON.parse(sessionUserData);

  const formattedJson = JSON.stringify(userData, null, 2);

  //   usesate
  const [IsLoading, setIsLoading] = useState(false);

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
        {/* <div className=" text- lg:text-base">{formattedJson}</div> */}
        <pre className="text-sm ml-10" style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {formattedJson}
        </pre>
      </div>
    </>
  );
};

export default Profile;
