const formatDate = (date, locale) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' }
    return new Date(date).toLocaleDateString(locale, options)
};

module.exports = formatDate