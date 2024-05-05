const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Water = require('./dataSchemaWater.js');
const Beer = require('./dataSchemaBeer.js');
const Juice = require('./dataSchemaJuice.js');
const Soda = require('./dataSchemaSoda.js');

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

app.get("/water/review/:waterID", async (req, resp) => {
    try {
        const waterID = req.params.waterID;
        const water = await Water.findOne({ waterID: waterID });
        if (!water) {
            return resp.status(404).json({ message: "Water not found" });
        }
        const reviews = water.review;
        resp.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching water reviews:", error);
        resp.status(500).json({ error: "Internal server error" });
    }
});

app.get("/beer", async (req, resp) => {
    const query = {};
    const allProducts = await Beer.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/beer/review/:beerID", async (req, resp) => {
    try {
        const beerID = req.params.beerID;
        const beer = await Beer.findOne({ beerID: beerID });
        if (!beer) {
            return resp.status(404).json({ message: "Beer not found" });
        }
        const reviews = beer.review;
        resp.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching beer reviews:", error);
        resp.status(500).json({ error: "Internal server error" });
    }
});

app.get("/juice", async (req, resp) => {
    const query = {};
    const allProducts = await Juice.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/juice/review/:juiceID", async (req, resp) => {
    try {
        const juiceID = req.params.juiceID;
        const juice = await Juice.findOne({ juiceID: juiceID });
        if (!juice) {
            return resp.status(404).json({ message: "Juice not found" });
        }
        const reviews = juice.review;
        resp.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching juice reviews:", error);
        resp.status(500).json({ error: "Internal server error" });
    }
});

app.get("/soda", async (req, resp) => {
    const query = {};
    const allProducts = await Soda.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/soda/review/:sodaID", async (req, resp) => {
    try {
        const sodaID = req.params.sodaID;
        const soda = await Soda.findOne({ sodaID: sodaID });
        if (!soda) {
            return resp.status(404).json({ message: "Soda not found" });
        }
        const reviews = soda.review;
        resp.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching soda reviews:", error);
        resp.status(500).json({ error: "Internal server error" });
    }
});

//-----------------------------------------------------------
  
