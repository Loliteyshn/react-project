import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/users-reducer";
import { FC } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors";

const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string,
    friend: "true" | "false" | "null"
}

const UserSearchForm: FC<PropsType> = React.memo(({ onFilterChanged }) => {
    const filter = useSelector(getUsersFilter);

    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        // const filter: FilterType = {
        //     term : values.term,
        //     friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        // }
        onFilterChanged(values);
        setSubmitting(false);
    }

    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={{ term: filter.term, friend: filter.friend }}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UserSearchForm;