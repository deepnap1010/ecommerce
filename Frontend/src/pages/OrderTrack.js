import React, { useState } from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

import { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

const OrderTrack = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
 
  return (
    <>
       <Meta title="Delivery Status"></Meta>
      <BreadCrumb title="Delivery Status" />

     <Steps style={{width:"50%"}}
    items={[
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />,
      },
      {
        title: 'Verification',
        status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Pay',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
<Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 480,
              background: colorBgContainer,
            }}
          >
    <h1>Thank you</h1>
          </Content>



    </>
  )
}

export default OrderTrack
