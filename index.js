// MARK: Vars
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 80;
const imgDir = 'public';
const merchantsJsonPath = 'merchants.json';
const productsJsonPath = 'products.json';
const partnershipsJsonPath = 'partnerships.json';
const categoriesJsonPath = 'categories.json';


// MARK: Setup
app.use(express.json());
app.use(cors());
app.use('/'+imgDir, express.static('public'));


// MARK: Test Routes
app.get('/', (req, res) => res.send('Hello World!'));


// MARK: Get Merchant Info
app.get('/merchants/:merchantId', (req, res) => {
    const merchantId = req.params.merchantId;
    try{
        // TODO
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Get Suggested Partnerships
app.get('/partnerships/recommended/:merchantId', (req, res) => {
    const merchantId = req.params.merchantId;
    try{
        // TODO
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Get Merchant Categories
app.get('/categories', (req, res) => {
    try{
        // TODO
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Get Current Partnerships
app.get('/partnerships/:merchantId', (req, res) => {
    const merchantId = req.params.merchantId;
    try{
        // TODO
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Post New Partnership
app.post('/partnerships', (req, res) => {
    const partnershipData = req.body.json;
    try{
        // TODO
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Run Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));