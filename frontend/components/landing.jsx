var React = require('react');
var Footer = require('./footer.jsx');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Landing = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  componentDidMount: function () {
    this.props.changeBackground("WHITE");
    $(function() {
        $('body').addClass('landing-page');
        $('body').attr('id', 'page-top');
        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 80
        });
        // Page scrolling feature
        $('a.page-scroll').bind('click', function(event) {
            var link = $(this);
            if ($(link.attr('href')).offset()) {
              $('html, body').stop().animate({
                scrollTop: $(link.attr('href')).offset().top - 50
              }, 500);
            }
            $("#navbar").collapse('hide');
        });
        var cbpAnimatedHeader = (function() {
            var docElem = document.documentElement,
                    header = document.querySelector( '.navbar-default' ),
                    didScroll = false,
                    changeHeaderOn = 200;
            function init() {
                window.addEventListener( 'scroll', function( event ) {
                    if( !didScroll ) {
                        didScroll = true;
                        setTimeout( scrollPage, 250 );
                    }
                }, false );
            }
            function scrollPage() {
                var sy = scrollY();
                if ( sy >= changeHeaderOn ) {
                    $(header).addClass('navbar-scroll')
                }
                else {
                    $(header).removeClass('navbar-scroll')
                }
                didScroll = false;
            }
            function scrollY() {
                return window.pageYOffset || docElem.scrollTop;
            }
            init();
        })();
    });
  },

  componentWillUnmount: function () {
    $(function() {
        $('body').removeClass('landing-page');
    });
  },

  goToProjectSubmission: function () {
    this.context.router.push("/submission");
  },

  render: function () {
    return(
    <div id='landing'>
      <div id="inSlider" className="carousel carousel-fade" data-ride="carousel">
      <ol className="carousel-indicators">
          <li data-target="#inSlider" data-slide-to="0" className="active"></li>
          <li data-target="#inSlider" data-slide-to="1"></li>
      </ol>
      <div className="carousel-inner" role="listbox">
          <div className="item active">
              <div className="container">
                  <div className="carousel-caption" style={{marginLeft: "40%"}}>
                    <h1 className="landing-header">Have an idea?</h1>
                    <p style={{marginLeft: "50px", marginTop: "50px"}}><a className="btn btn-lg btn-primary" onClick={this.goToProjectSubmission} role="button">Make It Happen</a></p>
                  </div>
              </div>
              <div className="header-back one"></div>

          </div>
          <div className="item">
              <div className="container">
                  <div className="carousel-caption blank">
                    <h1 className="landing-header">We link people<br/>
                        who need websites, web apps,<br/>
                        and user interfaces<br/>
                        with the devs who need to build them.</h1>
                  </div>
              </div>
              <div className="header-back two" style={{background: "image-url('landing/header_two.jpg') 50% 0 no-repeat"}}></div>
          </div>
      </div>
      <a className="left carousel-control" href="#inSlider" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#inSlider" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
      </a>
      </div>
      <section  className="container">
      <div className="row">
          <div className="col-lg-12 text-center">
              <div className="navy-line"></div>
              <h1>How it works<br/></h1>
          </div>
      </div>
      <div className="row">
          <div className="col-lg-12 text-center wow fadeInLeft">
              <div>
                  <i className="fa fa-plus features-icon"></i>
                  <h2>You upload your project.</h2>
                  <p>Give us a detailed description of what you need acomplished. We find the best developer for your project.</p>
              </div>
              <div className="m-t-lg">
                  <i className="fa fa-star features-icon"></i>
                  <h2>We find you a dev.</h2>
                  <p>Many developers will want to work with you. We connect you with the most capable and passionate candidates, and assist you through the process of developing your project.</p>
              </div>
          </div>
          <div className="col-lg-12 text-center wow fadeInRight">
              <div>
                  <i className="fa fa-envelope features-icon"></i>
                  <h2>You work with your dev for 3 weeks.</h2>
                  <p>In order to ensure that we deliver the project you want, we keep you up-to-date with every aspect of your project through our agile remote development web suite.</p>
              </div>
              <div className="m-t-lg">
                  <i className="fa fa-google features-icon"></i>
                  <h2>We maintain your site for a year.</h2>
                  <p>We continue to host your site after the project is finished, enabling you to use it for one year without paying for domain name fees.</p>
              </div>
          </div>
      </div>
      </section>
      <section id="team" className="gray-section team">
      <div className="container">
          <div className="row m-b-lg">
              <div className="col-lg-12 text-center">
                  <div className="navy-line"></div>
                  <h1>Our Team</h1>
                  <p>We still need to add Lena</p>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-4 wow fadeInLeft">
                  <div className="team-member">
                      <img src="http://res.cloudinary.com/makerlink/image/upload/v1459110906/Amaar_e27jhg.png" className="img-responsive img-circle img-small" alt=""/>
                      <h4><span className="navy">Amaar</span> Falzani</h4>
                      <ul className="list-inline social-icon">
                          <li><a href="#"><i className="fa fa-twitter"></i></a>
                          </li>
                          <li><a href="#"><i className="fa fa-facebook"></i></a>
                          </li>
                          <li><a href="#"><i className="fa fa-linkedin"></i></a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="col-sm-4">
                  <div className="team-member">
                      <img src="http://res.cloudinary.com/makerlink/image/upload/v1459110916/Josh_mdlrzx.jpg" className="img-responsive img-circle img-small" alt=""/>
                      <h4><span className="navy">Josh</span> Kim</h4>
                      <ul className="list-inline social-icon">
                          <li><a href="#"><i className="fa fa-twitter"></i></a>
                          </li>
                          <li><a href="#"><i className="fa fa-facebook"></i></a>
                          </li>
                          <li><a href="#"><i className="fa fa-linkedin"></i></a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="col-sm-4 wow fadeInRight">
                  <div className="team-member">
                      <img src="http://res.cloudinary.com/makerlink/image/upload/v1459110934/Zac_bzvuzj.png" className="img-responsive img-circle img-small" alt=""/>
                      <h4><span className="navy">Zac</span> Wickstrom</h4>
                      <ul className="list-inline social-icon">
                          <li><a href="#"><i className="fa fa-twitter"></i></a>
                          </li>
                          <li><a href="#"><i className="fa fa-facebook"></i></a>
                          </li>
                          <li><a href="#"><i className="fa fa-linkedin"></i></a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
              </div>
          </div>
      </div>
      </section>
      <section id="contact" className="gray-section contact">
      <div className="container">
          <div className="row m-b-lg">
              <div className="col-lg-12 text-center">
                  <div className="navy-line"></div>
                  <h1>Contact Us</h1>
              </div>
          </div>
          <div className="row m-b-lg" style={{margin_left: "30em"}}>
              <div className="col-lg-3 col-lg-offset-3">
                  <address>
                      <strong><span className="navy">MAKERLINK</span></strong><br/>
                      1118 Folsom St<br/>
                      San Francisco, CA 94103<br/>
                      <abbr title="Phone">P:</abbr> (123) 456-7890
                  </address>
              </div>
          </div>
          <div className="row">
              <div className="col-lg-12 text-center">
                  <a href="mailto:test@email.com" className="btn btn-primary">Send us mail</a>
                  <p className="m-t-sm">
                      Or follow us on social platform
                  </p>
                  <ul className="list-inline social-icon">
                      <li><a href="#"><i className="fa fa-twitter"></i></a>
                      </li>
                      <li><a href="#"><i className="fa fa-facebook"></i></a>
                      </li>
                      <li><a href="#"><i className="fa fa-linkedin"></i></a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      </section>
      <Footer/>
    </div>

    )
  }
});

module.exports = Landing;
