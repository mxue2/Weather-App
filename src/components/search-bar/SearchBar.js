import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  handleInput = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleClick = e => {
    e.target.previousElementSibling.value = ""
    this.setState({query:''})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.searching(this.state.query)
  }

  render() {
    // const style = this.state.query !== "" ? { display: "block" } : { display: "none" }

    return (
      <div className="search-container">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder=" " onInput={this.handleInput}></input>
          <span
            onClick={this.handleClick}
          ></span>
          {/* <div
            className="dropdown-menu"
            style={style}
          >
            <p>London</p>
            <p>Melbourne</p>
          </div> */}
        </form>
      </div>
    );
  }
}

export default SearchBar;
