import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../Layout/Header";
let config = {};
config.params = {
  center: [-1.1213599945293595, 37.00812220573425],
  zoomControl: false,
  zoom: 16,
  // maxZoom: 20,
  minZoom: 1,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true,
};
config.tileLayer = {
  uri: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  params: {
    minZoom: 1,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: "",
    accessToken: "",
  },
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  
  

  render() {
      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <Header />
          <div style = {{
             height: "93vh",
             width: "100vw",
             overflow:"hidden"
          }}>
              <div
              style={{
                height: "100%",
                width: "100%",
                background:"blue"
              }}
            ></div>    
</div>
</div> )
}}
const mapStateToProps = (state) => ({
parcels:state.rates.parcels
  
});

export default Map;





 




