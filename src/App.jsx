import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom"
import { Provider } from 'react-redux'
import './assets/style/main.css'
import './services/i18n.service';


import { AppHeader } from "./cmps/AppHeader"
import { ToyIndex } from "./pages/ToyIndex"
import { ToyDetails } from "./pages/ToyDetails"
import { ToyEdit } from "./pages/ToyEdit"
import { AppFooter } from "./cmps/AppFooter"
import { Home } from "./pages/Home"
import { store } from './store/store.js'
import { Dashboard } from "./pages/Dashboard.jsx"
import { About } from "./pages/About.jsx"
import { UserProfile } from "./pages/UserProfile.jsx";

export function App() {



  return (

    <Provider store={store}>
      <Router >
        <section className="main-layout">
          <AppHeader />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/toy/" element={<ToyIndex />}>
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
              <Route path="/toy/edit" element={<ToyEdit />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/:userId" element={<UserProfile />} />
          </Routes>

          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>

  )

}

