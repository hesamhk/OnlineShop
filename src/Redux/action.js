import axios from "axios";

export const getProducts = () => async (dispatch, getState) => {
  dispatch({ type: "productRequest" });
  try {
    const { data } = await axios.get("http://kzico.runflare.run/product/");
    JSON.stringify(data);
    dispatch({ type: "productsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "productFailed", payload: error.message });
  }
};

export const getProductDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: "productDetailRequest", loading: true });
  try {
    const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);
    dispatch({ type: "productDetailSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "productDetailFailed", payload: error.message });
  }
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);
  dispatch({
    type: "cartAddItem",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  JSON.stringify(data);
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeProduct = (id) => (dispatch, getSate) => {
  dispatch({ type: "removeItem", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getSate().cart.cartItems));
};

export const plus = (id) => (dispatch, getSate) => {
  dispatch({ type: "plus", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getSate().cart.cartItems));
};

export const minus = (id) => (dispatch, getSate) => {
  dispatch({ type: "minus", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getSate().cart.cartItems));
};

export const userLogin = (email, password) => async (dispatch, getSate) => {
  dispatch({ type: "loginRequest", loading: true });
  try {
    const { data } = await axios.post("http://kzico.runflare.run/user/login", {
      email,
      password,
    });
    dispatch({ type: "loginSuccess", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "loginFailed", payload: error.response.data });
  }
};

export const userSignup =
  (username, email, password, mobile) => async (dispatch, getState) => {
    dispatch({ type: "signupRequest" });
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username,
          email,
          password,
          mobile,
        }
      );
      dispatch({ type: "signupSuccess", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: "signupFailed", payload: error.response.data });
    }
  };

export const userLogout = () => (dispatch, getState) => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("order");
  dispatch({ type: "successLogout" });
};

export const orderAction =
  (orderItems, address, city, postalCode, phone, totalPrice) =>
  async (dispatch, getSate) => {
    try {
      dispatch({ type: "requestOrder" });
      const {
        login: { userInfo },
      } = getSate();
      const { data } = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems,
          shippingAddress: {
            address,
            city,
            postalCode,
            phone,
          },
          paymentMethod: "cash",
          shippingPrice: "5",
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.user.token}`,
          },
        }
      );
      dispatch({ type: "successOrder", payload: data });
      localStorage.setItem("order", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: "failedOrder", payload: error.response.data });
    }
  };

export const cartItemsReset = () => (dispatch, getState) => {
  dispatch({ type: "cartReset" });
  localStorage.removeItem("cartItems");
};

export const changeProfile =
  (firstname, lastname, gender, age, city) => async (dispatch, getState) => {
    try {
      const {
        login: { userInfo },
      } = getState();
      dispatch({ type: "changeProfileRequest", loading: true });
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname,
          lastname,
          gender,
          age,
          city,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.user.token}`,
          },
        }
      );
      dispatch({ type: "changeProfileSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "changeProfileFailed", payload: error.response.data });
    }
  };

export const changePassword =
  (old_password, new_password) => async (dispatch, getState) => {
    try {
      const {
        login: { userInfo },
      } = getState();
      dispatch({ type: "changePasswordRequest" });
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password,
          new_password,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.user.token}`,
          },
        }
      );
      dispatch({ type: "changePasswordSuccess", payload: data });
    } catch (error) {
      dispatch({ type: "changePasswordFailed", payload: error.response.data });
    }
  };

export const uploadProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "uploadRequest" });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.post(
      "http://kzico.runflare.run/user/profile-image",
      formData,
      {
        headers: {
          authorization: `Bearer ${userInfo.user.token}`,
        },
      }
    );
    dispatch({ type: "uploadSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "uploadFailed", payload: error.response.data });
  }
};

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "getProfileRequest" });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.get("http://kzico.runflare.run/user/profile", {
      headers: {
        authorization: `Bearer ${userInfo.user.token}`,
      },
    });
    dispatch({ type: "getProfileSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getProfileFailed", payload: error.response.data });
  }
};

export const getAllOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "requestAllOrder" });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.get("http://kzico.runflare.run/order/", {
      headers: {
        authorization: `Bearer ${userInfo.user.token}`,
      },
    });
    dispatch({ type: "successAllOrder", payload: data });
  } catch (error) {
    dispatch({ type: "failedAllOrder", payload: error.response.data });
  }
};

export const getOneOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "requestOneOrder" });
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.get(`http://kzico.runflare.run/order/${id}`, {
      headers: {
        authorization: `Bearer ${userInfo.user.token}`,
      },
    });
    dispatch({ type: "successOneOrder", payload: data });
  } catch (error) {
    dispatch({ type: "failedOneOrder", payload: error.response.data });
  }
};
