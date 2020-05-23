import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// Import our stylesheets
import "Styles/Global.less";
import { auth0Client } from "src/Data/Auth";
import { Auth0Client } from "@auth0/auth0-spa-js";

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <AppBar position="static">
                    <Typography variant="h6" className="title-header">
                        Trivia Sloots
                    </Typography>
                    <div className="menu-right">
                        <div className="login-button" onClick={ this.handleLoginClick }>Login</div>
                    </div>
                </AppBar>
                <Container maxWidth="lg">
                    <img className="construction-image" src="https://media.giphy.com/media/S5JSwmQYHOGMo/200.gif" />
                </Container>
            </React.Fragment>
        )
    }

    handleLoginClick = () => {
        auth0Client.then((client: Auth0Client) => {
            client.loginWithRedirect();
        })
    }
}