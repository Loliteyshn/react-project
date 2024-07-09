import styles from './FormsControls.module.css';
import { Field } from "redux-form";

// const FormControls = ({ input, meta, children, element, ...props }) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
//             <div>
//                 {props.children}
//                 {/* <element {...input} {...props} /> */}
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }

export const FormControl = ({ input, meta, ...restProps }) => {
	const hasError = meta.touched && meta.error
	return (
		<div className={`${styles.formControl} ${hasError && styles.error}`}>
			<div>
				<restProps.child {...restProps} {...input} {...meta} />
			</div>
			<div>
				{hasError && <span>{meta.error}</span>}
			</div>
		</div>
	)
}

// export const Textarea = (props) => {
//     const { input, meta, child, ...restProps } = props;
//     <FormControl {...props} ><textarea {...input} {...restProps} /></FormControl>
// }

// export const Input = (props) => {
//     const { input, meta, child, ...restProps } = props;
//     <FormControl {...props}><input {...input} {...restProps} /></FormControl>
// }

export const CreateField = (placeholder, name, validators, component, props = {}, text = "") => {
	return <div>
		<Field child={component} component={FormControl}
			placeholder={placeholder} name={name} validate={validators} {...props} /> {text}
	</div>
}