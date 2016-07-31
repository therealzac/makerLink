var React = require('react');
var Footer = require('./footer.jsx');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

import { Parallax, Background } from 'react-parallax';

var Landing = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

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

        function resiveDiv() {
          var vpw = $(window).width();
          var vph = $(window).height();
          $('.react-parallax').css({'height': vph + 'px'});
          $('.landing-about').css({'height': vph + 'px'});
        }

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
                resiveDiv()
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
          <img src="https://allowrypainting.files.wordpress.com/2013/08/paint-strokes_smaller.jpg"/>
        </Background>
        <p className="splash-header">COMING SOON.</p>
      </Parallax>
      <Footer/>
    </div>
    )
  }
});

module.exports = Landing;
