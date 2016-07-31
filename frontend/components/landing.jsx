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
      <div className="splash-background">
        <p className="splash-header">COMING SOON.</p>
      </div>
      <Footer/>
    </div>
    )
  }
});

module.exports = Landing;
