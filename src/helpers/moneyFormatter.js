export default function moneyFormatter(cents) {
    if (!cents) {
        return 0;
    }

    let dollars = cents / 100;
    return dollars.toLocaleString('en-US', {style:'currency', currency:'USD'});
}
