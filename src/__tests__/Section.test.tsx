import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import FormConfigProvider from '../context/FormConfig';
import Section, { SectionProps } from '../components/Section';
import form_instructions from '../data/form_instructions.json';
const config = form_instructions as FormBuilder.Job;

afterEach(cleanup);

const renderSection = ({ id, title }: SectionProps) => {
    return render(
        <FormConfigProvider>
            <Section id={id} title={title}/>
        </FormConfigProvider>
    );
}

test('renders section titles', () => {
    config.sections.forEach(section => {
        const { id, title } = section;
        const { getByText } = renderSection({ id, title });

        expect(getByText(title)).not.toBeNull;
    });
});

test('render correct number of section questions', () => {
    const section = config.sections[0];
    const { id, title } = section;
    const { getByText } = renderSection({ id, title});

    section.content.forEach(el => {
        expect(getByText(el.question_text)).not.toBeNull;
    });
})
