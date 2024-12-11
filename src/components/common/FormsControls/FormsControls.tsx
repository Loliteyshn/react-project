import React, { FC } from 'react';
import { FieldValidatorType } from '../../../utils/validators/validators';
import styles from './FormsControls.module.css';
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

type FormControlPropsType = {
	child: "input" | "select" | "textarea",
}

export const FormControl: FC<WrappedFieldProps & FormControlPropsType> = ({ input, meta, ...restProps }) => {
	const hasError = meta.touched && meta.error
	return (
		<div className={`${styles.formControl} ${hasError && styles.error}`}>
			<div>
				<restProps.child {...restProps} {...input} {...meta} />
			</div>
			<div>
				{hasError && <span>{meta.error} </span>}
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
//     return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
// }



export function CreateField<FormKeysType extends string>(placeholder: string,
	name: FormKeysType,
	validators: Array<FieldValidatorType>,
	child: string | React.Component | React.FC,
	props = {}, text = "") {
	return <div>
		<Field child={child} component={FormControl}
			placeholder={placeholder} name={name}
			validate={validators} {...props} /> {text}
	</div>
}

export type getStringKeys<T> = Extract<keyof T, string>;

type InputType = {
	name: string
	placeholder: string
	type: string
	validate: RegisterOptions<FieldValues, string>
}  

export const Input: FC<InputType> = ({ name, placeholder, type, validate }) => {
	const { register, formState: { errors } } = useFormContext();
	return (
	  <div>
		<TextField id="standard-basic" variant="standard"
		  type={type}
		  placeholder={placeholder}
		  {...register(name, validate)}
		  className={styles.input}
		  error={!!errors[name]}
		  helperText={errors[name]?.message as string || ''}
		  multiline
		/>
	  </div>
	);
  };