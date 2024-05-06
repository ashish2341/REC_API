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
const getDirection = (dob) => {
    const finalDate = new Date(dob);
    const month = finalDate.getMonth() + 1;
    const day = finalDate.getDate();

    // Mapping of zodiac signs to directions
    const directionMapping = {
        'Aries': 'East',
        'Taurus': 'South',
        'Gemini': 'West',
        'Cancer': 'North',
        'Leo': 'East',
        'Virgo': 'South',
        'Libra': 'West',
        'Scorpio': 'North',
        'Sagittarius': 'East',
        'Capricorn': 'South',
        'Aquarius': 'West',
        'Pisces': 'North'
    };

    // Mapping of zodiac signs to months
    const rashiMapping = {
        1: 'Capricorn',
        2: 'Aquarius',
        3: 'Pisces',
        4: 'Aries',
        5: 'Taurus',
        6: 'Gemini',
        7: 'Cancer',
        8: 'Leo',
        9: 'Virgo',
        10: 'Libra',
        11: 'Scorpio',
        12: 'Sagittarius'
    };

    const rashi = rashiMapping[month];
    const direction = directionMapping[rashi];

    return { direction, rashi };
};


 
 

module.exports = {formatNumber,getDirection}