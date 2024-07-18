import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Layout><Component {...props} /></Layout>
                ) : (
                    navigate("/login")
                )
            }
        />
    );
};

export default PrivateRoute;
