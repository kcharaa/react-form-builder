type Error = string|null;

const emailPattern: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

const validate = (value: any, booleanExpression: boolean, error: string = 'Please fill in this field'): Error => {
    return value && booleanExpression ? null : error;
};

export const required = (value: any): Error => {
    return validate(value, value !== undefined && value !== null && value.length);
}

export const matchPattern = (key:string, value: string, pattern: string): Error => validate(value, (new RegExp(pattern)).test(value), `Please enter a valid ${key}`);

export const validEmail = (value: string): Error => validate(value, emailPattern.test(value), 'Please enter a valid email address');

export const validAge = (value: any): Error => validate(value, !isNaN(Number(value)) && value > 0, "Please enter a valid age");

export const validateField = (element: FormBuilder.Element|undefined, value: any): Error => {
    if (!element) {
        return null;
    }
    
    const key: string = element.metadata.format || element.id;
    if (element.metadata.pattern) {
        return matchPattern(key, value, element.metadata.pattern);
    }

    if (element.metadata.required) {
        return required(value);
    }

    return null;
}
