import React, { Component } from "react";
import { connect } from "react-redux";
import {getPlots} from "../../../actions/landrates";

import Header from "../../Layout/Header";
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

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      lr:"",
      phoneNumber:"",
    };
    this.mapRef = React.createRef();
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    if (!this.state.map && !this.props.plots) this.init(this.mapRef.current);
    // console.log(this.props.plots
  this.props.getPlots()


  }
  componentDidUpdate(preProps, PrevState) {
    if(preProps!=this.props)console.log(  "Ecans" )
    if (
      this.props.plots &&
      this.state.map &&
      !this.state.geojsonLayer
    ) {
      console.log("add")
      this.addGeoJSONLayer(this.props.plots);
    } 
  }
  
  
  init = (id) => {
        let map = L.map(id,config.params)
        const tileLayer = L.tileLayer(
          config.tileLayer.uri,
          config.tileLayer.params
        ).addTo(map);
        this.setState({ map, tileLayer });
        L.control.zoom({
          position:'bottomleft'
        }).addTo(map)
  };
  // adding json layer
  addGeoJSONLayer =(geojson)=> {
    console.log("running")
    const geojsonLayer = L.geoJson(geojson,{style:this.style});
    this.state.tileLayer.on("load",()=>geojsonLayer.addTo(this.state.map))

    
    this.setState({ geojsonLayer });

    this.zoomToFeature(geojsonLayer);
  }
  zoomToFeature =(target)=> {
    var fitBoundsParams = {
      paddingTopLeft: [10, 10],
      paddingBottompLeft: [10, 10],
    };
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }
   style=(feature) =>{
     
    return {
        fillColor: this.defineColor(feature.properties),
        weight: 2,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.7
    };
}
defineColor=(feature)=>{
  if(feature.owner=="KIAMBU COUNTY")return "green"
  if(feature.paid== true)return "blue"
  if(feature.paid==false)return "red"

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
           position: "relative",
           overflow:"hidden"
        }}>
            <div
            ref={this.mapRef}
            id="map"
            style={{
              height: "90vh",
              width: "100%",
              position: "relative",
              zIndex:1
            }}
          ></div>    
</div>
</div> )
}
   
    
     }
const mapStateToProps = (state) => ({
parcels:state.rates.parcels,
plots:state.rates.plots

  
});

export default connect(mapStateToProps,{getPlots})(Admin);





 




