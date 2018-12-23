import moneyFormatter from './moneyFormatter';

export function getBlindName(blind) {
    return [moneyFormatter(blind.blind_1), moneyFormatter(blind.blind_2), moneyFormatter(blind.blind_3)].filter(b => b !== 0).join(' ');
}

export function getBigBlind(blind) {
    const blinds = [blind.blind_1, blind.blind_2, blind.blind_3];
    return Math.max(...blinds);
}
