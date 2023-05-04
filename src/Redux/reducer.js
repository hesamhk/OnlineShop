export const productsReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case "productRequest":
      return { loading: true, products: [] };
    case "productsSuccess":
      return { loading: false, products: payload };
    case "productFailed":
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: [] },
  { type, payload }
) => {
  switch (type) {
    case "productDetailRequest":
      return { loading: true, error: "" };
    case "productDetailSuccess":
      return { loading: false, product: payload };
    case "productDetailFailed":
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case "cartAddItem":
      const item = payload;
      const existItem = state.cartItems.find((x) => x.product === x.item);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "removeItem":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };
    case "cartReset":
      return {};
    case "plus":
      const indexPlus = state.cartItems.findIndex((i) => i.product === payload);
      state.cartItems[indexPlus].qty++;
      return { ...state, ...state.cartItems };
    case "minus":
      const indexMinus = state.cartItems.findIndex(
        (i) => i.product === payload
      );
      state.cartItems[indexMinus].qty--;
      return { ...state, ...state.cartItems };
    default:
      return state;
  }
};

export const loginReducer = (state = { userInfo: [] }, { type, payload }) => {
  switch (type) {
    case "logingRequest":
      return { loading: true };
    case "loginSuccess":
      return { loading: false, userInfo: payload };
    case "loginFailed":
      return { loading: false, error: payload };
    case "successLogout":
      return {};
    default:
      return state;
  }
};

export const signupReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "signupRequest":
      return { loading: true };
    case "signupSuccess":
      return { loading: false, userInfo: payload, success: true };
    case "signupFailed":
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderReducer = (state = { order: [] }, { type, payload }) => {
  switch (type) {
    case "requestOrder":
      return { loading: true };
    case "successOrder":
      return { loading: false, order: payload };
    case "failedOrder":
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const changeProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "changeProfileRequest":
      return { ...state, loading: true, success: false };
    case "changeProfileSuccess":
      return { ...state, loading: false, user: payload, success: true };
    case "changeProfileFailed":
      return { ...state, loading: false, error: payload, success: false };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "changePasswordRequest":
      return { ...state, loading: true };
    case "changePasswordSuccess":
      return { ...state, loading: false, pass: payload, success: true };
    case "changePasswordFailed":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const uploadProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "uploadRequest":
      return { loading: true };
    case "uploadSuccess":
      return { loading: false, upload: payload, success: true };
    case "uploadFailed":
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const getProfileReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case "getProfileRequest":
      return { loading: true };
    case "getProfileSuccess":
      return { loading: false, user: payload };
    case "getProfileFailed":
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const allOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "requestAllOrder":
      return { loading: true };
    case "successAllOrder":
      return { loading: false, order: payload };
    case "failedAllOrder":
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const oneOrderReducer = (state = { order: [] }, { type, payload }) => {
  switch (type) {
    case "requestOneOrder":
      return { loading: true };
    case "successOneOrder":
      return { loading: false, order: payload };
    case "failedOneOrder":
      return { loading: false, error: payload };
    default:
      return state;
  }
};
