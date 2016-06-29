const React = require('react');

const Inbox = React.createClass({
  componentDidMount: function () {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
  },

  render: function () {
    return(
        <div className="wrapper wrapper-content">
        <div className="row">
            <div className="col-lg-3">
                <div className="ibox float-e-margins">
                    <div className="ibox-content mailbox-content">
                        <div className="file-manager">
                            <a className="btn btn-block btn-primary compose-mail">Compose Mail</a>
                            <div className="space-25"></div>
                            <h5>Folders</h5>
                            <ul className="folder-list m-b-md" style={{padding: "0"}}>
                                <li><a> <i className="fa fa-inbox "></i> Inbox <span className="label label-warning pull-right">{this.props.messages.unreadMessages.length}</span> </a></li>
                                <li><a> <i className="fa fa-envelope-o"></i> Send Mail</a></li>
                                <li><a> <i className="fa fa-file-text-o"></i> Drafts <span className="label label-danger pull-right">{this.props.messages.drafts.length}</span></a></li>
                                <li><a> <i className="fa fa-trash-o"></i> Trash</a></li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-9 animated fadeInRight">
            <div className="mail-box-header">

                <form method="get" action="index.html" className="pull-right mail-search">
                    <div className="input-group">
                        <input type="text" className="form-control input-sm" name="search" placeholder="Search email"/>
                        <div className="input-group-btn">
                            <button type="submit" className="btn btn-sm btn-primary">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
                <h2>
                    Inbox ({this.props.messages.unreadMessages.length})
                </h2>
                <div className="mail-tools tooltip-demo m-t-md">

                    <div className="btn-group pull-right">
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-left"></i></button>
                        <button className="btn btn-white btn-sm"><i className="fa fa-arrow-right"></i></button>
                    </div>

                    <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="left" title="Refresh inbox"><i className="fa fa-refresh"></i> Refresh</button>
                    <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as read"><i className="fa fa-eye"></i> </button>
                    <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Mark as important"><i className="fa fa-exclamation"></i> </button>
                    <button className="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="Move to trash"><i className="fa fa-trash-o"></i> </button>
                </div>
            </div>
                <div className="mail-box">

                <table className="table table-hover table-mail">
                <tbody>
                  {
                    this.props.messages.unreadMessages.forEach(function(message){
                      return (<tr className="unread">
                          <td className="check-mail">
                              <input type="checkbox" className="i-checks"/>
                          </td>
                          <td className="mail-ontact"><a>{message.author}</a></td>
                          <td className="mail-subject"><a>{message.body}</a></td>
                          <td className=""><i className="fa fa-paperclip"></i></td>
                          <td className="text-right mail-date">6.10 AM</td>
                        </tr>)
                      })
                }
                {
                  this.props.messages.unreadMessages.forEach(function(message){
                    return (<tr className="read">
                        <td className="check-mail">
                            <input type="checkbox" className="i-checks"/>
                        </td>
                        <td className="mail-ontact"><a>{message.author}</a> </td>
                        <td className="mail-subject"><a>{message.body}</a></td>
                        <td className=""></td>
                        <td className="text-right mail-date">Jan 16</td>
                    </tr>)
                    })
                }
                </tbody>
                </table>


                </div>
            </div>
        </div>
        </div>
    );
  }
});

module.exports = Inbox;
