import React from "react";
import { Switch, Route } from 'react-router';
import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";
import routes from './routes.js'
import './assets/style/style.scss'
export class App extends React.Component {

    render() {
        return (

            <>
                <AppHeader />
                <Switch>
                    {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                </Switch>
                <AppFooter />
            </>

        )
    }

}