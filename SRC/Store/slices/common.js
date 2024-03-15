import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  services: [],
  cartData: [],
  selectedVoucher :{},
  financeBreakDown: [],
  notification : false,
  // barberServices:[]
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCartData(state, action) {
      state.cartData.push(action.payload)
      console.log("reduxxxx", state.cartData);
    },
    setRemoveCardData(state, action) {
      let data = [...state.cartData];
      data.splice(action.payload , 1);
      state.cartData = data ;




    },
    setWholeCart(state , action){
      state.cartData = action.payload;
    },
    setUserData(state, action) {
      state.userData = action?.payload;
      // console.log("🚀 ~ setUserData ~ action?.payload:", action?.payload)
    },
    setUserLogOut(state, action) {
      state.userData = {};
    },
    setServices(state, action) {
      state.services = action?.payload;
    },
   
    setNotification(state,action){
      state.notification = action.payload
    },
    setVoucherData(state,action){
      state.selectedVoucher = action.payload
      console.log('Selected Voucher=====>>>>', state.selectedVoucher)
    },
  //  setbarberServices(state, action) {
  //   state.barberServices = action.payload
  //   console.log("🚀 ~ setbarberServices ~ action.payload ============>:", action.payload)
  // },
}
});

export const {
  setUserData,
  setUserLogOut,
  setCartData,
  setNotification,
  setServices,
  setRemoveCardData,
  setWholeCart,
  setVoucherData,
  // setbarberServices
} = CommonSlice.actions;

export default CommonSlice.reducer;
