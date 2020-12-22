import React, { useContext } from 'react';
import { FormConfigContext } from '../context/FormConfig';
import Section from './Section';

export const Form = () => {
    const { config } = useContext(FormConfigContext);

    return (
        <div className='form-container'>
            {(config.sections || []).map((section: FormBuilder.Section) => {
                const { id, title } = section;

                return <Section id={id} title={title} key={id}/>;
            })}
        </div>
    );
}

export default React.memo(Form);
