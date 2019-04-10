const getAccounts = (db) => (req,res) => {
    db.select('*')
    .from('accounts')
    .then(accounts => res.status(200).json(accounts))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const addAccount= (db) => (req,res) => {
    const { name , userId, id} = req.query;
    db.insert(
        {   
            name:name,
            userid: userId,
            id: id
        })
    .into('accounts')
    .then(a => res.status(200).json('new account added'))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const deleteAccount = (db) => (req, res) => {
    db('accounts')
    .where('id', '=', parseInt(req.params.id))
    .del()
    .then(a => res.status(200).json('account deleted'))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const updateAccount = (db) => (req,res) => {
    const { name } = req.query;
    db('accounts')
    .where('id', '=', req.params.id)
    .update(
      { 
        name:name
      })
    .then(a => res.status(200).json('account edited'))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

module.exports = {
    getAccounts: getAccounts,
    addAccount: addAccount,
    deleteAccount: deleteAccount, 
    updateAccount: updateAccount
}