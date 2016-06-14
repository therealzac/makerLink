var React = require('react');

var DevSideNav = React.createClass({
  render: function () {
    return (
        <nav className="navbar-default navbar-static-side sidebar-content" role="navigation">
          <div className="sidebar-collapse">
              <ul className="nav metismenu" id="side-menu">
                  <li className="nav-header">
                      <div className="logo-element">
                          mL
                      </div>
                  </li>
                  <li><span className="nav-label">Filter</span></li>
              </ul>
          </div>
        </nav>
      )
  }
});

module.exports = DevSideNav;
