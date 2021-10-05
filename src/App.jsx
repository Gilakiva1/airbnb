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

class _App extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            window.scrollTo(0, 0)
        }
    }


    render() {
        const { pathname } = this.props.history.location

        return (
            < >

<<<<<<< HEAD
                <AppHeader />
                <main className={`${pathname === '/' || pathname === '/stay' || pathname === '/host' ? 'main-container-home' : 'main-container'}`}>
=======
            <AppHeader />
                <main className={`${pathname === '/' || pathname === '/stay' ||pathname === '/host' ? 'main-container-home' : 'main-container'}`}>
>>>>>>> 3143045dfbcff9810ca029c63992ec8f66d0ac7b
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <AppFooter />
            </>
        )
    }
}
export const App = withRouter(_App)