const getSpendings = (db) => (req,res) => {
    const { start, end, account } = req.query;
    db.select('*')
    .from('spendings')
    .whereBetween('date', [start, end])
    .orderBy('date', 'desc')
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
          date:new Date(date).toISOString(),
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

const getColumns = (db) => (req, res) => {
    db.select('column_name','data_type')
    .from('information_schema.columns')
    .where('table_name', '=', 'spendings')
    .where('column_name', '!=', 'id')
    .then(columns => res.status(200).json(columns))
}

module.exports = {
    getSpendings: getSpendings,
    getSpending: getSpending,
    addSpending: addSpending,
    deleteSpending: deleteSpending,
    updateSpending: updateSpending,
    getColumns: getColumns
}