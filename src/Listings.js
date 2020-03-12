import React, { Component } from "react";

import Overdrive from "react-overdrive";
import { connect } from "react-redux";
import { populateListing } from "./actions/listingActions";

const listings = require("./data.json");

const ArrayRange = n => Array.apply(null, Array(n)).map((x, i) => i);

const chunkArray = inputArray =>
  inputArray
    ? ArrayRange(Math.ceil(inputArray.length / 5)).map((x, i) =>
        inputArray.slice(i * 5, i * 5 + 5)
      )
    : null;

export class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredListings: null,
      filtered: false
    };

    this.handleFilterTest = this.handleFilterTest.bind(this);
    this.handleFilterReset = this.handleFilterReset.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.populateListing(listings);
    }, 2000);
  }

  componentDidUpdate() {
    const { listings } = this.props;
    const { filteredListings } = this.state;
    if (!filteredListings && listings) {
      this.setState({
        filteredListings: listings
      });
    }
  }

  handleFilterTest() {
    const { listings } = this.props;
    this.setState({
      filteredListings: listings.filter(
        listingItem => listingItem.Price >= 25000
      ),
      filtered: true
    });
  }

  handleFilterReset() {
    const { listings } = this.props;
    this.setState({
      filteredListings: listings,
      filtered: false
    });
  }

  renderRow(listingRow) {
    return listingRow.map(listingItem => (
      <Overdrive
        key={listingItem.Heading}
        id={listingItem.Heading}
        className="listing-item"
      >
        <div>
          {listingItem.showBridge ? (
            <img
              className="bridge"
              src={require("./assets/wide_ggbridge_bg_teneax.jpg")}
            />
          ) : (
            <div className="tiles">
              <img src={require("./assets/darktiles_bg_gike55.jpg")} />
              <img
                className="previewImage"
                src={require("./assets/place_holder_zuvywg.png")}
              />
            </div>
          )}
          <h2>{listingItem.Heading}</h2>
          <div className="bottom">
            <div className="line" />
            <span className="price">
              $
              {listingItem.Price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </span>
          </div>
        </div>
      </Overdrive>
    ));
  }

  render() {
    const { listings } = this.props;
    const { filteredListings, filtered } = this.state;

    let columnListings = chunkArray(filteredListings);
    return columnListings ? (
      <div className="App-Body">
        <div className="listings-actions">
          {filtered ? (
            <span onClick={this.handleFilterReset}>Reset Filter</span>
          ) : (
            <span onClick={this.handleFilterTest}>Filter Test</span>
          )}
        </div>
        <div className="listings-container">
          {columnListings.map(listingRow => (
            <div key={`${listingRow[0].Heading}-row`} className="row">
              {this.renderRow(listingRow)}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="App-Body">
        <div className="loading-ring" />
        <p>Loading...</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listingReducer.listings
});

const mapDispatchToProps = {
  populateListing
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
