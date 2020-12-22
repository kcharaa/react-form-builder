import React, { useContext } from 'react';
import { FormStateContext } from '../context/FormState';

export default function Footer(): JSX.Element {
    const { submitForm } = useContext(FormStateContext);

    function handleSubmit() {
        submitForm();
    }

    return (
        <div className="footer">
            <button onClick={handleSubmit} className='btn btn-submit'>Next</button>
        </div>
    );
}
