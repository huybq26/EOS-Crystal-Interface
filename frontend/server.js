const express = require('express')
const connectDB = require('./config/db')
const app = express()

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'))

//Define routes
app.use("/api/users", require('./routes/api/users'))
app.use("/api/auth", require('./routes/api/auth'))
app.use("/api/profile", require('./routes/api/profile'))
app.use("/api/posts", require('./routes/api/posts'))

const PORT = process.env.PORT || 5000 //look for a local environment called PORT to use when we deploy to Heroku, which will get the port number

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))