app.post("/beer/review/:beerID", async (req, res) => {
    const beerID = req.params.beerID;
    const { username, comment, rating } = req.body;
    const numericBeerID = parseInt(beerID);

    try {
        const beer = await Beer.findOne({ beerID: numericBeerID });

        if (!beer) {
            return res.status(404).json({ message: "Beer not found" });
        }

        beer.review.push({ username, comment, rating });
        await beer.save();

        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/soda/review/:sodaID", async (req, res) => {
    const sodaID = req.params.sodaID;
    const { username, comment, rating } = req.body;
    const numericSodaID = parseInt(sodaID);

    try {
        const soda = await Soda.findOne({ sodaID: numericSodaID });

        if (!soda) {
            return res.status(404).json({ message: "Soda not found" });
        }

        soda.review.push({ username, comment, rating });
        await soda.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/water/review/:waterID", async (req, res) => {
    const waterID = req.params.waterID;
    const { username, comment, rating } = req.body;
    const numericWaterID = parseInt(waterID);

    try {
        const water = await Water.findOne({ waterID: numericWaterID });

        if (!water) {
            return res.status(404).json({ message: "Water not found" });
        }

        water.review.push({ username, comment, rating });
        await water.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/juice/review/:juiceID", async (req, res) => {
    const juiceID = req.params.juiceID;
    const { username, comment, rating } = req.body;
    const numericJuiceID = parseInt(juiceID);

    try {
        const juice = await Juice.findOne({ juiceID: numericJuiceID });

        if (!juice) {
            return res.status(404).json({ message: "Juice not found" });
        }

        juice.review.push({ username, comment, rating });
        await juice.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error("Error while adding a new review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/beer/create", async (req, res) => {
    console.log(req.body);
    const pbeerID = req.body.beerID;
    const ptitle = req.body.title;
    const purl = req.body.url;
    const pdescription = req.body.description;
    const pCal = req.body.Cal;
    const pCarb = req.body.Carb;
    const pAlc = req.body.Alc;
    const formData = new Beer({
        beerID: pbeerID,
        title: ptitle,
        url: purl,
        description: pdescription,
        Cal: pCal,
        Carb: pCarb,
        Alc: pAlc,
        Review : [],
    });
    try {
        await Beer.create(formData);
        const messageResponse = { message: `Product ${ptitle} Added!` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.post("/water/create", async (req, res) => {
    console.log(req.body);
    const pwaterID = req.body.waterID;
    const ptitle = req.body.title;
    const purl = req.body.url;
    const pdescription = req.body.description;
    const pbottled = req.body.bottled;
    const formData = new Water({
        waterID: pwaterID,
        title: ptitle,
        url: purl,
        description: pdescription,
        bottled: pbottled,
        Review : [],
    });
    try {
        await Water.create(formData);
        const messageResponse = { message: `Product ${ptitle} Added!` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.post("/soda/create", async (req, res) => {
    console.log(req.body);
    const psodaID = req.body.sodaID;
    const ptitle = req.body.title;
    const purl = req.body.url;
    const pdescription = req.body.description;
    const pCal = req.body.Cal;
    const pSug = req.body.Sug;
    const pCaf = req.body.Caf;
    const formData = new Soda({
        sodaID: psodaID,
        title: ptitle,
        url: purl,
        description: pdescription,
        Cal: pCal,
        Sug: pSug,
        Caf: pCaf,
        Review: [],
    });
    try {
        await Soda.create(formData);
        const messageResponse = { message: `Product ${ptitle} Added!` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.post("/juice/create", async (req, res) => {
    console.log(req.body);
    const pjuiceID = req.body.juiceID;
    const ptitle = req.body.title;
    const purl = req.body.url;
    const pdescription = req.body.description;
    const pCal = req.body.Cal;
    const pSug = req.body.Sug;
    const formData = new Juice({
        juiceID: pjuiceID,
        title: ptitle,
        url: purl,
        description: pdescription,
        Cal: pCal,
        Sug: pSug,
        Review: [],
    });
    try {
        await Juice.create(formData);
        const messageResponse = { message: `Product ${ptitle} Added!` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

//----------------------------------------------------------------------

app.delete("/beer/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { beerID: req.body.beerID };
        await Beer.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body.beerID} Deleted!`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + pbeerID + " " + err);
    }
});

app.delete("/water/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { waterID: req.body.waterID };
        await Water.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body.waterID} Deleted!`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + pwaterID + " " + err);
    }
});

app.delete("/soda/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { sodaID: req.body.sodaID };
        await Soda.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body.sodaID} Deleted!`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + psodaID + " " + err);
    }
});

app.delete("/juice/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { juiceID: req.body.juiceID };
        await Juice.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body.juiceID} Deleted!`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + pjuiceID + " " + err);
    }
});

//-----------------------------------------------------------

app.put("/beer/update", async (req, res) => {
    try{
        const filter = { beerID: `${req.body.beerID}` };
        const updateDoc = { $set: { Cal: `${req.body.Cal}`, Carb: `${req.body.Carb}`, Alc: `${req.body.Alc}`} };
        await Beer.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Product ${req.body.beerID} Updated!`
        };
    } catch (err) {
        console.log("Error while updating : " + err);
    }
});

app.put("/water/update", async (req, res) => {
    try{
        const filter = { waterID: `${req.body.waterID}` };
        const updateDoc = { $set: { bottled: `${req.body.bottled}`} };
        await Water.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Product ${req.body.waterID} Updated!`
        };
    } catch (err) {
        console.log("Error while updating : " + err);
    }
});

app.put("/soda/update", async (req, res) => {
    try{
        const filter = { sodaID: `${req.body.sodaID}` };
        const updateDoc = { $set: { Cal: `${req.body.Cal}`, Sug: `${req.body.Sug}`, Caf: `${req.body.Caf}`} };
        await Soda.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Product ${req.body.sodaID} Updated!`
        };
    } catch (err) {
        console.log("Error while updating : " + err);
    }
});

app.put("/juice/update", async (req, res) => {
    try{
        const filter = { juiceID: `${req.body.juiceID}` };
        const updateDoc = { $set: { Cal: `${req.body.Cal}`, Sug: `${req.body.Sug}`} };
        await Juice.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Product ${req.body.juiceID} Updated!`
        };
    } catch (err) {
        console.log("Error while updating : " + err);
    }
});