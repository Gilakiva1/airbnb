import React from "react";
import { Switch, Route } from 'react-router-dom';
import { AppHeader } from "./cmps/header/AppHeader";
import { AppFooter } from "./cmps/footer/AppFooter";
import routes from './routes.js'
import './assets/style/style.scss'
export class App extends React.Component {

    render() {
        return (
            <>
                <AppHeader />
                <main className="main-container">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
            </>

        )
    }

}