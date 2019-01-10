import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import fakeAuth from './../Login/fakeAuth';

const menus = [
    {
        name: "Ngân hàng đề thi",
        to: "/exam/all",
        exact: false
    }
]
class Profile extends Component {
    state = {
        id:'',
        FullName:''
    }
    Logout = () => {
        const { history } = this.props;
        window.sessionStorage.removeItem('user')
        fakeAuth.signout(() => history.push("/login"));
    }
    componentDidMount(){
        var name = JSON.parse(sessionStorage.getItem('user'));
        var FullName = name.LASTNAME + " " + name.FIRSTNAME;
        this.setState({
            id:name.IDUSER,
            FullName:FullName
        })
    }
    render() {
        const { FullName } = this.state;
        return (
            <li>
                <div className="profile">
                    <div className="profile-name">
                        <p><span><Link to={`/account/profile`}>{FullName}</Link> </span><span className="sign-out"><button onClick={this.Logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button></span> </p>
                    </div>
                </div>
            </li>
        )
    }
}
const AuthButton = withRouter(({ history }) =>
    fakeAuth.isAuthenticated === true ? (
        <Profile history={history} />
    ) : (
            <li>
                <Link to="/login">Sign in</Link>
            </li>
        )
);
const MenuLink = ({ Label, to, active }) => {
    return (
        <Route
            path={to}
            exact={active}
            children={({ match }) => (
                <li className={match ? 'active' : ''}>
                    <Link to={to}>{Label}</Link>
                </li>
            )}
        />
    )
}
class Menu extends Component {
    ShowMenu = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        Label={menu.name}
                        to={menu.to}
                        active={menu.exact}
                    />
                )
            })
        }
        return result;
    }
    render() {

        return (
            <div className="menu test-online">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 menu-logo">
                            <h3>Online test</h3>
                        </div>
                        <div className="col-md-8 menu-main">
                            <ul>
                                {this.ShowMenu(menus)}
                                <AuthButton />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Menu;