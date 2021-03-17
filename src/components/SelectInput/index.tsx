import React from 'react';

import { Container } from './styles';

const SelectInput: React.FC = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
}

export default SelectInput;