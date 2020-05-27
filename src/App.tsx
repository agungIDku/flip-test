import React from 'react'

// STORE
import {BrowserRouter , Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from '@/store/StoreContainer'

// ROUTES
import routes from '@/routes'

// React Helmet
import {Helmet} from 'react-helmet'

// Layout
import MainLayout from '@/views/layouts/MainLayout'

// Main CSS
import '@/assets/css/main.css'

function App(){
  return(
      <Provider store={configureStore()}>
          <BrowserRouter>
              <Switch>
                {routes.map((route : any,i:any)=>(
                    <Route
                    key={i}
                    path={route.path}
                    exact={route.exact}
                    render={(props : object) => (
                        <>
                          <Helmet>
                              <meta charSet="utf-8" />
                              <title>{`${route.title} - Flip`}</title>
                          </Helmet>
                          <MainLayout Container={route.container} />
                        </>
                    )}
                    />
                ))}
              </Switch>
          </BrowserRouter>
      </Provider>
  )
}

export default App
