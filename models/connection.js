const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://Antoine:0107ab1997@cluster0.o8qaevo.mongodb.net/hackaton'

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));