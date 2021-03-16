import React from 'react';

import { 
    Container,
    ToogleLabel,
    ToggleSelector 
} from './styles';

const Toogle: React.FC = () => (
    <Container>
        <ToogleLabel>Light</ToogleLabel>
        <ToggleSelector             
            checked 
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => console.log('mudou')}
        />
        <ToogleLabel>Dark</ToogleLabel>
    </Container>
)

export default Toogle;