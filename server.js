const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
const customerRoutes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
// db connection 
const db = require('./config/connection');
db.authenticate().then(() => {
    console.log("database connected");
}).catch(err => {
    console.log("error " +err)
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', routes)
app.use('/api', customerRoutes)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})