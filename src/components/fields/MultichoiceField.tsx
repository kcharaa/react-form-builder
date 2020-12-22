import React, { useState, useEffect, useRef } from 'react';
import { FieldProps } from './fieldFactory';

type InputChange = React.ChangeEvent<HTMLInputElement>;
type Option = FormBuilder.Option;

function MultichoiceField(props: FieldProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    const { onChange, value, element } = props;
    const [options, setOptions] = useState(element.metadata.options || []);
    const [selectedItems, setSelectedItems] = useState<Option[]>(value || []);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const showPlaceholder: boolean = !search && !selectedItems.length;

    const unselectedItems: Option[] = (options).filter((option: Option) => {
        return !selectedItems.includes(option);
    });

    useEffect(() => onChange(selectedItems), [selectedItems]);

    const handleClickOutside = (e: Event) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleSearch = (e: InputChange) => {
        const query: string = e.target.value;
        if (!query) {
            setSearch('');
            return setOptions(element.metadata.options || []);
        }

        const filteredOptions: Option[] = options.filter((option: Option) => {
            return option.label.toLowerCase().includes(query.toLowerCase());
        });

        setIsOpen(true);
        setSearch(query);
        setOptions(filteredOptions);
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    const selectItem = (item: Option) => {
        setSelectedItems([...selectedItems, item]);
        setSearch('');
        setOptions(options);
    }

    const removeItem = (item: Option) => {
        setSelectedItems(selectedItems.filter(el => item.label !== el.label));
    }

    const clearSelection = () => {
        setSelectedItems([]);
        setSearch('');
        setIsOpen(false);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={ref} id={element.id}>
            <div onClick={toggleDropdown} className='multiselect-field'>
                {showPlaceholder && <div className='placeholder'>Select...</div>}
                <div className='selection-container input-field'>
                    {selectedItems.map((item, index) => (
                        <span key={`selected-item-${index}`} className='selected-item'>
                            <span className='selected-item--label'>{item.label}</span>
                            <span onClick={() => removeItem(item)} className='selected-item--remove'>&#10005;</span>
                        </span>)
                    )}
                    <div>
                        <input type="text" className='multiselect-input' value={search} onChange={handleSearch}/>
                    </div>
                </div>
                {!!selectedItems.length && <div className='clear-selection' onClick={clearSelection}>&#10005;</div>}
            </div>
            {isOpen &&
                <div className='multiselect--menu'>
                    {!!unselectedItems.length
                    ? 
                    <div className='multiselect--options'>
                        <ul>
                            {unselectedItems.map((item, index) => (
                                <li key={`list-item-${index}`} onClick={() => selectItem(item)} >{item.label}</li>
                            ))}
                        </ul> 
                    </div>
                    : 
                    <div className='multiselect--no-options'>No Options</div>}
                </div> 
            }
        </div>
    );
}

export default MultichoiceField;
