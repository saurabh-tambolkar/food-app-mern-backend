const mongoose = require('mongoose');
const mongo_url = 'mongodb+srv://food-app:food-app-mern-2013@food-app-cluster.eoquetx.mongodb.net/food-app-mern-db';

const connect_mongoDb=async()=>{
    mongoose.connect(mongo_url).then(async()=>{

        console.log("database connected successfully");
        const food_schema = new mongoose.Schema({});
        const food_model = mongoose.model("food_items",food_schema);
        const dataI = await food_model.find({});
        // console.log(dataI)

        // const food_schema_cat = new mongoose.Schema({
        //     CategoryName:String
        // });
        // const food_model_cat = mongoose.model("food_category",food_schema_cat);
        // const dataC = await food_model_cat.find({});
       
        // console.log(dataC);

        if(dataI){
            global.food_items = dataI;
            // global.food_category = dataC;
            // console.log(global.food_items);
        }
        else{
            console.log("no data");
        }

    }).catch((err)=>{
        console.log("there is an error"+err);
    })
}
module.exports = connect_mongoDb;

//configuration fil for db