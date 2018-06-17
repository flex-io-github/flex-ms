import React from "react"
import * as ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"
import { Route } from "react-router-dom"
import { Switch } from "react-router"
// import { PrivateRoute } from "../../components/common/private_route"
// tslint:disable:no-import-side-effect
// side-effect imports here

// tslint:enable:no-import-side-effect

import { App } from "./components/App/app"
import { store, browserHistory } from "./store"
import { AppState } from "./components/App/AppState"
import _ from "lodash"
import { initializeIcons } from "@uifabric/icons"
// import pageShell from "./components/common/page_shell"
import login_page from "./pages/login"
import { PrivateRoute } from "./components/common/private_route"
// Register icons and pull the fonts from the default SharePoint cdn.
initializeIcons()

const renderRoot = (app: JSX.Element) => {
    ReactDOM.render(app, document.getElementById("root"))
}

if (process.env.NODE_ENV === "production") {
    renderRoot(
        <App>
            <Provider store={store}>
                <ConnectedRouter history={browserHistory}>
                    <Switch>{/* { _getAppRoutes() } */}</Switch>
                </ConnectedRouter>
            </Provider>
        </App>,
    )
} else {
    // removed in production, hot-reload config
    // tslint:disable-next-line:no-var-requires
    const AppContainer = require("react-hot-loader").AppContainer
    renderRoot(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={browserHistory}>
                    <Switch>
                        <Route
                            exact={true}
                            path="/login"
                            component={login_page}
                        />
                        <App>{_getAppRoutes()}</App>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
    )

    if (module.hot) {
        // app
        module.hot.accept("./components/App/app", async () => {
            // const NextApp = require('./app').App;

            const NextApp = (await System.import("./components/App/app")).App
            renderRoot(
                <AppContainer>
                    <Provider store={store}>
                        <ConnectedRouter history={browserHistory}>
                            <NextApp>
                                {/* <Switch>{_getAppRoutes()}</Switch> */}
                            </NextApp>
                        </ConnectedRouter>
                    </Provider>
                </AppContainer>,
            )
        })

        // reducers
        module.hot.accept("./features/root-reducer", () => {
            const newRootReducer = require("./features/root-reducer").default
            store.replaceReducer(newRootReducer)
        })
    }
}

function _createRoutes(pages: {}[]): {}[] {
    let routes: any = []

    // tslint:disable-next-line:no-any
    pages.forEach((page: any, pageIndex: number) => {
        if (page.component) {
            routes.push(
                <PrivateRoute
                    exact={page.isExactPath}
                    key={page.key}
                    path={page.url}
                    component={page.component}
                />,
            )
        }
        if (page.pages) {
            routes = routes.concat(_createRoutes(page.pages))
        }
        if (page.links) {
            routes = routes.concat(_createRoutes(page.links))
        }
    })

    return routes
}

function _getAppRoutes() {
    let routes: any = []

    //   AppState.pages.forEach((page: any, pageIndex: number) => {
    //     routes.push(_createRoutes(page))
    //   })
    routes = _createRoutes(AppState.pages)

    // Add the default route
    // routes.push(
    //   <Route key='home' component={ HomePage } />
    // );
    return routes
}
