import React from 'react';
import { FieldProps } from './fieldFactory';

function TextField(props: FieldProps): JSX.Element {
    const { onChange, value, element } = props;
    const { metadata } = element;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

    return (
        <input value={value} onChange={handleChange} { ...metadata } className='input-field' id={element.id}/>
    );
}

export default TextField;
