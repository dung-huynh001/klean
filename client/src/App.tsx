import { Suspense } from 'react';
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import AuthGuard from './layouts/components/AuthGuard/AuthGuard';
import MainLayout from "./layouts/MainLayout";

function App() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout: any = MainLayout;

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
              const Page = route.component;
              let Layout: any = MainLayout;

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
                    <AuthGuard>
                      <Layout>
                        <Page />
                      </Layout>
                    </AuthGuard>
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
