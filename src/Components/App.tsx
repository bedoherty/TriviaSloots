import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { auth0Client } from "src/Data/Auth";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthPage from "src/Components/AuthPage";
import ConstructionPage from "src/Components/ConstructionPage";
import MenuBar from "src/Components/MenuBar";
import QuestionsPage from "./Questions/QuestionsPage";

// Import our stylesheets
import "Styles/Global.less";

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MenuBar />
                <Container maxWidth="lg">
                    <Router>
                        <Route path="/auth" component={ AuthPage } />
                        <Route path="/questions" component={ QuestionsPage } />
                    </Router>
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