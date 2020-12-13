import {
  GET_PARCELS,
 

} from "../actions/types.js";
const initialState = {
  parcels: null,

  
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARCELS:
      return {
        ...state,
        parcels: action.payload
      };
    
    default:
      return state;
  }
}
