import React, { useEffect, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

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

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dataFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);

    const { type } = match.params;

    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas' : 'Saídas'
     },[type]);


     const lineColor = useMemo(() => {
        return type === 'entry-balance' ? '#F7931b' : '#E44C4E'
     },[type]);


    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses
    },[type]); 

    useEffect(() => {
        const response = listData.map(item => {
            return {
                id: String(Math.random() * data.length),
                description: item.description,
                amountFormatted: item.amount,
                frequency: item.frequency,
                dataFormatted: item.date,                
                tagColor: item.frequency === 'recorrente' ? '#E44C4e' : '#4E41F0' , 
            }
        })

        setData(response) ;    
    },[]);    

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
                {
                    data.map(item => (
                    <HistoryFinanceCard 
                        key= { item.id }
                        tagColor= { item.tagColor }
                        title= { item.description }
                        subTitle= { item.dataFormatted }
                        amount= { item.amountFormatted }
                    />
                    ))
                }
            </Content>
        </Container>
    );
}

export default List;