import React from "react";
import BarComponent from "./BarComponent";

class DetailForecast extends React.Component {
  constructor(props) {
    super(props);
    this.barContainerDom = React.createRef();
    this.state = {
      styleInfo: [],
      query: "",
      width: 0
    };
  }

  componentDidMount() {
    this.setState({query: this.props.query})
    // console.log(this.props.forecast);
    this.calculateBarStyles(this.props.forecast);
    window.addEventListener("resize", ()=>{
      this.setState({width: this.barContainerDom.current.clientWidth})
    })
  }

  componentWillUnmount() {
    console.log('object');
    this.barContainerDom = React.createRef();

    window.removeEventListener('resize', ()=>{
      this.setState({width: this.barContainerDom.current.clientWidth})
    })
  }

  componentDidUpdate(prevProps){
    if (prevProps.query !== this.props.query) {
      this.setState({query: this.props.query})      
      this.calculateBarStyles(this.props.forecast);      
    }
  }

  getBarComponents() {
    return this.state.styleInfo.map((item,index) => {
      return <BarComponent 
        width={this.state.width}
        query={this.state.query}
        key={index}
        index={index}
        left={item.marginLeft} 
        height={item.height} 
        day={item.day} 
        temp={item.temp}
        animationDelay={item.animationDelay}
        length={Object.keys(this.props.forecast).length}
        ></BarComponent>;
    });
  }

  calculateBarStyles(data) {
    const width = this.barContainerDom.current.clientWidth;
    const keys = Object.keys(data);
    const values = Object.values(data);

    var barList = [];

    // Sort to get the positions of original array
    var unit = 0;
    const heightList = new Array(values.length)
    const copyArr = values.map(e=>Number(e))

    copyArr.sort( (m,n) => m>n?1:-1 ).forEach(a => {
      unit = unit +  0.7 / values.length;
      values.forEach((b,index) => {
        if (a === Number(b)) {
          heightList[index] = unit
        }
      });
    });



    for (let index = 0; index < keys.length; index++) {
      const marginLeft = (width / (keys.length + 1)) * (index + 1) + "px";
      const temp = values[index];
      const height = heightList[index].toFixed(2) * 100 + "%"
      const day = keys[index];
      const animationDelay = 100 * index;
      barList.push({
        marginLeft: marginLeft,
        temp: temp,
        height: height,
        day: day,
        animationDelay: animationDelay
      });
    }
    this.setState({
      styleInfo: barList,
      width
    });
  }

  render() {
    return (
      <div className="detail-temperature-container">
        <p>Temperature</p>
        <div className="igFrameBar" ref={this.barContainerDom}>
          {this.getBarComponents()}
        </div>
      </div>
    );
  }
}

export default DetailForecast;
