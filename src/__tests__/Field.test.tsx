import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FormStateProvider from '../context/FormState';
import form_instructions from '../data/form_instructions.json';
import Field, { FieldProps } from '../components/fields/Field';
const config = form_instructions as FormBuilder.Job;

afterEach(cleanup);

const renderField = ({ element }: FieldProps) => {
    return render(
        <FormStateProvider>
            <Field element={element}/>
        </FormStateProvider>
    );
}

test('renders the field label', () => {
    const element = config.sections[0].content[0];
    const { getByText } = renderField({ element });
    
    expect(getByText(element.question_text)).not.toBeNull();
});

test('renders the correct field input', () => {
    const elements = config.sections.flatMap(section => section.content);
    const fields = elements.map(element => renderField({ element}).container);

    expect(fields[0].querySelector('input')).not.toBeNull();
    expect(fields[1].querySelector('input')).not.toBeNull();
    expect(fields[2].querySelector('.btn-composition')).not.toBeNull();
    expect(fields[3].querySelector('.multiselect-field')).not.toBeNull();
    expect(fields[4].querySelector('.btn-composition')).not.toBeNull();
    expect(fields[5].querySelector('textarea')).not.toBeNull();
    expect(fields[6].querySelector('input')).not.toBeNull();
});

test('render the correct input attributes', () => {
    const element = config.sections[0].content[0];
    const { container } = renderField({ element });

    expect(container.querySelector('input')?.getAttribute('format')).toBe('text');
    expect(container.querySelector('input')?.getAttributeNames()).toContain('required');
});

test('render the entered value', () => {
    const element = config.sections[0].content[0];
    const { getByLabelText } = renderField({ element });

    const input = getByLabelText(element.question_text) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
})

