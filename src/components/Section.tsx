import React, { useContext } from 'react';
import { FormConfigContext } from '../context/FormConfig';
import Field from './fields/Field';

export interface SectionProps {
    id: string;
    title: string;
}

const Section = (props: SectionProps): JSX.Element => {
    const { config } = useContext(FormConfigContext);
    const { id, title } = props;
    const section = config.sections.find((section: FormBuilder.Section) => section.id === id);
    const elements = section?.content || [];

    return (
        <div key={id} className='form-section'>
            <h3>{title}</h3>
            {
                elements.map((element: FormBuilder.Element) => (
                    <Field element={element} key={element.id}/>
                ))
            }
        </div>
    );
}

export default React.memo(Section);
