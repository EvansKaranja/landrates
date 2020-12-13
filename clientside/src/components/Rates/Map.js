import React, { Component } from "react";
import { connect } from "react-redux";
import {getParcels} from "../../actions/landrates";
import {  Redirect} from "react-router-dom";




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
      map: null,
      tileLayer: null,
      numberEntrances: null,
      location:"",
      geojson: null,
      geojsonLayer: null,
    };
    this.mapRef = React.createRef();
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    if (!this.state.map && !this.props.paymentInfo) this.init(this.mapRef.current);
    this.props.getParcels()


  }
  componentDidUpdate(preProps, PrevState) {
   console.log(this.props.parcels)
    if (
      this.props.parcels &&
      this.state.map &&
      !this.state.geojsonLayer
    ) {
      this.addGeoJSONLayer(this.props.parcels);
    } 
  }
  // adding json layer
  addGeoJSONLayer =(geojson)=> {
    const geojsonLayer = L.geoJson(geojson);
    this.state.tileLayer.on("load",()=>geojsonLayer.addTo(this.state.map))

    
    this.setState({ geojsonLayer });

    // this.zoomToFeature(geojsonLayer);
  }
  zoomToFeature =(target)=> {
    var fitBoundsParams = {
      paddingTopLeft: [10, 10],
      paddingBottompLeft: [10, 10],
    };
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }
  onEachFeature=(feature, layer) =>{
    if (feature) {
      layer.on({
        click: (e) => {
          return this.highlightFeature(e);
        },
      });
    }
  }
  highlightFeature = (e) => {
    this.setState({ show: true, parkingspace: e.target.feature });
  }
  pointToLayer=(feature, latlng) =>{
    var greenIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png",

      iconSize: [25, 41], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
 
    return L.marker(latlng, { icon: greenIcon });
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
  // ------------------------------
handleonChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
handleOnsubmit = (e) => {
  e.preventDefault();
  let name = this.state.location

    this.props.geocodeUserLocation(name)
    this.setState({
      location: "",
      display:false
      
    })
  
}
  getlocation = () => {
    const data = {
      offstreet: this.state.offstreet,
      onstreet: this.state.onstreet,
      disabled: this.state.disabled,

    }
    this.props.getUserLocation(data)

this.setState({display: false});
  
};
  handleClick = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
    console.log(this.state.selectedOption)
    // if (e.target.name === "disabled") {
    //   const disabled = !this.state.disabled
    //   this.setState({
    //  disabled:disabled
    //   })
    // }

}
clearJSONlayer=()=>{
  console.log("called")
  this.props.clearInfo()
  this.state.map.removeLayer(this.state.geojsonLayer);
  location.reload();
  this.setState({
    ...this.state,
    show:false,
    geojsonLayer:null,
    display:true,
    parkingspace:null
  })
}

  render() {
    if (this.props.paymentInfo) {
      return <Redirect to="/parking" />
    } else {

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
          }}>
              <div
              ref={this.mapRef}
              id="map"
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                zIndex:1
              }}
            ></div>
<div style ={{position:"absolute",top:0,right:0,height:"200px",width:"25vw", margin:"5px",padding:"5px",zIndex:3}}>
<table className="table table-dark m-0 " >
<thead style={{textAlign:"center"}}>
  <label>Confirm Details</label>

</thead>
<tbody>
  <tr style={{margin:"0px"}}>
    <td>L/R</td>
<td></td>
  </tr>
  <tr>
    <td>Constituency</td>
    <td></td>
  </tr>
  <tr>
    <td>Plot Owner</td>
    <td></td>
  </tr>
  
  <tr>
    <td>Type of Ownership</td>
    <td></td>
  </tr>
  <tr>
    <td>Land Use</td>
    <td></td>
  </tr>
  <tr>
    <td>Site Value</td>
    <td> </td>
  </tr>   
  <tr>
    <td>Improved Site Value</td>
    <td> </td>
  </tr>   
  <tr>
    <td>Total Rate</td>
    <td> </td>
  </tr>
  <tr>
    <td>

  <button type="button"  className="btn btn-success btn-block">Pay Your Landrates</button>

    </td>
  </tr>
   
</tbody>
</table>
</div>

            <div style={{backgroundColor: "#343a40",
            width: "300px",height: "100px",top: 
            "60px",zIndex: "2",color: "white",
             position:"absolute",top:0,left:0, margin:"5px",padding:"5px",borderRadius:"16px"
             
             }}>
            <div >  
           <label>
              Search using your LR number:
            </label>
            <form onSubmit={this.handleOnsubmit}>
            <div className="form-group" style={{ display: "flex" }}>
           <input
          type="text"
            className="form-control"
            style={{borderRadius:"20px  0  0 20px"}}
            onChange={this.handleonChange}
            required
      />
      <button type="submit" disabled={this.props.parkingSpaces} className="btn" style={{backgroundColor:"#3b58bf",width: "100px" ,borderRadius:" 0 20px 20px 0", color:"white"}} >Search</button>
    </div>
  </form>
</div>
</div> 


          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
parcels:state.rates.parcels
  
});

export default connect(mapStateToProps,{getParcels})(Map);





 




