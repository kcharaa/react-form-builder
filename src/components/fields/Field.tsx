import React, { useContext } from 'react';
import fieldFactory from '../fields/fieldFactory';
import { FormStateContext } from '../../context/FormState';

export interface FieldProps {
    element: FormBuilder.Element;
}

function Field({ element }: FieldProps): JSX.Element {
    const { setField, getFieldValue, getFieldError } = useContext(FormStateContext);
    const value = getFieldValue(element.id);
    const error = getFieldError(element.id);

    return (
        <div className={`form-field ${error ? 'error' : ''}`}>
            <label className='field-label' htmlFor={element.id}>{element.label}</label>
            {fieldFactory({
                element,
                value,
                onChange: (v: any) => setField(element.id, v),
            })}

            {!!error && <div className="form-field--error">{error}</div>}
        </div>
    );
}

export default React.memo(Field);
