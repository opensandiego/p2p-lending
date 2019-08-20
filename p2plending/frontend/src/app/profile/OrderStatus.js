/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import LentSection from "./LentSection";
import LoansSection from "./LoansSection";
import RequestsSection from "./RequestsSection";
import { Redirect } from "react-router-dom";
import Tab from "../../components/Tab";

const TABS = {
  LENT: "lents",
  LOANS: "loans",
  REQUESTED: "requested",
};

class OrderStatus extends Component {
  state = {
    user: {},
    activeTab: TABS.REQUESTED,
    isError: false,
  };

  UNSAFE_componentWillUpdate(nextProps) {
    const { params } = nextProps.match;
    if (nextProps.match !== this.props.match) {
      if (params.tabName && params.tabName.length > 0) {
        this.setState({ activeTab: params.tabName });
      }
    }
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { params } = this.props.match;
    if (params.tabName && params.tabName.length > 0) {
      this.setState({ activeTab: params.tabName });
    }
  }

  onTabSelect = value => {
    const { username } = this.props.match.params;
    this.props.history.push(`/${username}/${value}`);
    this.setState({ activeTab: value });
  };
  
  onGoTo = () => this.props.history.push("/settings/profile");

  render() {
    const { user } = this.props;
    const { activeTab, isRedirect } = this.state;

    console.log("User Props in Order Status")
    console.log(user)

    if (isRedirect) {
      return <Redirect to="/" />;
    }

    return (

      <div>
        <div
          className="profile-header pt-4 pb-4"
          style={{ background: "#f9f9f9", borderBottom: "1px solid #e8e8e8" }}
        >
          <div className="container container--full">
            <div className="d-flex flex-column-reverse flex-lg-row justify-content-between align-items-lg-center">
              <div className="d-flex align-items-center">
                <div className="row">
                  <div className="col-sm">
                    <h1 className="m-0">{user.name}</h1>
                    {user.username && <h6 className="text-muted m-0">@{user.username}</h6>}
                  </div>
                  <div className="col-sm">
                    <button
                      onClick={this.onGoTo}
                      className="btn btn-sm btn-white text-uppercase d-flex align-items-center px-3 mt-2"
                    >
                      <small className="font-weight-medium">Edit Profile</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="container-fluid">
            <div className="row d-flex d-md-block flex-nowrap wrapper">
              <div className="col-md-3 float-left col-1 pl-0 pr-0 collapse width show" id="sidebar">
                <div className="list-group border-0 card text-center text-md-left">
                 
                  <a href="#" onClick={() => this.onTabSelect(TABS.REQUESTED)}  className="list-group-item d-inline-block collapsed">
                    <i className="sidebar-icon fa fa-book"></i>
                    <span className="d-none d-md-inline"> 
                      <div style={{ background: "", border: "" }}>
                        <Tab active={activeTab === TABS.REQUESTED}>
                          Requested ({user.active_requests})
                        </Tab>
                      </div>
                    </span>
                  </a>

                  <a href="#" onClick={() => this.onTabSelect(TABS.LOANS)} className="list-group-item d-inline-block collapsed">
                    <i className="sidebar-icon fa fa-book-open"></i> 
                    <span className="d-none d-md-inline">
                      <div style={{ background: "", border: "" }}>
                        <Tab  active={activeTab === TABS.LOANS}>
                          Loaned ({user.active_loans})
                        </Tab>
                      </div>
                    </span>
                  </a>

                  <a href="#" onClick={() => this.onTabSelect(TABS.LENT)} className="list-group-item d-inline-block collapsed">
                    <i className="sidebar-icon fa fa-gift"></i> 
                    <span className="d-none d-md-inline">
                      <div style={{ background: "", border: "" }}>
                        <Tab  active={activeTab === TABS.LENT}>
                          Lent ({user.lender_items.length})
                        </Tab>
                      </div>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <main className="col-md-9 float-left col px-5 pl-md-2 pt-2 main">
              {activeTab === TABS.REQUESTED && (
                <RequestsSection
                />
              )}

              {activeTab === TABS.LOANS && (
                <LoansSection
                />
              )}

              {activeTab === TABS.LENT && (
                <LentSection
                  lender_items={user.lender_items}
                  is_lender={user.is_lender}
                />
              )}   
            </main>
          </div>
      </div>
    );
  }
}

export default OrderStatus;
