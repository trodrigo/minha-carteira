import React from 'react';

import { Container } from './styles';

interface ISelectInputPropos {
    options: {
        value: string | number;
        label: string | number;
    }[],
}

const SelectInput: React.FC<ISelectInputPropos> = ({ options }) => {
    return (
        <Container>
            <select>
                {
                    options.map(option => (
                        <option value={option.value}>{option.label}</option>
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