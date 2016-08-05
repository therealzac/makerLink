var React = require('react');

var Footer = React.createClass({
  render: function () {
    return(
      <div className="row" style={{background: "rgba(0, 0, 0, 0.7)", marginRight: "0"}}>
          <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
              <p><strong style={{fontFamily: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: "300"}}>&copy; 2016 Makerlink, Inc.</strong><br/></p>
          </div>
      </div>
    )
  }
});

module.exports = Footer;
