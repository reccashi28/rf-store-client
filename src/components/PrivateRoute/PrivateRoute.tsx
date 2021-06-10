import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Route, useLocation, useHistory, RouteProps} from 'react-router-dom'
import { AppState } from '../../types';

export type PrivateRouteProps = {
     path: string
} & RouteProps;

export default function PrivateRoute( {component, ...rest}: any) {
    const history = useHistory();
    const { role, isSignedIn } = useSelector( (state: AppState) => state.user)
    console.log(isSignedIn, "is user signedin in protected route")
    const routeComponent = (props: any) => {
        if(isSignedIn) {
    console.log(isSignedIn, "222 is user signedin in protected route")

            return React.createElement(component, props)
        }
        return history.push('/signin')
        // isSignedIn ? React.createElement(component, props) : history.push('/signin')
    }
    return <Route {...rest} render={routeComponent}/>;
    // if(isSignedIn) {
    //     return <Route {...rest} />
    // } else {
    //     return history.push('/login')
    // }
}

// export const PrivateRoute = ({...routeProps}: PrivateRouteProps) => {
//    const history = useHistory();
//     const { role, isSignedIn } = useSelector( (state: AppState) => state.user)

//     useEffect( () => {
//         if(!isSignedIn) {
//             return history.push('/signedin')
//         }
//     }, [isSignedIn, history])

//     if(isSignedIn && role === "admin" || isSignedIn && role === "user"){
//         return <Route {...routeProps} />
//     } else {
//         return history.push('/login')
//     }
// }

