import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import configureStore from "./utils/store"
import { CometChat } from "@cometchat-pro/chat"
import { COMETCHAT_CONSTANTS } from './consts';
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import "react-rangeslider/lib/index.css"

const store = configureStore()
const queryClient = new QueryClient()

var appID = COMETCHAT_CONSTANTS.APP_ID;
var region = COMETCHAT_CONSTANTS.REGION;
var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(() => {

  if (CometChat.setSource) {
    CometChat.setSource("ui-kit", "web", "reactjs");
  }
  console.log("Initialization completed successfully");
  ReactDOM.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />{" "}
      </QueryClientProvider>
    </Provider>,
    document.getElementById("root")
  );
},
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
