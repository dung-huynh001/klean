import { Suspense } from 'react';
import { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = MainLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {privateRoutes.map((route, index) => {
              const PrivatePage = route.component;
              let Layout = MainLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isAuthenticated ? (
                      <Layout>
                        <PrivatePage />
                      </Layout>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
