const capitalizeFirstLetter = (string) => {
    const splitString = string.split(' ') || string.split('_') || string.split('-') || string.split('.');
    const capitalizedString = splitString.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedString.join(' ');
};

export default capitalizeFirstLetter;