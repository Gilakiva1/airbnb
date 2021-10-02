import React from "react";
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { AppHeader } from "./cmps/header/AppHeader";
import { AppFooter } from "./cmps/footer/AppFooter";
import routes from './routes.js'
import './assets/style/style.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class _App extends React.Component {

    render() {
        const { pathname } = this.props.history.location

        return (
            < >
        
                <AppHeader />
                <main className={`${pathname === '/' ? 'main-container home' : 'main-container'}`}>
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
            </>
        )
    }
}
export const App = connect()(withRouter(_App))