import React, { useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import monName from '../../utils/dateUtils';

import { 
    Container, 
    Content,
    Filters
 } from './styles';

const date = new Date();
const year = date.getFullYear();
const mounth = date.getUTCMonth();

console.log(date);

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const { type } = match.params;

    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas' : 'Saídas'
     },[type]);


     const lineColor = useMemo(() => {
        return type === 'entry-balance' ? '#F7931b' : '#E44C4E'
     },[type]);


    const mounths = [
        { value: 1, label: 'Janeiro', selected: (mounth === 0?true:false) },
        { value: 2, label: 'Fevereiro', selected: (mounth === 1?true:false) },
        { value: 3, label: 'Março', selected: (mounth === 2?true:false) },
        { value: 4, label: 'Abril', selected: (mounth === 3?true:false) },
        { value: 5, label: 'Maio', selected: (mounth === 4?true:false) },
        { value: 6, label: 'Junho', selected: (mounth === 5?true:false) },
    ];
    
    //($TipoBeneficiario == 'Selecione')?'selected':''?
    const years = [
        { value: 2022, label: 2022, selected:(year === 2022?true:false)},
        { value: 2021, label: 2021, selected:(year === 2021?true:false)},
        { value: 2020, label: 2020, selected:(year === 2020?true:false)},
        { value: 2019, label: 2019, selected:(year === 2019?true:false)},    
    ];

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={mounths} />
                <SelectInput options={years}/>
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