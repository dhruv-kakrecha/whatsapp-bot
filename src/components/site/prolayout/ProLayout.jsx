/* eslint-disable react/prop-types */

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import defaultProps from "./DefaultProps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProLayoutWrapper({ children }) {
  const [pathname, setPathname] = useState("/welcome");
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();

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
