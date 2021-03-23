import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { uuid } from 'uuidv4';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMounths from '../../utils/listOfMounths';

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
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [mounthSelected, setMounthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente','eventual']);

    //const { type } = match.params;
    const movimentType = match.params.type;

    // const title = useMemo(() => {
    //     return movimentType === 'entry-balance' ? 'Entradas' : 'Saídas'
    //  },[movimentType]);


    //  const lineColor = useMemo(() => {
    //     return movimentType === 'entry-balance' ? '#F7931b' : '#E44C4E'
    //  },[movimentType]);


    // const listData = useMemo(() => {
    //     return movimentType === 'entry-balance' ? gains : expenses
    // },[movimentType]); 

    const pageData = useMemo(() =>{
        return movimentType === 'entry-balance' ?
        {
            title: 'Entradas',
            lineColor: '#F7931b',
            data: gains
        }
        :
        {
            title: 'Saídas',
            lineColor: '#E44C4E',
            data: expenses
        }
    }, [movimentType]);

    const handleFrequencyClick = ((frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0) {
            //console.log('Já selecionada');
            const filtered = frequencyFilterSelected.filter(item => item != frequency);
            setFrequencyFilterSelected(filtered);
        }
        else {
            //console.log('Selecionada agora');
            setFrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    });

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMounthSelected(parseMonth);
        }catch(error) {
            throw new Error('Invalid month value. Is accept 0 - 12.');
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }catch(error) {
            throw new Error('Invalid year value. Is accept integer.');
        }
    }

    useEffect(() => {        
        const filteredData = pageData.data.filter(item => {
            const date = new Date(item.date);
            const mounth = date.getMonth() + 1;
            const year = date.getFullYear();

            console.log('mes: ' + mounth + '  selecionadao: ' + mounthSelected);
            console.log('mes: ' + year + '  selecionadao: ' + yearSelected);
            return mounth === mounthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        const formattedData = filteredData.map(item => {
            return {
                //id: String(Math.random() * data.length),
                id: String(uuid()),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date), 
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4e' , 
            }
        });
        console.log(pageData.data);
        setData(formattedData) ;    
    },[pageData.data, mounthSelected, yearSelected, frequencyFilterSelected]);    

    //const mounths = [
    //    { value: 1, label: 'Janeiro' },
    //    { value: 2, label: 'Fevereiro' },
    //    { value: 3, label: 'Março' },
    //    { value: 4, label: 'Abril' },
    //    { value: 5, label: 'Maio' },
    //    { value: 6, label: 'Junho' },
    //    { value: 1, label: 'Julho' },
    //    { value: 2, label: 'Agosto' },
    //    { value: 3, label: 'Setembro' },
    //    { value: 4, label: 'Outubro' },
    //    { value: 5, label: 'Novembro' },
    //    { value: 6, label: 'Dezembro' },        
    //];
    
    //const years = [
    //    { value: 2022, label: 2022 },
    //    { value: 2021, label: 2021 },
    //    { value: 2020, label: 2020 },
    //    { value: 2019, label: 2019 },
    //];
    const years = useMemo(() => {
        let uniqueYears: number[] =[];

        pageData.data.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        if(!uniqueYears.includes(2021)) {
            uniqueYears.push(2021);
        }

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        })
    }, [pageData.data]);

    const mounths = useMemo(() => {
        return listOfMounths.map((mounth, index) => {
            return {
                value: index + 1,
                label: mounth,
            }
        });

    }, []);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput 
                    options={mounths} 
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={mounthSelected}/>
                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button 
                    type="button" 
                    className={`tag-filter tag-filter-recurrent
                        ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button 
                    type="button"
                    className={`tag-filter tag-filter-eventualy
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
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
                        subTitle= { item.dateFormatted }
                        amount= { item.amountFormatted }
                    />
                    ))
                }
            </Content>
        </Container>
    );
}

export default List;