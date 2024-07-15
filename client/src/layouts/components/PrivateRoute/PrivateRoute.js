import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const redirect = useNavigate();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Layout><Component {...props} /></Layout>
                ) : (
                    redirect("/login")
                )
            }
        />
    );
};

export default PrivateRoute;
