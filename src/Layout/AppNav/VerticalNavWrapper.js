import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav, VideosNav} from './NavItems';

class Nav extends Component {

    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Videos</h5>
                <MetisMenu content={VideosNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>

                <h5 className="app-sidebar__heading">NFT</h5>
                <div className="metismenu vertical-nav-menu">
                    <ul className="metismenu-container">
                        <li className="metismenu-item">
                            <a className="metismenu-link" href="#/dashboards/nft">
                                <i className="metismenu-icon pe-7s-diamond"></i>
                                Gear
                            </a>
                        </li>
                    </ul>
                </div>
                <h5 className="app-sidebar__heading">Marketplace</h5>
                <div className="metismenu vertical-nav-menu">
                    <ul className="metismenu-container">
                        <li className="metismenu-item">
                            <a className="metismenu-link" href="#/dashboards/marketplace">
                                <i className="metismenu-icon pe-7s-graph2"></i>
                                Marketplace
                            </a>
                        </li>
                    </ul>
                </div>
                <h5 className="app-sidebar__heading">Profile</h5>
                <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);