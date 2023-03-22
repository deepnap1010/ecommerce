import React, { useEffect } from "react";
import { Table,} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { LinkedinFilled, MessageTwoTone, WhatsAppOutlined } from "@ant-design/icons";
import { getUsers } from "../features/cutomers/customerSlice";

import { Link, useNavigate } from "react-router-dom";

function useSmsNavigationHook() {
  const navigate=useNavigate();
  const handleSmsClick = () => {
    navigate("/sms");
  };
  return handleSmsClick;
}

function SmsLink({ record }) {
  const handleSmsClick = useSmsNavigationHook();
  return (
    <p onClick={handleSmsClick}>
      <MessageTwoTone />
    </p>
  );
}

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Sms",
    dataIndex: "sms",
   
  },
  {
    title: "whatsapp",
    dataIndex: "whatsapp",
    render: (text, record) => (
      <a
        href={`https://wa.me/${record.mobile}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppOutlined />
      </a>
    ),
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        sms: (
          <>
         
            <Link
              to={`/admin/sms/${customerstate[i]._id}`}
              
            >
      < MessageTwoTone/>
            </Link>
           
            </>
            ),
        whatsapp: (
          <a
            href={`https://wa.me/${customerstate[i].mobile}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppOutlined />
          </a>
        ),
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div className="table-responsive">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
