namespace FormBuilder {
  interface Theme {
    [key: string]: string;
    primary_color?: string;
    secondary_color?: string;
    background_color?: string;
    text_color?: string;
  }

  // Describes the form UI
  interface Form {
    theme: Theme;
    sections: Section[];
  }

  // Describes one section of the form
  interface Section {
    title: string;
    id: string; // Unique (slug)
    content: Element[];
  }

  // Describes an individual user input element
  interface Element {
    id: string;
    label: string;
    metadata: ElementMeta;
    type:
      | 'boolean' // Yes / No question
      | 'textarea' // Longform text answer
      | 'text' // Text input (with formatting options)
      | 'multichoice'; // Select field with multiple choices available
  }

  // Field metadata objects are different per element, with some shared values.
  // The shared values are non-optional in this interface
  interface ElementMeta {
    required: boolean;
    placeholder?: string;
    options?: Option[];
    format?: 'text' | 'email' | 'number';
    pattern?: string;
    step?: number;
  }

  interface Option {
    label: string;
    value: string;
  }
}
