
import PropTypes from "prop-types";
import ProLayoutWrapper from "./components/site/prolayout/ProLayout";
import { Route, Routes } from "react-router-dom";
import AllTemplates from "./components/site/templates/AllTemplates";
import AddTemplate from "./components/site/templates/AddTemplate";
import AllAccounts from "./components/site/accounts/AllAccounts";
import Login from "./components/site/Login";
import { useSelector } from "react-redux";
import Campaign from "./components/site/campaign/Campaign";
import Reports from "./components/site/reports/Reports";
import AllContacts from "./components/site/contacts/AllContacts";
import AllCampaign from "./components/site/campaign/AllCampaign";

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
          <Route exact path="/" element={<RouteWrapper component={AllAccounts} showDelete />} />

          <Route exact path="/templates" element={<RouteWrapper component={AllTemplates} showDelete />} />
          <Route exact path="/templates/add" element={<RouteWrapper component={AddTemplate} />} />

          <Route exact path="/contacts" element={<RouteWrapper component={AllContacts} showDelete />} />4

          <Route exact path="/acounts" element={<RouteWrapper component={AllAccounts} showDelete />} />

          <Route exact path="/campaign" element={<RouteWrapper component={AllCampaign} />} />
          <Route exact path="/campaign/add" element={<RouteWrapper component={Campaign} />} />

          <Route exact path="/reports" element={<RouteWrapper component={Reports} />} />
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
