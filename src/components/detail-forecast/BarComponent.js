import React from "react";

class BarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.barDom = React.createRef();
  }

  componentDidMount() {
    this.setStyle()

  }

  setMarginLeft(){
    const left = (this.props.width / (this.props.length + 1)) * (this.props.index + 1) + "px";
    this.barDom.current.style.left = left
  }

  setStyle(){
    this.setMarginLeft()
    this.barDom.current.animate(
      [{ height: 0 }, { height: this.props.height }],{
        duration: 800,
        delay: this.props.animationDelay,
        fill: 'forwards'
      }
    );
  }

  componentDidUpdate(prevProps){
    if (prevProps.query!==this.props.query) {
      this.setStyle()
    }
    if (prevProps.width !== this.props.width) {
      this.setMarginLeft()
    }
  }

  render() {
    return (
      <div className="igFrameBar-igData" ref={this.barDom}>
        <span className="igFrameBar-igData-degree">{this.props.temp}&#176;</span>
        <span className="igFrameBar-igData-time">{this.props.day}</span>
      </div>
    );
  }
}
export default BarComponent;
