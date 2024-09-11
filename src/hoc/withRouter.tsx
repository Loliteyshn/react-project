import { useLocation, useNavigate, useParams } from "react-router-dom";

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
export function withRouter<WCP extends object> (Component: React.ComponentType<WCP>) { 
	return (props: WCP) => {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component {...props} router={{ location, navigate, params }} />
		);
	}
}

// import {
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import { useEffect } from "react";

// // wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//       let location = useLocation();
//       let navigate = useNavigate();
//       let params = useParams();

//       useEffect(() => {
//         // if (!props.isAuth) {
//         //   navigate("/login");
//         // }
//       }, [props.isAuth, navigate]);

//       return (
//           <Component
//               {...props}
//               router={{ location, navigate, params }}
//           />
//       );
//   }

//   return ComponentWithRouterProp;
// }
// export default withRouter;