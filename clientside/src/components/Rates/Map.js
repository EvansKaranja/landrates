import React, { Component } from "react";
import { connect } from "react-redux";
import {getParcels,makePayments} from "../../actions/landrates";
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
      geojsonLayer: null,
      lr:"",
      phoneNumber:"",
    };
    this.mapRef = React.createRef();
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    if (!this.state.map && !this.props.paymentInfo) this.init(this.mapRef.current);
  }

  componentDidUpdate(preProps, PrevState) {
    if (
      this.props.parcels &&
      this.state.map &&
      !this.state.geojsonLayer
    ) {
      this.addGeoJSONLayer(this.props.parcels);

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
  addGeoJSONLayer =(geojson)=> {
    const geojsonLayer = L.geoJson(geojson,{style:this.style});
    this.state.tileLayer.on("load",()=>geojsonLayer.addTo(this.state.map))

    
    this.setState({ geojsonLayer });

    this.zoomToFeature(L.geoJson(this.props.plot));
 let latlng = this.state.map.getCenter(this.props.plot)
 let lng = latlng["lng"]
 let lat = latlng["lat"]
 console.log(lat)
 console.log(lng)
    L.marker([lat,lng]).addTo(this.state.map);
  
  }
  zoomToFeature =(target)=> {
    var fitBoundsParams = {
      paddingTopLeft: [10, 10],
      paddingBottompLeft: [10, 10],
    };
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }
  style=(feature) =>{
    let n = feature.properties.land_reference
    let b= this.props.lr
    return {
        fillColor: feature.properties.land_reference==this.props.lr["LR"]?"red":"white",
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

  // ------------------------------
handleonChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
handleOnsubmit = (e) => {
  e.preventDefault();
  this.setState({...this.state, lr:""})
  var data = {"LR":this.state.lr}
  this.props.getParcels(data)
}


handlePayments=(e)=>{
  console.log("called")
  e.preventDefault();
  var data = {
    "phoneNumber":this.state.phoneNumber,
    "lr":this.props.plot.properties.land_reference
  }
  this.props.makePayments(data)
  this.setState({...this.state, phoneNumber:""})

  
}
siteValue=(zone)=>{
  if(zone =="ONE") return "1.5M"
  if(zone =="TWO") return "1.3M"
  if(zone =="THREE") return "1M"
  if(zone =="FOUR") return "0.8M"
    }
ImprovedSiteValue=(zone)=>{
      if(zone =="FOUR") return "700,000"
      if(zone =="THREE") return "500,000"
      if(zone =="TWO") return "100,000"
      if(zone =="ONE") return "200,000"
        }
TotalRates=(zone,landuse)=>{
    let site_value={
      ONE:1500000,
      TWO:1300000,
      THREE:1000000,
      FOUR:800000,

    }
    let improvedsite_value={
      ONE:200000,
      TWO:100000,
      THREE:500000,
      FOUR:700000,

    }
    let rate = {
      residential:0.02,
      Commercial:0.03,
      Bare:0.01,
    }
var value = rate[landuse]*(site_value[zone]+improvedsite_value[zone])

return value
}
  render() {
    if (this.props.paymentInfo) {
      return <Redirect to="/" />
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
           {this.props.parcels?
<div style ={{position:"absolute",top:0,right:"5px",height:"600px",width:"300px", margin:"5px",padding:"5px",zIndex:3,background:"#343a40"}}>
  <div style={{}}>
  <h5 style={{padding:"10px",textAlign:"center", color:"white"}} className="table table-dark m-0 ">Plot Details</h5>
<table className="table table-dark mr-0">
<thead>
</thead>
<tbody>
  <tr style={{margin:"0px"}}>
    <td>L/R</td>
           <td>{this.props.plot.properties.land_reference}</td>
  </tr>
  <tr>
    <td>Constituency</td>
    <td>{this.props.plot.properties.contituency}</td>
  </tr>
  <tr>
    <td style={{fontSize:"15px"}}>Plot Owner</td>
    <td style={{fontSize:"10px",fontWeight:"bold"}}>{this.props.plot.properties.owner}</td>
  </tr>
  
  <tr>
    <td>Type of Ownership</td>
    <td>{this.props.plot.properties.ownership}</td>
  </tr>
 
  <tr>
    <td>Site Value</td>
    <td> {this.siteValue(this.props.plot.properties.zone)}</td>
  </tr>   
  <tr>
    <td>Improved Site Value</td>
    <td>{this.ImprovedSiteValue(this.props.plot.properties.zone)} </td>
  </tr>   
  <tr>
    <td>Total Rate</td>
    <td>{this.TotalRates(this.props.plot.properties.zone,this.props.plot.properties.land_use)}</td>
  </tr>
  <tr>
  <td> Amount Owed</td>
    <td> {this.props.plot.properties.paid?<span>0</span>:<span >KSH <span style={{color:"red"}}>{this.TotalRates(this.props.plot.properties.zone,this.props.plot.properties.land_use)}</span></span>}</td>
  </tr>
<tr>
  
  
</tr>
</tbody>

</table>
{this.props.plot.properties.paid?<span></span>:
<div> <input   type="submit"  className="btn btn-success btn-block mb-2" value="Make payment"/>
 <form onSubmit={this.handlePayments}>
                    <div className="form-group" style={{ display: "flex" }}>
                  
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="254740321847"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleonChange}
                        required
                        // autoComplete="off"
                      />
                      <button type="submit" className="btn btn-success rounded-0" style={{ width: "100px" }} >Send</button>
                      
                    </div>
                  </form></div>}
</div>
</div>:<span></span>}

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
            name="lr"
            value={this.state.lr}
            style={{borderRadius:"20px  0  0 20px"}}
            onChange={this.handleonChange}
            placeholder="eg LR 001/011"
            required
            // autoComplete="off"
      />
      <button type="submit"   className="btn" style={{backgroundColor:"#3b58bf",width: "100px" ,borderRadius:" 0 20px 20px 0", color:"white"}} >Search</button>
      
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
parcels:state.rates.parcels,
plot:state.rates.plot,
lr:state.rates.lr

  
});

export default connect(mapStateToProps,{getParcels,makePayments})(Map);





 




