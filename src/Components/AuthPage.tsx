import * as React from "react";
import { auth0Client } from "src/Data/Auth";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { IUser } from "src/Data/Interfaces/User";
import { loginUser as loginUserAction } from "src/Data/Actions/User";
import { connect } from "react-redux";

interface IAuthPageProps {
    loginUser: (user: IUser, token: string) => void;
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user: IUser, token: string) => dispatch(loginUserAction({ user, token }))
    }
}

class AuthPage extends React.Component<IAuthPageProps> {
    render() {
        return (
            <div>Authin</div>
        )
    }

    componentDidMount() {
        const { loginUser } = this.props;

        auth0Client.then((client: Auth0Client) => {
            client.handleRedirectCallback().then(() => {
                client.getTokenSilently().then((token: string) => {
                    client.getUser().then((user: IUser) => {
                        loginUser(user, token);
                        document.location.href = "/questions";
                    })
                });
            });
        });
    }
}

export default connect(null, mapDispatchToProps)(AuthPage);