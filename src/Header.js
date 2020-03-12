import React, { Component } from "react";

import { connect } from "react-redux";

export class Header extends Component {
  render() {
    return (
      <div>
        <h2>Header</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listings
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
