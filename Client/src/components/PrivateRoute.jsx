import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext)

    return (
        <Route 
            {...rest}
            render={(props) =>
                user ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    )
}

export default PrivateRoute