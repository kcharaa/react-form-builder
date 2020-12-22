import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import FormConfigProvider from '../context/FormConfig';
import Form from '../components/Form';
import form_instructions from '../data/form_instructions.json';

const config = form_instructions as FormBuilder.Job;

afterEach(cleanup);

const renderForm = () => {
    return render(
        <FormConfigProvider>
            <Form />
        </FormConfigProvider>
    );
}

test('renders section titles', () => {
    const { container, getByText } = renderForm();

    const titles = config.sections.map(section => section.title);
    expect(container.querySelector('.form-container')).not.toBeNull();

    titles.forEach(title => expect(getByText(title)).not.toBeNull);
});
