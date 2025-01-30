vbvimport "./App.css";
import PropTypes from "prop-types";
import ProLayoutWrapper from "./components/site/prolayout/ProLayout";
import { Test } from "./Test";
import { Route, Routes } from "react-router-dom";
import RichCard from "./components/site/templates/Templates";
import Contacts from "./components/site/contacts/Contacts";

function App() {
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
      <Routes>
        <Route exact path="/" element={<RouteWrapper component={Test} />} />
        <Route exact path="/templates" element={<RouteWrapper component={RichCard} />} />
        <Route exact path="/add-contacts" element={<RouteWrapper component={Contacts} />} />
      </Routes>
    </>
  );
}

export default App;
