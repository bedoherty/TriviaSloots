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
                </div>
            </AppBar>
        )
    }

    renderUserAvatar = () => {
        const { user } = this.props;

        if (!user) {
            return (
                <div className="login-button" onClick={ this.handleLoginClick }>Login</div>
            );
        }

        return (
            <Avatar onClick={ this.handleLogoutClick } alt={ user.nickname } src={ user.picture } />
        )
    }

    handleLogoutClick = () => {
        /* auth0Client.then((client: Auth0Client) => {
            client.logout();
        }); */
        const { logout } = this.props;
        logout();
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