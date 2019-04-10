const getProfile = (db) => (req,res) => {
    db.select('*')
    .from('users')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

module.exports = {
    getProfile: getProfile
}