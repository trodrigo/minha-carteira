import React, { useMemo } from 'react';

import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

import { Container } from './styles';
import CountUp from 'react-countup';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabels: string;
    icon: 'dolar' | 'arrowUp' | 'arrowDown';
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerLabels,
    icon, 
    color
}) => {
    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'dolar': 
                return dolarImg;
            case 'arrowUp': 
                return arrowUpImg;
            case 'arrowDown': 
                return arrowDownImg;
            default:
                return undefined;
        }
    }, [icon]);

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp 
                    end={amount}
                    prefix="R$ "
                    separator="."
                    decimal="," 
                    decimals={2}
                />
            </h1>
            <small>{footerLabels}</small>
            <img src={iconSelected} alt={title}/>
            
        </Container>
    );
}

export default WalletBox;