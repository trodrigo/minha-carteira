import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { 
    Container, 
    Content,
    Filters
 } from './styles';

const mounths = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
];

const years = [
    { value: 2022, label: 2022},
    { value: 2021, label: 2021},
    { value: 2020, label: 2020},
    { value: 2019, label: 2019},    
];

const year = Date();
console.log(year);
const List: React.FC = () => {
    return (
        <Container>
            <ContentHeader title="Saídas" lineColor="#E44C4E">
                <SelectInput options={mounths} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filters>
                <button type="button" className="tag-filter tag-filter-recurrent">
                    Recorrentes
                </button>

                <button type="button" className="tag-filter tag-filter-eventualy">
                    Eventuais
                </button>                
            </Filters>
            <Content>
                <HistoryFinanceCard 
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
            </Content>
        </Container>
    );
}

export default List;