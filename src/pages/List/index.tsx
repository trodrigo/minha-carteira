import React, { useEffect, useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import { 
    Container, 
    Content,
    Filters
 } from './styles';

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
    const [mounthSelected, setMounthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearthSelected] = useState<string>(String(new Date().getFullYear()));

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
        const filteredData = listData.filter(item => {
            const date = new Date(item.date);
            const mounth = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return mounth === mounthSelected && year === yearSelected;
        });

        const formattedData = filteredData.map(item => {
            return {
                //id: String(Math.random() * data.length),
                id: String(new Date().getTime()) + item.amount,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date), 
                tagColor: item.frequency === 'recorrente' ? '#E44C4e' : '#4E41F0' , 
            }
        });
;
        setData(formattedData) ;    
    },[listData, mounthSelected, yearSelected, data.length]);    

    const mounths = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 1, label: 'Julho' },
        { value: 2, label: 'Agosto' },
        { value: 3, label: 'Setembro' },
        { value: 4, label: 'Outubro' },
        { value: 5, label: 'Novembro' },
        { value: 6, label: 'Dezembro' },        
    ];
    
    //($TipoBeneficiario == 'Selecione')?'selected':''?
    const years = [
        { value: 2022, label: 2022 },
        { value: 2021, label: 2021 },
        { value: 2020, label: 2020 },
        { value: 2019, label: 2019 },
    ];

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={mounths} onChange={(e) => setMounthSelected(e.target.value)} defaultValue={mounthSelected}/>
                <SelectInput options={years} onChange={(e) => setYearthSelected(e.target.value)} defaultValue={yearSelected}/>
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