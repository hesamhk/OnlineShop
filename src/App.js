import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import ProductDetail from "./Components/PrdoductDetail/ProductDetail";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Address from "./Components/Address/Address";
import Checkout from "./Components/Checkout/Checkout";
import Setting from "./Components/Setting/Setting";
import ChangeProfile from "./Components/ChangeProfile/ChangeProfile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import UploadProfile from "./Components/UploadProfile/UploadProfile";
import Profile from "./Components/Profile/Profile";
import AllOrder from "./Components/AllOrder/AllOrder";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import NotFound from "./Components/NotFound/NotFound";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="productDetails/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="address" element={<Address />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setting" element={<Setting />}>
          <Route path="changeprofile" element={<ChangeProfile />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="uploadprofile" element={<UploadProfile />} />
        </Route>
        <Route path="allorder" element={<AllOrder />} />
        <Route path="orderDetails/:id" element={<OrderDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
