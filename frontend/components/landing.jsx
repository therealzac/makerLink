var React = require('react');
var Footer = require('./footer.jsx');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

import { Parallax, Background } from 'react-parallax';

var Landing = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { email: "" }
  },

  componentDidMount: function () {
    this.props.changeBackground("WHITE");
    var self = this;

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
                    changeHeaderOn = 100;
            function init() {
                window.addEventListener( 'scroll', function( event ) {
                    if( !didScroll ) {
                        didScroll = true;
                        setTimeout( scrollPage, 100 );
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
      <Parallax strength={400}>
        <Background>
          <img src="http://res.cloudinary.com/makerlink/image/upload/v1470192113/splash_uywhak.jpg"/>
        </Background>
        <p className="splash-header">COMING SOON.</p>
      </Parallax>
      <Footer/>
    </div>
    )
  }
});


// <form action="//makerlink.us13.list-manage.com/subscribe/post?u=93a48221804b21d185ce1d9e2&amp;id=4dfccf38a8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
//   <input type="text" id="mce-EMAIL" name="EMAIL" valueLink={this.linkState("email")} style={{position: "absolute", bottom: "35px", left: "10px", width: "300px"}}/>
//   <div className="hidden" aria-hidden="true"><input type="text" name="b_93a48221804b21d185ce1d9e2_4dfccf38a8" tabIndex="-1" value=""/></div>
//   <div className="clear"><input type="submit" className="mailchimp-button" value="KEEP ME POSTED" name="subscribe" id="mc-embedded-subscribe"/></div>
// </form>

module.exports = Landing;
