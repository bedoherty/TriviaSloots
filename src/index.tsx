import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "src/Data/Redux";
import App from "src/Components/App";

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor } >
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);