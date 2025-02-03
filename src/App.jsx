
import PropTypes from "prop-types";
import ProLayoutWrapper from "./components/site/prolayout/ProLayout";
import { Test } from "./Test";
import { Route, Routes } from "react-router-dom";
import Contacts from "./components/site/contacts/Contacts";
import AllTemplates from "./components/site/templates/AllTemplates";
import AddTemplate from "./components/site/templates/AddTemplate";
import AllAccounts from "./components/site/accounts/AllAccounts";
import Login from "./components/site/Login";
import { useSelector } from "react-redux";
import Campaign from "./components/site/Campaign/campaign";

function App() {

  const { isLoggedIn } = useSelector(state => state.auth)
  const RouteWrapper = ({ component: Component, ...props }) => {
    RouteWrapper.propTypes = {
      component: PropTypes.elementType.isRequired,
    };
    return (
      <ProLayoutWrapper>
        <Component {...props} />
      </ProLayoutWrapper>
    );
  };

  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<RouteWrapper component={AllTemplates} />} />
          <Route exact path="/templates" element={<RouteWrapper component={AllTemplates} />} />
          <Route exact path="/templates/add" element={<RouteWrapper component={AddTemplate} />} />
          <Route exact path="/contacts" element={<RouteWrapper component={Contacts} />} />
          <Route exact path="/acounts" element={<RouteWrapper component={AllAccounts} />} />
          <Route exact path="/campaign" element={<RouteWrapper component={Campaign} />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="*" element={<>Not Found</>} />
        </Routes>
      )}
    </>
  );
}

export default App;
