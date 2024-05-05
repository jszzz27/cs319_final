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
    const { id, username, comment, rating } = req.body;
    const numericBeerID = parseInt(beerID);

    try {
        const beer = await Beer.findOne({ beerID: numericBeerID });

        if (!beer) {
            return res.status(404).json({ message: "Beer not found" });
        }

        beer.review.push({ id, username, comment, rating });
        await beer.save();

        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/soda/:sodaID/review", async (req, res) => {
    const sodaID = req.params.sodaID;
    const { id, username, comment, rating } = req.body;
    const numericSodaID = parseInt(sodaID);

    try {
        const soda = await Soda.findOne({ sodaID: numericSodaID });

        if (!soda) {
            return res.status(404).json({ message: "Soda not found" });
        }

        soda.review.push({ id, username, comment, rating });
        await soda.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/water/:waterID/review", async (req, res) => {
    const waterID = req.params.waterID;
    const { id, username, comment, rating } = req.body;
    const numericWaterID = parseInt(waterID);

    try {
        const water = await Water.findOne({ waterID: numericWaterID });

        if (!water) {
            return res.status(404).json({ message: "Water not found" });
        }

        water.review.push({ id, username, comment, rating });
        await water.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/juice/:juiceID/review", async (req, res) => {
    const juiceID = req.params.juiceID;
    const { id, username, comment, rating } = req.body;
    const numericJuiceID = parseInt(juiceID);

    try {
        const juice = await Juice.findOne({ juiceID: numericJuiceID });

        if (!juice) {
            return res.status(404).json({ message: "Juice not found" });
        }

        juice.review.push({ id, username, comment, rating });
        await juice.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/beer/create", async (req, res) => {
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

//----------------------------------------------------------------------

app.delete("/delete/beer/:bearID", async (req, res) => {
    const beerID = req.params.beerID;
    const query = { beerID : beerID };

    try {
        const oneProduct = await Beer.deleteOne(query);

        if (!oneProduct) {
            return res.status(404).json({ message: "Beer not found" });
        }

        res.send(oneProduct);
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while deleting a beer product:", error);
        res.status(500).json({ error: "Internal server error" });
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