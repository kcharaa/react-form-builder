import React from 'react';
import { FieldProps } from './fieldFactory';

function TextAreaField(props: FieldProps): JSX.Element {
    const { onChange, value, element } = props;
    const { metadata } = element;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value);

    return (
        <textarea value={value} onChange={handleChange} { ...metadata } className="input-field" id={element.id}/>
    );
}

export default TextAreaField;
