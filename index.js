const express = require('express')
const bodyParser =require('body-parser');
const cors = require('cors');
const port = 4000



const app = express()
app.use(cors());
app.use(bodyParser.json());


const password ='ababianHorse12'


const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');
const uri = "mongodb+srv://arabina:ababianHorse12@cluster0.nw3yj.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");
  app.post('/addBooking',(req,res) =>{
        const newBooking = req.body;
        bookings.insertOne(newBooking)
        .then(result =>{
             res.send(result.insertedCount >0)
        })
        console.log(newBooking); 
  })
  app.get('/bookings', (req,res) =>{
      // console.log(req.query.email);

        bookings.find({email: req.query.email})
        .toArray((err, documents)=>{
              res.send(documents)
        })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port);