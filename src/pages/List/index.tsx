import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { Container, Content } from './styles';

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

            <Content>
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
                    tagColor="#E44c4E"
                    title="Conta de Luz"
                    subTitle="17/03/2021"
                    amount="R$ 330,00"
                />
                <HistoryFinanceCard 
                    cardColor="#313862"
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