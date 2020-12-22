import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateField } from '../validation/validators';
import { FormConfigContext } from './FormConfig';

export interface ErrorValue {
    [id: string]: string|null;
}

export interface FormState {
    [key: string]: any;
}

export interface FormErrors {
    [key: string]: any;
}

export interface FormContext {
    form: FormState;
    errors: FormErrors;
    submitForm: () => void;
    validate: () => void;
    setField: (id: string, value: any) => void;
    getFieldValue: (id: string) => any;
    getFieldError: (id: string) => string|null;
}

export const FormStateContext = createContext<FormContext>({
    form: {},
    errors: {},
    submitForm: () => {},
    validate: () => {},
    setField: () => {},
    getFieldValue: () => '',
    getFieldError: () => null,
});

const initForm = (config: FormBuilder.Form): FormState => {
    return config.sections.flatMap(section => section.content).reduce((form: FormState, el: FormBuilder.Element) => {
        form[el.id] = '';

        return form;
    }, {});
}

const FormStateProvider = (props: any) => {
    const { getElement, config } = useContext(FormConfigContext);
    const [form, setForm] = useState<FormState>(initForm(config));
    const [errors, setErrors] = useState<FormErrors>({});
    const [submit, setSubmit] = useState<boolean>(false);

    const setField = (id: string, value: any) => setForm((prev: FormState) => ({
        ...prev,
        [id]: value,
    }));

    const validate = () => {
        if (submit) {
            const newErrors = Object.keys(form).reduce((errors: FormErrors, key: string) => {
                errors[key] = validateField(getElement(key), form[key]);

                return errors;
            }, {});

            setErrors(newErrors);
        }
    };

    const getFieldValue = (id: string): any => form[id];

    const getFieldError = (id: string): string|null => errors[id] || null; 

    const submitForm = () => {
        setSubmit(true);

        console.log(form);
    }

    useEffect(() => validate(), [submit, form]);

    return (
        <FormStateContext.Provider 
            value={{ form, errors, submitForm, validate, setField, getFieldValue, getFieldError }}
            { ...props }
        >
            {props.children}
        </FormStateContext.Provider>
    )
}

export default FormStateProvider;
