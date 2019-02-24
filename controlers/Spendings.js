const getSpendings = (db) => (req,res) => {
    db.select('*')
    .from('spendings')
    .innerJoin('categories', 'spendings.category', '=', 'categories.id')
    .leftJoin('accounts', 'spendings.account', '=', 'accounts.id')
    .then(spendings => res.status(200).json(spendings))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const getSpending = (db) => (req,res) => {
    db.select('*')
    .from('spendings')
    .where('id', '=', parseInt(req.params.id))
    .then(spendings => res.status(200).json(spendings))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const addSpending = (db) => (req,res) => {
    const { name, category, value, account, description, date } = req.query;
    db.insert(
        { name:name, 
          category:category, 
          value:value, 
          account:account, 
          description:description,
          date:date
        })
    .into('spendings')
    .then(a => res.status(200).json('new spending added'))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const deleteSpending = (db) => (req,res) => {
    db('spendings')
    .where('id', '=', parseInt(req.params.id))
    .del()
    .then(a => res.status(200).json('spending deleted'))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

const updateSpending = (db) => (req,res) => {
    const { name, category, value, account, description, date } = req.query;
    db('spendings')
    .where('id', '=', req.params.id)
    .update(
      { name:name, 
        category:category, 
        value:value, 
        account:account, 
        description:description,
        date:date
      })
    .then(a => res.status(200).json('spending edited'))
    .catch(err => res.status(400).json(err, ':', 'unable to get data'))
}

module.exports = {
    getSpendings: getSpendings,
    getSpending: getSpending,
    addSpending: addSpending,
    deleteSpending: deleteSpending,
    updateSpending: updateSpending
}