const getCategories = (db) => (req,res) => {
    db.select('*')
    .from('categories')
    .then(categories => res.status(200).json(categories))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

module.exports = {
    getCategories: getCategories
}