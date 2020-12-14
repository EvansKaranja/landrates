import {
  GET_PARCELS,MAKEPAYMENTS,GET_PLOTS
 

} from "../actions/types.js";
const initialState = {
  parcels: null,
  plots:null,
  lr:null,
  plot:null,

  
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARCELS:
      return {
        ...state,
        parcels: action.payload.res['plots'],
        plot: action.payload.res['plot'],

        lr:action.payload.LR
      };
      case GET_PLOTS:
      return {
        ...state,
        plots: action.payload
      };
      case MAKEPAYMENTS:
        return {
          parcels: null,
          plots:null,
          lr:null,
          plot:null, 
        };
    default:
      return state;
  }
}
