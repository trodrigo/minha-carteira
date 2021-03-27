import React, { useMemo, useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import PieChart from '../../components/PieChart';

import { 
    Container, 
    Content 
} from './styles';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import cryingImg from '../../assets/crying.svg';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMounths from '../../utils/listOfMounths';
import MessageBox from '../../components/MessageBox';

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

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (year === yearSelected && month === mounthSelected) {
                try {
                    total += Number(item.amount);
                } catch(error) {
                    throw new Error('Invalid amount! Amount most be number.')
                }
            }            
        });

        return total;
    }, [yearSelected, mounthSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (year === yearSelected && month === mounthSelected) {
                try {
                    total += Number(item.amount);
                } catch(error) {
                    throw new Error('Invalid amount! Amount most be number.')
                }
            }            
        });

        return total;
    }, [yearSelected, mounthSelected]);    

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses, yearSelected, mounthSelected]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mês você gastou mais do que deveria",
                footerText: "Verique os gastos e corte as despesas desnecessárias",
                icon: sadImg,
            }
        } else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mês você gastou examente o que ganhou",
                footerText: "Ainda é necessário cortar as despesas desnecessárias",
                icon: cryingImg,
            }            
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira esta positiva",
                footerText: "Continue assim. Considere investir o seu saldo",
                icon: happyImg,
            } 
        }
    }, [totalBalance]);

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

            <Content>
                <WalletBox 
                    title="saldo"
                    amount={totalBalance}
                    footerLabels="Atualizado com base nas entradas e saídas"
                    icon="dolar"
                    color="#4E41F0"
                />
                <WalletBox 
                    title="entradas"
                    amount={totalGains}
                    footerLabels="Atualizado com base nas entradas"
                    icon="arrowUp"
                    color="#F7931B"
                />
                <WalletBox 
                    title="saídas"
                    amount={totalExpenses}
                    footerLabels="Atualizado com base nas saídas"
                    icon="arrowDown"
                    color="#E44C4E"
                />        

                <MessageBox 
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChart />
            </Content>            
        </Container>
    );
}

export default Dashboard;