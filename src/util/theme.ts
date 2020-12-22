export interface MappedTheme {
    [key: string]: string;
}

export const mapTheme = (theme: FormBuilder.Theme): MappedTheme => {
    return Object.keys(theme).reduce((map: MappedTheme, key: string) => {
        map[`--${key}`] = theme[key] || '';

        return map;
    }, {});
}

export const applyTheme = (theme: MappedTheme) => {
    const root: HTMLElement = document.documentElement;

    Object.keys(theme).forEach((key: string) => {
        root.style.setProperty(key, theme[key]);
    });
}
