import React from 'react';
import { Route, Navigate } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, isLoggedIn, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Navigate to="/Owner-Home" replace />
          )
        }
      />
    );
  }
}

export default PrivateRoute;