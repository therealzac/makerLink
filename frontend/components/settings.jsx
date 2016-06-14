var React = require('react');

var Profile = React.createClass({
    render: function () {
        return (            <div>
        <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>Profile</h2>
                    <ol className="breadcrumb">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <a>Extra Pages</a>
                        </li>
                        <li className="active">
                            <strong>Profile</strong>
                        </li>
                    </ol>
                </div>
                <div className="col-lg-2">

                </div>
            </div>
        <div className="wrapper wrapper-content animated fadeInRight">


            <div className="row m-b-lg m-t-lg">
                <div className="col-md-6">

                    <div className="profile-image">
                        <img src="img/a4.jpg" className="img-circle circle-border m-b-md" alt="profile"/>
                    </div>
                    <div className="profile-info">
                        <div className="">
                            <div>
                                <h2 className="no-margins">
                                    Alex Smith
                                </h2>
                                <h4>Founder of Groupeq</h4>


                            <p className="small font-bold">
                                <span><i className="fa fa-circle text-navy"></i> Online status</span>
                                </p>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <table className="table small m-b-xs">
                        <tbody>
                        <tr>
                            <td>
                                <strong>142</strong> Projects
                            </td>
                            <td>
                                <strong>22</strong> Followers
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <strong>61</strong> Comments
                            </td>
                            <td>
                                <strong>54</strong> Articles
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>154</strong> Tags
                            </td>
                            <td>
                                <strong>32</strong> Friends
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>


            </div>
            <div className="row">
 <div className="ibox whatever">
                        <div className="ibox-content">
                            <h3>Background</h3>
                            <p className="small">
                                There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered alteration in some form, by injected humour, or randomised words which don't.

                                If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                                anything embarrassing
                            </p>
                        </div>
                <div className="ibox col-lg-3 ">

                    <div className="ibox" style={{padding: '30px'}}>

                        <div className="ibox-content">
                                <h3>Interests</h3>

                            <p className="small">
                                There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered alteration in some form, by injected humour, or randomised words which don't.


                                If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                                anything embarrassing
                            </p>

                        </div>
                    </div>

                    <div className="ibox amd">
                        <div className="ibox-content">
                            <h3>Followers and friends</h3>
                            <p className="small">
                                If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                                anything embarrassing
                            </p>
                            <div className="user-friends">
                                <a href=""><img alt="image" className="img-circle" src="img/a3.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a1.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a2.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a4.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a5.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a6.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a7.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a8.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a2.jpg"/></a>
                                <a href=""><img alt="image" className="img-circle" src="img/a1.jpg"/></a>


                            </div>
                        </div>
                    </div>


                </div>

                <div className="col-lg-9">

                    <div className="social-feed-box">

                        <div className="pull-right social-action dropdown">
                            <button data-toggle="dropdown" className="dropdown-toggle btn-white">
                                <i className="fa fa-angle-down"></i>
                            </button>
                            <ul className="dropdown-menu m-t-xs">
                                <li><a href="#">Edit</a></li>
                            </ul>
                        </div>
                        <div className="social-avatar" style={{padding: '20px'}}>

                            <div className="media-body">

                                              <h3>My Skills</h3>
                                               <h5>Web Design</h5>
   <div className="progress progress-striped active m-b-sm">
                                                <div style={{width: '60%'}} className="progress-bar"></div>
                                            </div>

 <h5>Web Design</h5>
   <div className="progress progress-striped active m-b-sm">
                                                <div style={{width: '60%'}} className="progress-bar"></div>
                                            </div>
 <h5>Web Design</h5>
   <div className="progress progress-striped active m-b-sm">
                                                <div style={{width: '60%'}} className="progress-bar"></div>
                                            </div>
 <h5>Web Design</h5>
   <div className="progress progress-striped active m-b-sm">
                                                <div style={{width: '60%'}} className="progress-bar"></div>
                                            </div> </div></div></div></div></div></div></div></div>)
    }

})

module.exports = Profile;
