/**
 * Created by lukers on 08.05.17.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Template from './Components/Template.jsx'
import Main from './Components/Main.jsx'
import Products from './Components/Products.jsx'

import {Route, Router, IndexRoute, hashHistory} from 'react-router'

require("../scss/main.scss")
addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path='/' component={Template}>
                <IndexRoute component={Main} />
                <Route path='/products' component={Products} />
                {/*<Route path='/product/:id' component={Product} />*/}
                {/*<Route path='/cart/:id' component={Cart} />*/}
                {/*<Route path='/orders' component={Orders} />*/}
                {/*<Route path='/order/:id' component={Order} />*/}
                {/*<Route path='/contact' component={Contact} />*/}
                {/*<Route path='*' component={NotFound} />*/}
            </Route>
        </Router>,
        document.getElementById("app")
    )
});