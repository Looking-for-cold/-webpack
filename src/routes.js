import React from 'react';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import { Layout, Breadcrumb } from "antd";
import LeftMenu from "./LeftMenu";
import My from './my.js';
import Index from './react.js';


const { Header, Content, Footer } = Layout;

class SiderDemo extends React.Component {
  
    render() {
      return (
        <Router>
        <Layout style={{ minHeight: "100vh" }}>
            <LeftMenu />

            <Layout>
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                    <Route exact path="/" component={My} />
                    <Route path="/Index" component={Index} />
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
            </Layout>
        </Layout>
        </Router>
    );

    }
}
export default SiderDemo;