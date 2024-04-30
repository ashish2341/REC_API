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
const getDirection =  (dob) =>  {
    const finalDate = new Date(dob)
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

    switch (month) {
        case 1:
            return day < 20 ? directionMapping['Capricorn'] : directionMapping['Aquarius'];
        case 2:
            return day < 19 ? directionMapping['Aquarius'] : directionMapping['Pisces'];
        case 3:
            return day < 21 ? directionMapping['Pisces'] : directionMapping['Aries'];
        case 4:
            return day < 20 ? directionMapping['Aries'] : directionMapping['Taurus'];
        case 5:
            return day < 21 ? directionMapping['Taurus'] : directionMapping['Gemini'];
        case 6:
            return day < 21 ? directionMapping['Gemini'] : directionMapping['Cancer'];
        case 7:
            return day < 23 ? directionMapping['Cancer'] : directionMapping['Leo'];
        case 8:
            return day < 23 ? directionMapping['Leo'] : directionMapping['Virgo'];
        case 9:
            return day < 23 ? directionMapping['Virgo'] : directionMapping['Libra'];
        case 10:
            return day < 23 ? directionMapping['Libra'] : directionMapping['Scorpio'];
        case 11:
            return day < 22 ? directionMapping['Scorpio'] : directionMapping['Sagittarius'];
        case 12:
            return day < 22 ? directionMapping['Sagittarius'] : directionMapping['Capricorn'];
        default:
            return 'Invalid Date';
    }
}

 
 

module.exports = {formatNumber,getDirection}