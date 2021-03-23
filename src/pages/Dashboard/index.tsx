import React, { useMemo, useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import { Container } from './styles';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMounths from '../../utils/listOfMounths';

const Dashboard: React.FC = () => {
    const [mounthSelected, setMounthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const years = useMemo(() => {
        let uniqueYears: number[] =[];

        [...gains, ...expenses].forEach(item => {
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
    }, []);

    const mounths = useMemo(() => {
        return listOfMounths.map((mounth, index) => {
            return {
                value: index + 1,
                label: mounth,
            }
        });

    }, []);    

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

    const options = [
        { value: 'Rodrigo', label: 'Rodrigo' },
        { value: 'Maria', label: 'Maria' },
    ];

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput 
                    options={mounths} 
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={mounthSelected}/>
                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}/>
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;