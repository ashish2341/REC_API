const  formatNumber = (number) => {
    if (typeof number !== 'number') {
        throw new Error('Input must be a number');
    }
    
    if (number >= 10000000) {
        return (number / 10000000).toFixed(2) + 'Cr';
    } else if (number >= 100000) {
        return (number / 100000).toFixed(2) + 'L';
    } else {
        return number.toString();
    }
}

module.exports = {formatNumber}