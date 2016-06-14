var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var apiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');
var Footer = require('./footer.jsx');


var SubmissionForm = React.createClass({
  contextTypes: { router: React.PropTypes.object.isRequired },

  mixins: [LinkedStateMixin],

  getInitialState: function (){
    const session = SessionStore.getSession();
    const author_id = session.user ? session.user.id : null;

    if (!author_id) {
      this.context.router.push('/login');
    }

    return {
      name: "",
      pitch: "",
      description: "",
      url: "",
      expiration_date: "",
      author_id: author_id
    }

  },

  componentDidMount: function () {
        const self = this;

        this.props.changeBackground("WHITE");
        this.sessionListener = SessionStore.addListener(this._onChange);
        $("#wizard").steps();
        $("#form").steps({
            bodyTag: "fieldset",
            onStepChanging: function (event, currentIndex, newIndex)
            {
                // Always allow going backward even if the current step contains invalid fields!
                if (currentIndex > newIndex)
                {
                    return true;
                }

                // Forbid suppressing "Warning" step if the user is to young
                if (newIndex === 3 && Number($("#age").val()) < 18)
                {
                    return false;
                }

                var form = $(this);

                // Clean up if user went backward before
                if (currentIndex < newIndex)
                {
                    // To remove error styles
                    $(".body:eq(" + newIndex + ") label.error", form).remove();
                    $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
                }

                // Disable validation on fields that are disabled or hidden.
                form.validate().settings.ignore = ":disabled,:hidden";

                // Start validation; Prevent going forward if false
                return form.valid();
            },
            onStepChanged: function (event, currentIndex, priorIndex)
            {
                // Suppress (skip) "Warning" step if the user is old enough.
                if (currentIndex === 2 && Number($("#age").val()) >= 18)
                {
                    $(this).steps("next");
                }

                // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
                if (currentIndex === 2 && priorIndex === 3)
                {
                    $(this).steps("previous");
                }
            },
            onFinishing: function (event, currentIndex)
            {
                var form = $(this);

                // Disable validation on fields that are disabled.
                // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
                form.validate().settings.ignore = ":disabled";

                // Start validation; Prevent form submission if false

                return form.valid();
            },
            onFinished: function (event, currentIndex)
            {

                var form = $(this);

                // Submit form input
                apiUtil.createProject(self.state, this.goToDashboard);

            }
        }).validate({
                    errorPlacement: function (error, element)
                    {
                        element.before(error);
                    },
                    rules: {
                        confirm: {
                            equalTo: "#password"
                        }
                    }
                });

  },

  _onChange: function() {
    const session = SessionStore.getSession();

    if (session.user.id) {
      this.setState({author_id: session.user.id})
      this.context.router.push('/dashboard');

    }
  },

  goToDashboard: function () {
    this.context.router.push('/dashboard');
  },

  componentWillUnmount: function() {
    this.sessionListener.remove();
  },

  render: function () {
    return (
      <div id="wrapper">

                  <div className="ibox-content">
                              <h2>
                                  Idea Submission Form
                              </h2>
                              <p>
                                  Please complete the following steps to submit your idea.
                              </p>

                              <form id="form" action="#" className="wizard-big">
                                  <h1>Name and URL</h1>
                                  <fieldset>
                                      <h2>What is the name of your project?</h2>
                                      <div className="row">
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label>Name:</label>
                                                  <input name="project[name]" valueLink={this.linkState("name")} type="text" className="form-control required"/>
                                              </div>

                                              <div className="form-group">
                                                  <label>Enter URL associated with your project (if you have one):</label>
                                                  <input name="project[url]" valueLink={this.linkState("url")} type="text" className="form-control"/>
                                              </div>

                                          <div className="col-lg-4">
                                              <div className="text-center">
                                                  <div style={{marginTop: "20px"}}>
                                                      <i className="fa fa-sign-in" style={{fontSize: "180px", color: "#e5e5e5"}}></i>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                  </fieldset>
                          <h1>Category</h1>
        <fieldset>
          <h2>What type of project do you wish to make?</h2>
          <style type="text/css" dangerouslySetInnerHTML={{__html: "\n#cat label{\nfloat:left;\nwidth: 170px;\nheight: 50px;\n}\n" }} />
          <div id="cat">
            <label><input type="checkbox" name="option3" defaultValue="Books" /> Books</label>
            <label><input type="checkbox" name="option3" defaultValue="Business" /> Business</label>
            <label><input type="checkbox" name="option3" defaultValue="Catalogs" /> Catalogs</label>
            <label><input type="checkbox" name="option3" defaultValue="Education" /> Education</label>
            <label><input type="checkbox" name="option3" defaultValue="Entertainment" /> Entertainment</label>
            <label><input type="checkbox" name="option3" defaultValue="Finance" /> Finance</label>
            <label><input type="checkbox" name="option3" defaultValue="Food and Drink" /> Food and Drink</label>
            <label><input type="checkbox" name="option3" defaultValue="Games" /> Games</label>
            <label><input type="checkbox" name="option3" defaultValue="Health and Fitness" /> Health and Fitness</label>
            <label><input type="checkbox" name="option3" defaultValue="Kids" /> Kids</label>
            <label><input type="checkbox" name="option3" defaultValue="Lifestyle" /> Lifestyle</label>
            <label><input type="checkbox" name="option3" defaultValue="Magazines and Newspaper" /> Magazines and Newspaper</label>
            <label><input type="checkbox" name="option3" defaultValue="Medical" /> Medical</label>
            <label><input type="checkbox" name="option3" defaultValue="Music" /> Music</label>
            <label><input type="checkbox" name="option3" defaultValue="Navigation" /> Navigation</label>
            <label><input type="checkbox" name="option3" defaultValue="News" /> News</label>
            <label><input type="checkbox" name="option3" defaultValue="Photo and Video" /> Photo and Video</label>
            <label><input type="checkbox" name="option3" defaultValue="Productivity" /> Productivity</label>
            <label><input type="checkbox" name="option3" defaultValue="Reference" /> Reference</label>
            <label><input type="checkbox" name="option3" defaultValue="Shopping" /> Shopping</label>
            <label><input type="checkbox" name="option3" defaultValue="Social Networking" /> Social Networking</label>
            <label><input type="checkbox" name="option3" defaultValue="Sports" /> Sports</label>
            <label><input type="checkbox" name="option3" defaultValue="Travel" /> Travel</label>
            <label><input type="checkbox" name="option3" defaultValue="Utilities" /> Utilities</label>
            <label><input type="checkbox" name="option3" defaultValue="Weather" /> Weather</label>


          </div>
        </fieldset>
                                  <h1>The Elevator Pitch</h1>
                                  <fieldset>
                                      <h2>Describe your idea in 140 characters or less.</h2>
                                      <div className="row">
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label>Elevator Pitch:</label>
                                                  <textarea rows="2" cols="70" id="name" name="project[pitch]" valueLink={this.linkState("pitch")} type="text" className="form-control required">
                                                  </textarea>
                                              </div>
                                            </div>
                                          </div>
                                  </fieldset>

                                  <h1>Description</h1>
                                  <fieldset>
                                      <h2>Describe your idea in-depth and expand on the different elements of your pitch.</h2>
                                      <div className="row">
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label>Project Description:</label>
                                                  <textarea rows="13" cols="100" id="name" name="project[description]" valueLink={this.linkState("description")} stype="text" className="form-control required" style={{height: "200px"}}>
                                                  </textarea>
                                              </div>
                                            </div>
                                          </div>
                                  </fieldset>
                                  <h1>Desired Completion Date</h1>
                                  <fieldset>
                                      <h2>When would you like this project finished by?</h2>
                                      <div className="row">
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label>Date:</label>
                                                  <input name="project[CompletionDate]" valueLink={this.linkState("expiration_date")} type="date" className="form-control required"/>

                                              </div>
                                            </div>
                                          </div>
                                  </fieldset>
                                  <h1>Finish</h1>
                                  <fieldset>
                                      <h2>Terms and Conditions</h2>
                                      <input id="acceptTerms" name="acceptTerms" type="checkbox" className="required"/> <label>I agree with the Terms and Conditions.</label>
                                  </fieldset>

                              </form>

                          </div>
                          <Footer/>
                      </div>
    )
  }
});

module.exports = SubmissionForm;
