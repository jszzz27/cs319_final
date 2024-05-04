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
    const oneProduct = await Beer.findOne(query);
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
    const oneProduct = await Juice.findOne(query);
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
    const oneProduct = await Soda.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

//-----------------------------------------------------------
  
app.post("/beer/:beerID/review", async (req, res) => {
    const beerID = req.params.beerID;
    const { username, comment, rating } = req.body;

    // Convert beerID from string to number
    const numericBeerID = parseInt(beerID);

    try {
        // Find the beer by ID
        const beer = await BeerProduct.findOne({ beerID: numericBeerID });

        if (!beer) {
            return res.status(404).json({ message: "Beer not found" });
        }

        // Add the new review to the beer's review array
        beer.review.push({ username, comment, rating });

        // Save the updated beer document
        await beer.save();

        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//-----------------------------------------------------------

app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Review.deleteOne(query);
        const messageResponse = {
            message: `Review ${req.body._id} Deleted!`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

//-----------------------------------------------------------

app.put("/update", async (req, res) => {
    console.log("Update :", req.body._id);
    console.log("New Rating :", req.body.rating);

    try{
        const filter = { _id: `${req.body._id}` };
        const updateDoc = { $set: { rating: `${req.body.rating}`} };
        await Review.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Review ${req.body_id} Updated!`
        };
    } catch (err) {
        console.log("Error while updating :" + p_id + " " + err);
    }
});