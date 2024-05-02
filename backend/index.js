const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Water = require('./dataSchemaWater.js');
const Beer = require('./dataSchemaBeer.js');
const Juice = require('./dataSchemaJuice.js');
const Soda = require('./dataSchemaSoda.js');
const Review = require('./dataSchemaReview.js');

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata",
    {
        dbName: "reactdata",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const port = process.env.PORT || 4000;
const host = "localhost";

app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});

//-----------------------------------------------------------

app.get("/water", async (req, resp) => {
    const query = {};
    const allProducts = await Water.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/water/:waterID", async (req, resp) => {
    const waterID = req.params.waterID;
    const query = { waterID : waterID };
    const oneProduct = await Water.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.get("/beer", async (req, resp) => {
    const query = {};
    const allProducts = await Beer.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/beer/:beerID", async (req, resp) => {
    const beerID = req.params.beerID;
    const query = { beerID : beerID };
    const oneProduct = await Water.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.get("/juice", async (req, resp) => {
    const query = {};
    const allProducts = await Juice.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/juice/:juiceID", async (req, resp) => {
    const juiceID = req.params.juiceID;
    const query = { waterID : juiceID };
    const oneProduct = await Water.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.get("/soda", async (req, resp) => {
    const query = {};
    const allProducts = await Soda.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/soda/:sodaID", async (req, resp) => {
    const sodaID = req.params.sodaID;
    const query = { waterID : sodaID };
    const oneProduct = await Water.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.get("/:productName", async (req, resp) => {
    const productName = req.params.productName;
    const query = { productName: productName};
    const allReviewsByProduct = await Review.find(query);
    console.log(allReviewsByProduct);
    resp.send(allReviewsByProduct);
});

//-----------------------------------------------------------

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const ptitle = req.body.title;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pcategory = req.body.category;
    const pimage = req.body.image;
    const prate = req.body.rating.rate;
    const pcount = req.body.rating.count;
    const formData = new Product({
        _id: p_id,
        title: ptitle,
        price: pprice,
        description: pdescription,
        category: pcategory,
        image: pimage,
        rating: { rate: prate, count: pcount },
    });
    try {
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} Added!` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body._id} Deleted!`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

app.put("/update", async (req, res) => {
    console.log("Update :", req.body._id);
    console.log("New Price :", req.body.price);

    try{
        const filter = { _id: `${req.body._id}` };
        const updateDoc = { $set: { price: `${req.body.price}`} };
        await Product.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Product ${req.body_id} Updated!`
        };
    } catch (err) {
        console.log("Error while updating :" + p_id + " " + err);
    }
});