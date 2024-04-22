const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://goFood:goFood@cluster0.nruzafr.mongodb.net/gofoodmern";

/* const mongodb = () => {
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
}; */


const mongodb = async () => {
    try {
        await mongoose.connect(mongoURL, {  useNewUrlParser: true });
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetched_data;
        const foodCat = await mongoose.connection.db.collection("food_category").find({}).toArray();
        global.food_category = foodCat;
       // console.log(global.food_items);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};



module.exports = mongodb;
