var React = require('react');

var Footer = React.createClass({
  render: function () {
    return(
      <div className="row" style={{backgroundColor: "#c4c4c4", marginRight: "0"}}>
          <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
              <p><strong>&copy; 2016 MAKERLINK</strong><br/></p>
          </div>
      </div>
    )
  }
});

module.exports = Footer;
