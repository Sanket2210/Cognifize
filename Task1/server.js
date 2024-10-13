const express = require('express');
const app = express();
const port = 8800;
const path = require('path')
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    
    const data = {
        pageTitle:"resgistration",
        message: `thanks for the registration ${req.body.name}`,

        
        };
     return res.json(data)

});


app.listen(port, ()=>{
    console.log(`Server is connected to the port ${port}`);
})