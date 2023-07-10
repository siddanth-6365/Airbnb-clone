import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/indexPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccountPage } from "./pages/AccountPage";
import { UserContextProvider } from "./Context/Usercontext";
import Layout from "./Layout";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true; //whether or not the browser should send cookies, authentication headers

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
            

          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
// layout is a parent route (as we mentioned <outlet/> in layout file) and inside it we will have child routes
