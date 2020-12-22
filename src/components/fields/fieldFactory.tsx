import React from 'react';
import BooleanField from './BooleanField';
import MultichoiceField from './MultichoiceField';
import TextAreaField from './TextAreaField';
import TextField from './TextField';

export interface FieldProps {
    element: FormBuilder.Element;
    value: any;
    onChange: (value: any) => void;
}

function fieldFactory(props: FieldProps): JSX.Element|null {
    const { type } = props.element;

    switch (type) {
        case 'boolean':
            return <BooleanField {...props}/>;
        case 'multichoice':
            return <MultichoiceField {...props} />;
        case 'textarea':
            return <TextAreaField {...props} />;
        case 'text':
            return <TextField {...props} />;
        default:
            console.error(`Unknown element type ${type}`);
            return null;
    }
}

export default fieldFactory;
