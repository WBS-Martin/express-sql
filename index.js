const express = require('express')
const pool = require('./client')

const app = express()
const port = 8000

app.use(express.json())

// user routes

app.get('/users/', (req, res) => {
  pool
    .query('SELECT * FROM users')
    .then((data) => res.json(data.rows))
    .catch((err) => res.json(err))
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  pool
    .query(`SELECT * FROM users WHERE id = ${id}`)
    .then((data) => res.json(data.rows))
    .catch((err) => res.json(err))
})

app.post('/users/', (req, res) => {
  const { first_name, last_name, age } = req.body
  pool
    .query(
      `INSERT INTO users (first_name, last_name, age) VALUES ('${first_name}', '${last_name}', ${age})`
    )
    .then(res.status(201).json({ message: 'Successfully added user' }))
    .catch((err) => res.json(err))
})

app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { first_name, last_name, age } = req.body
  pool
    .query(
      `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', age = ${age} WHERE id = ${id}`
    )
    .then(res.status(202).json({ message: 'Successfully updated user' }))
    .catch((err) => res.json(err))
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  pool
    .query(`DELETE FROM users WHERE id = ${id}`)
    .then(res.status(204).json({ message: 'Successfully deleted user' }))
    .catch((err) => res.json(err))
})

// order routes

app.get('/orders', (req, res) => {
  pool
    .query('SELECT * FROM orders')
    .then((data) => res.json(data.rows))
    .catch((err) => res.json(err))
})

app.get('/orders/:id', (req, res) => {
  const { id } = req.params
  pool
    .query(`SELECT * FROM orders WHERE id = ${id}`)
    .then((data) => res.json(data.rows))
    .catch((err) => res.json(err))
})

app.post('/orders', (req, res) => {
  const { price, user_id } = req.body
  pool
    .query(`INSERT INTO orders (price, user_id) VALUES (${price}, ${user_id})`)
    .then(res.status(201).json({ message: 'Successfully added order' })
    )
    .catch((err) => res.json(err))
})

app.put('/:id', (req, res) => {
  const { id } = req.params
  const { price, user_id } = req.body
  pool
    .query(
      `UPDATE orders SET price = ${price}, user_id = ${user_id} WHERE id = ${id}`
    )
    .then(res.status(202).json({ message: 'Successfully updated order' }))
    .catch((err) => res.json(err))
})

app.delete('/orders/:id', (req, res) => {
  const { id } = req.params
  pool
    .query(`DELETE FROM orders WHERE id = ${id}`)
    .then(res.status(204).json({ message: 'Successfully deleted order' }))
    .catch((err) => res.json(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
