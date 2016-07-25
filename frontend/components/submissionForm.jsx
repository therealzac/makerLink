var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var apiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');
var Footer = require('./footer.jsx');
var TagsInput = require('react-tagsinput');


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
        description: "",
        tags: [],
        inspiration_links: "",
        youtube_link: "",
        involvement_level: 0,
        author_id: author_id,
        url: ""
    }

  },

  componentDidMount: function () {
        this.props.changeBackground("WHITE");
        this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function() {
    const session = SessionStore.getSession();

    if (session.user.id) {
        this.setState({author_id: session.user.id});
        this.context.router.push('/dashboard');
    }
  },

  goToDashboard: function () {
    this.context.router.push('/dashboard');
  },

  componentWillUnmount: function() {
    this.sessionListener.remove();
  },
  tagsChange: function(tags) {
      this.setState({tags})
  },
  createProject: function() {
      apiUtil.createProject(this.state);
  },

  render: function () {
    return (
      <div id="wrapper">
          <div className="ibox-content">
            <div>
                <input valueLink={this.linkState("name")} type="text" className="name-input"></input>
            </div>
              <div>
                  <input valueLink={this.linkState("description")} type="text" className="description-input"></input>
              </div>
              <div>
                  <TagsInput value={this.state.tags} onChange={this.tagsChange} />
              </div>
              <div>
                  <input valueLink={this.linkState("inspiration_links")} type="textarea" className="inspiration-input"></input>
              </div>
              <div>
                  <select valueLink={this.linkState("involvement_level")} className="involvement-level">
                      <option value="0">Not involved at all</option>
                      <option value="1">A little involved</option>
                      <option value="2">Very Involved</option>
                  </select>
              </div>
          </div>
            <div>
                <button type="submit" onClick={this.createProject}>Submit</button>
            </div>
            <Footer/>
      </div>
    )
  }
});

module.exports = SubmissionForm;
