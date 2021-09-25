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
                <Switch>
                    {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                </Switch>
=======
                <main className="main-container">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
>>>>>>> 1dbae5611361d635e6170bf65d4cb6a5960a129e
                <AppFooter />
            </>

        )
    }

}