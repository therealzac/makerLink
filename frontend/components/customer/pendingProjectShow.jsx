var React = require('react');
var MD5 = require('md5');
var TagsInput = require('react-tagsinput');
var ApiUtil = require('../../util/apiUtil.js');
import { Calendar } from 'react-date-picker'

var PendingProjectShow = React.createClass({
  getInitialState: function () {
    return this.props;
  },

  componentDidMount: function () {
    var self = this;

    $(".pending-project-edit-title").on("blur", function () {
      $(this).addClass("hidden");
      self.saveProject();
      $(".pending-project-title").removeClass("hidden");
    }).keydown(function(e) { if (e.keyCode === 13) { $(this).blur() } });

    $(".pending-project-edit-link").on("blur", function () {
      self.renderScreenshot({gradient: 0});
      $(this).addClass("hidden");
      self.saveProject();
    }).keydown(function(e) { if (e.keyCode === 13) { $(this).blur() } });

    $(".pending-project-edit-description").on("blur", function () {
      self.saveProject();
    });
  },

  componentWillReceiveProps: function (newProps) {
    var self = this;

    if (newProps.project) {
      var screenshot = new Image();
      var onScreenshotLoad = function () {
        $('#loadingSpinner').hide();
        self.renderScreenshot({gradient: 0});
      }

      screenshot.addEventListener("load", onScreenshotLoad);
      this.renderScreenshot({gradient: 0.618034});

      if (newProps.project.screenshot_url) {
        $('#loadingSpinner').show();
        screenshot.src = newProps.project.screenshot_url;
      } else {
        $('#loadingSpinner').hide();
        this.renderScreenshotPlaceholder();

        if (this.state.project) { this.state.project.inspiration_link = "" };
      }

      if (this.state.project && this.state.project.id !== newProps.project.id) {
        this.state.project = {};
      }
    }

    this.setState(newProps);
  },

  renderScreenshot: function (options) {
    if (this.state.project) {
      $("#screenshot").css(
        "background",
        "linear-gradient( rgba(0, 0, 0, " +  options.gradient.toString() +
        "), rgba(0, 0, 0, " + (options.gradient * options.gradient).toString() +
        ") ), url(" + this.state.project.screenshot_url + ")"
      );

      $("#screenshot").css("background-size", "cover");
    }
  },

  renderScreenshotPlaceholder: function () {
    $("#screenshot").css(
      "background",
      "linear-gradient( rgba(0, 0, 0, 0.618), rgba(0, 0, 0, 1) ), url(http://" +
      "res.cloudinary.com/makerlink/image/upload/v1470192113/splash_uywhak.jpg)"
    );

    $("#screenshot").css("background-size", "cover");
  },

  focusTitle: function (e) {
    e.preventDefault();
    $(".pending-project-title").addClass("hidden");
    $(".pending-project-edit-title").removeClass("hidden").select();
  },

  focusLink: function (e) {
    e.preventDefault();
    $(".pending-project-edit-link").removeClass("hidden").select();
    this.renderScreenshot({gradient: 0.618034});
  },

  focusDescription: function (e) {
    e.preventDefault();
    $(".pending-project-edit-description").select();
  },

  updateProject: function (e) {
    this.state.project[e.target.id] = e.target.value;
    this.state.updated = true;
    this.setState(this.state);
  },

  saveProjectDate: function (date) {
    this.state.project.target_date = date;
    ApiUtil.updateProject(this.state.project);
  },

  saveProject: function (tags) {
    if (this.state.updated || tags) {
      if (tags) { this.state.project.tags = tags };
      ApiUtil.updateProject(this.state.project);
    }

    this.setState({updated: false});
  },

  renderLinkPlaceholder: function () {
    var appName = (this.state.project ? this.state.project.name : "your app");
    return "What site do you want " + appName + " to look like?";
  },

  renderTags: function () {
    if (this.state.project && this.state.project.tags) {
      var tagValues = this.state.project.tags.map(function (tag) {
        return tag.value;
      })

      return (
        <TagsInput value={tagValues} onChange={this.saveProject}/>
      )
    }
  },

  renderMainFeatures: function () {
    return this.state.project.features.map (function (feature) {
      return (
        <div className="pending-project-feature">
          { feature.value }
        </div>
      )
    });
  },

  render: function () {
    var project = this.state.project;

    return (
      <div className="pending-project-show">
        <div className="pending-project-title">
          { project ? project.name : "" }
          <strong onClick={this.focusTitle}>edit</strong>
        </div>
        <textarea
          value={ project ? project.name : "" }
          onChange={this.updateProject}
          id="name"
          placeholder="Your App Name"
          className="pending-project-edit-title hidden">
        </textarea>

        <div className="pending-project-tags">
          { this.renderTags() }
        </div>

        <h1 className="pending-project-header">
          Desired Aesthetic
          <strong onClick={this.focusLink}>edit</strong>
        </h1>

        <div className="pending-project-section" onClick={this.focusLink} id="screenshot">
          <textarea
            value={ project ? project.inspiration_link : "" }
            onChange={this.updateProject}
            id="inspiration_link"
            className="pending-project-edit-link hidden"
            placeholder={ this.renderLinkPlaceholder() }>
          </textarea>

          <div className="dots" id="loadingSpinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        	</div>
          <svg xmlns="http://www.w3.org/2000/svg" style={{display: "block"}} version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
            	</filter>
            </defs>
          </svg>
        </div>

        <h1 className="pending-project-header">
          Description
          <strong onClick={this.focusDescription}>edit</strong>
        </h1>

        <div className="pending-project-section">
          <textarea
            value={ project ? project.description : "" }
            onChange={this.updateProject}
            id="description"
            className="pending-project-edit-description">
          </textarea>
        </div>

        <div>
          <h1 className="pending-project-main-features-header">Main Features</h1>
          <div className="pending-project-main-features">
            { this.renderMainFeatures() }
          </div>

          <h1 className="pending-project-completion-date-header">Desired Completion Date</h1>
          <Calendar
            onChange={this.saveProjectDate}
            id="target_date"
            date={project ? project.target_date : null}
            className="pending-project-completion-date">
          </Calendar>
        </div>
      </div>
    )
  }
});


module.exports = PendingProjectShow;
