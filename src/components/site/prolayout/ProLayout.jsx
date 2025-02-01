/* eslint-disable react/prop-types */

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import defaultProps from "./DefaultProps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/authSlice";

function ProLayoutWrapper({ children }) {
  const [pathname, setPathname] = useState("/welcome");
  const [collapsed, setCollapsed] = useState(true);
  const userName = useSelector(state => state.auth.user.fullName)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // const children = (
  //   <PageContainer>
  //     <div
  //       style={{
  //         height: "120vh",
  //         minHeight: 600,
  //       }}
  //     >
  //       {/* <ProFormRadio.Group
  //         label="按钮的位置"
  //         options={["header", "menu"].map((value) => ({
  //           label: value,
  //           value,
  //         }))}
  //         fieldProps={{
  //           value: position,
  //           onChange: (e) => setPosition(e.target.value),
  //         }}
  //       /> */}
  //       <h1>Test</h1>
  //     </div>
  //   </PageContainer>
  // );

  const props = {
    ...defaultProps,
    location: {
      pathname,
    },
    collapsed,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item, dom) => (
      <a
        onClick={() => {
          setPathname(item.path || "/");
          navigate(dom.key);
          setPathname(dom.key);
        }}
      >
        {dom}
      </a>
    ),
  };

  return (
    <ProLayout
      breadcrumbRender={false}
      {...props}
      layout="mix"
      onCollapse={setCollapsed}
      avatarProps={{
        src: <Avatar icon={<UserOutlined />} />,
        size: "small",
        title: userName,
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Logout",
                    onClick: () => {
                      dispatch(logout())
                      navigate("/");
                    },
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      headerContentRender={() => {
        return (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        );
      }}
    >
      {children}
      {/* <PageContainer
        token={{
          paddingInlinePageContainerContent: 40,
        }}
      >
        <ProCard>
        </ProCard>
      </PageContainer> */}
    </ProLayout>
  );
}

export default ProLayoutWrapper;
