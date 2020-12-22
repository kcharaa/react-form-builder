import React from 'react';
import { FieldProps } from './fieldFactory';

const className = (side: string, value: string): string => {
    const selected: boolean = (value === 'Yes' && side === 'left') || (value === 'No' && side === 'right');

    return `btn btn-${side} ${selected ? 'btn-selected' : ''}`;
}

function BooleanField(props: FieldProps): JSX.Element {
    const { value, onChange, element } = props;
    const { metadata } = element;

    return (
        <div className='btn-composition' id={element.id}>
            <span className={className('left', value)} onClick={() => onChange('Yes')} { ...metadata }>YES</span>
            <span className={className('right', value)} onClick={() => onChange('No')} { ...metadata }>NO</span>
        </div>
    );
}

export default React.memo(BooleanField);

