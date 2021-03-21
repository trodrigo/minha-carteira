import React from 'react';

import { Container } from './styles';

interface ISelectInputPropos {
    options: {
        value: string | number;
        label: string | number;
    }[],  
    onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined; 
    defaultValue?: string | number;
}

const SelectInput: React.FC<ISelectInputPropos> = ({ options, onChange, defaultValue }) => {
    return (
        <Container>
            <select onChange={onChange} defaultValue={defaultValue}>
                {
                    options.map(option => (
                        <option 
                            key={option.value}
                            value={option.value}
                        >{option.label}</option>
                    ))
                }
                {/*<option key='a'>Maria</option>
                <option key='b'>João</option>
            <option key='c'>Gertrudes</option>*/}
            </select>
        </Container>
    );
}

export default SelectInput;