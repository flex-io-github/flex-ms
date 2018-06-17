import * as React from "react"

// import { initializeIcons } from "@uifabric/icons"

import { Fabric, LayerHost } from "office-ui-fabric-react"
import "./style/App.scss"
import { AppNav } from "./AppNav"
import { AppHeader } from "./AppHeader"
import { loadTheme } from "@uifabric/styling"

// ...or, register icons and pull the fonts from your own cdn:
// initializeIcons('https://my.cdn.com/path/to/icons/');
const c_medium = {
    fontSize: 12,
    fontFamily:
        "Segoe UI WestEuropean, Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif",
}

loadTheme({
    fonts: {
        medium: c_medium,
        tiny: c_medium,
        xSmall: c_medium,
        small: c_medium,
        smallPlus: c_medium,
        mediumPlus: c_medium,
        large: c_medium,
        xLarge: c_medium,
        xxLarge: c_medium,
        superLarge: c_medium,
        mega: c_medium,
    },
})

export class App extends React.Component<{}, {}> {
    render() {
        const { children } = this.props
        return (
            <Fabric className="App">
                <AppHeader className="app-header" />
                <div className="app-content-container">
                    <div className="app-content">
                        <AppNav className="app-content-left-nav" />

                        <div className="app-content-route">{children}</div>
                    </div>


                </div>
            </Fabric>
        )
    }
}

// const mapStateToProps = (state: RootState) => ({})

// export default withRouter(connect(mapStateToProps, {})(App) as any)
