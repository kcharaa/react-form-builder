import React, { createContext } from 'react';
import formInstructions from '../data/form_instructions.json';

export interface FormConfig {
    config: FormBuilder.Form;
    getElement: (id: string) => FormBuilder.Element|undefined;
}

const config = formInstructions as FormBuilder.Form;

export const FormConfigContext = createContext<FormConfig>({
    config,
    getElement: () => undefined,
});

const getElement = (id: string): FormBuilder.Element|undefined => {
    const elements: FormBuilder.Element[] = config.sections.flatMap((section: FormBuilder.Section) => {
        return section.content;
    });

    return elements.find((el: FormBuilder.Element) => el.id === id);
}

const FormConfigProvider = (props: any): JSX.Element => {
    return (
        <FormConfigContext.Provider value={{config, getElement}} { ...props }>
            {props.children}
        </FormConfigContext.Provider>
    );
}

export default FormConfigProvider;
