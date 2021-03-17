import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const options = [
    { value: 'Jose', label: 'Jose' },
    { value: 'MariTome', label: 'Tome' },
];

const List: React.FC = () => {
    return (
        <Container>
            <ContentHeader title="Saídas" lineColor="#E44C4E">
                <SelectInput options={options} />
            </ContentHeader>
        </Container>
    );
}

export default List;