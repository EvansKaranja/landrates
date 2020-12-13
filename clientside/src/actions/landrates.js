import {
  GET_PARCELS
} from "./types";




export const getParcels = () => (dispatch,getState) => {
  
  axios
    .get("https://gist.githubusercontent.com/Osoro-Eric/9305867bcc07e2ded32c88769242c3f3/raw/34e94e4630fbe8a43fa37c4517a787348ab26540/parcels.geojson")
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: GET_PARCELS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
