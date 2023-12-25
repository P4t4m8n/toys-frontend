import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Provider } from 'react-redux'


import { AppHeader } from "./cmps/AppHeader"
import { ToyIndex } from "./pages/ToyIndex"
import { ToyDetails } from "./pages/ToyDetails"
import { ToyEdit } from "./pages/ToyEdit"
import { AppFooter } from "./cmps/AppFooter"
import { Home } from "./pages/Home"
import { store } from './store/store.js'


export function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <section className="main-layout">
            <AppHeader />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
              <Route path="/toy/edit" element={<ToyEdit />} />
            </Routes>
            <AppFooter />
          </section>
        </Router>
      </Provider>
    </>
  )

}

