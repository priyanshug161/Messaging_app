const express = require('express')
const app = express()
const port = 3000


// Default messages
let messages = [
  { group_id: 'group1', sender_id: 'user1', message: 'Hello group!' },
  { group_id: 'group1', sender_id: 'user2', message: 'Hi there!' },
  { group_id: 'group2', sender_id: 'user3', message: 'Hello group 2!' },
]

app.get('/messages/:group_id', (req, res) => {
  const groupId = req.params.group_id
  let page = req.query.page || 1
  let limit = req.query.limit || 10
  let startIndex = (page - 1) * limit
  let endIndex = page * limit
  let paginatedMessages = messages.filter(m => m.group_id === groupId).slice(startIndex, endIndex)

  res.json({
    success: true,
    data: paginatedMessages
  })
})

app.post('/messages', (req, res) => {
  let message = req.body
  messages.push(message)
  res.json({
    success: true,
    message: 'Message was added successfully'
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})