import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { PrivateRoute } from "./layouts/components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = MainLayout;

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout><Page /></Layout>
                }>
              </Route>)
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = MainLayout;

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <PrivateRoute
                key={index}
                path="/dashboard"
                component={Page} layout={Layout}
              />)
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
