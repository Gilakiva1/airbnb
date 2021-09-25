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
<<<<<<< HEAD
                <main className="main-container">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
=======
                <Switch>
                    {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                </Switch>
>>>>>>> 4158498559a8e78a0163fae66eb0d83042c10c97
                <AppFooter />
            </>

        )
    }

}