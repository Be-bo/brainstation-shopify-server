// MARK: Vars
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
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
app.get('/merchants/:merchantId', async (req, res) => {
    const merchantId = req.params.merchantId;
    try{
        const merchantsJson = await fs.promises.readFile(merchantsJsonPath, 'utf-8');
        const parsedMerchants = JSON.parse(merchantsJson);
        const targetMerchant = parsedMerchants.filter((merchant) => merchant.merchant_id == merchantId);
        console.log('Successfully returned GET merchant: ', targetMerchant[0]);
        res.status(200).json(targetMerchant[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Get Merchant Categories
app.get('/categories', async (req, res) => {
    try{
        const categoriesJson = await fs.promises.readFile(categoriesJsonPath, 'utf-8');
        const parsedCategories = JSON.parse(categoriesJson);
        console.log('Successfully returned list of categories: ', parsedCategories);
        res.status(200).json(parsedCategories);
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Get Current Partnerships
app.get('/partnerships/:merchantId', async (req, res) => {
    const merchantId = req.params.merchantId;
    try{

        const partnershipsJson = await fs.promises.readFile(partnershipsJsonPath, 'utf-8');
        const parsedPartnerships = JSON.parse(partnershipsJson);
        const merchantPartnerships = parsedPartnerships.filter((partnership) => partnership.merchant_ids.includes(parseInt(merchantId)));
        console.log('Successfully returned partnerships for merchant id ', merchantId, ': ', merchantPartnerships);
        res.status(200).json(merchantPartnerships);
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Get Merchant Products
app.get('/merchant/products/:merchantId', async (req, res) => {
    const merchantId = req.params.merchantId;
    try{
        const productsJson = await fs.promises.readFile(productsJsonPath, 'utf-8');
        const parsedProducts = JSON.parse(productsJson);
        const productList = parsedProducts.filter((product) => product.merchant_id == merchantId);
        console.log('Successfully returned product list for merchant ', merchantId, ': ', productList);
        res.status(200).json(productList);
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Post New Partnership
app.post('/partnerships', async (req, res) => {
    let partnershipData = req.body;
    try{
        const partnershipsJson = await fs.promises.readFile(partnershipsJsonPath, 'utf-8');
        let parsedPartnerships = JSON.parse(partnershipsJson);
        partnershipData.partnership_id = parsedPartnerships.length+1;
        parsedPartnerships.push(partnershipData);
        await fs.promises.writeFile(partnershipsJsonPath, JSON.stringify(parsedPartnerships, null, 2));
        console.log('Successfully posted new partnership: ', partnershipData);
        res.status(200).json({message: 'Successfully added a new partnership.',});
    }catch(error){
        console.log(error);
        res.status(500).json({error});
    }
});


// MARK: Run Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));