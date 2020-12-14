import {
  GET_PARCELS, MAKEPAYMENTS,GET_PLOTS
} from "./types";
export const getParcels = (LR) => (dispatch) => {
  
  axios
    .post("plot/",LR)
    .then((res) => {
      let data = {
        LR:LR,
        res :res.data
      }
    dispatch({
        type: GET_PARCELS,
        payload: data,
      });
    })
    .catch((error) => console.log(error));
};
export const getPlots = (data) => (dispatch) => {
  
  axios
    .post("plot/plots",{})
    .then((res) => {
      dispatch({
        type: GET_PLOTS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
export const makePayments= (data) => (dispatch) => {
  
  axios
    .post("/plot/pay/",data)
    .then((res) => {
      dispatch({
        type: MAKEPAYMENTS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
