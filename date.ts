module.exports.getDateToDay = getDateToDay;
function getDateToDay() {
    const dateOption: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Date().toLocaleDateString('th-TH', dateOption);
}

module.exports.xx = xx;
function xx() {

}