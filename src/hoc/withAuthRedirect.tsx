import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";
import React, { ComponentType } from "react";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapStatePropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
    let RedirectComponent: React.FC<MapStatePropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Navigate to={'/login'} />

        return <WrappedComponent {...restProps as unknown as WCP} />
    }
    let ConnectedAuthRedirectComponent = connect<MapStatePropsType, DispatchPropsType, WCP, AppStateType>
        (mapStateToPropsForRedirect, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

// type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>

// export const withAuthRedirect = (Component: ComponentType) => {
//     class RedirectComponent extends React.Component<MapStatePropsType> {
//         render() {
//             if (!this.props.isAuth ) return <Navigate to={"/login"}/>;

//             return <Component {...this.props}/>
//         }
//     }
//     return connect(mapStateToPropsForRedirect)(RedirectComponent);
// }