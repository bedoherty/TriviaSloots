import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { auth0Client } from "src/Data/Auth";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { IUser } from "src/Data/Interfaces/User";
import { getActiveUser } from "src/Data/Selectors/User";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { logoutUser } from "src/Data/Actions/User";
import { Menu, MenuItem } from "@material-ui/core";

interface IMenuBarProps {
    user: IUser;
    logout: () => void;
}

const mapStateToProps = (state) => {
    return {
        user: getActiveUser(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutUser())
    }
}

class MenuBar extends React.Component<IMenuBarProps> {
    avatarRef: React.RefObject<any>;

    constructor(props: IMenuBarProps) {
        super(props);
        this.avatarRef = React.createRef();
    }

    render() {
        return (
            <AppBar className="main-menu" position="static">
                <div className="left-section">
                    <Typography variant="h4" className="title-header">
                        Trivia Sloots
                    </Typography>
                </div>
                <div className="right-section">
                    { this.renderUserAvatar() }
                    { /* this.renderMenu() */ }
                </div>
            </AppBar>
        )
    }

    renderUserAvatar = () => {
        const { user } = this.props;

        if (!user) {
            return (
                <Avatar onClick={ this.handleLoginClick } ref={ this.avatarRef } />
            );
        }

        return (
            <Avatar onClick={ this.handleLogoutClick } ref={ this.avatarRef } alt={ user.nickname } src={ user.picture } />
        )
    }

    renderMenu = () => {
        const { user } = this.props;

        if (!user) {
            return (
                <Menu
                    id="user-menu"
                    anchorEl={ this.avatarRef.current }
                    keepMounted
                    open={ Boolean(this.avatarRef.current) }>
                        <MenuItem onClick={ this.handleLoginClick }>Login</MenuItem>
                </Menu>
            );
        }

        return (
            <Menu
                id="user-menu"
                anchorEl={ this.avatarRef.current }
                keepMounted
                open={ Boolean(this.avatarRef.current) }>
                    <MenuItem onClick={ this.handleLogoutClick }>Logout</MenuItem>
            </Menu>
        );
    }

    handleLogoutClick = () => {
        const { logout } = this.props;
        logout();
        document.location.href = "/";
    }

    handleLoginClick = () => {
        auth0Client.then((client: Auth0Client) => {
            client.loginWithRedirect({
                audience: "https://triviasloots.com",
                
            });
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);