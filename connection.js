const { url } = require("inspector");
const mongoose = require("mongoose");


const ConnectDb = async(url) => {
await mongoose.connect(url)
.catch(() => {
    console.log('unable to connect');
});
};

module.exports = {ConnectDb};

