import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./css/breadcrumbs.css";
import { HiHome } from "react-icons/hi2";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="lg:ml-16 lg:text-3xl mb-10">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}><HomeOutlined /></Link>
        </Breadcrumb.Item>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <Breadcrumb.Item key={index}>
              <Link to={to} className={location.pathname === to ? 'active' : ''}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
