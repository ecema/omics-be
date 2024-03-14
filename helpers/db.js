// ecemafacan3
// m1dq9Z6JHtPIf4Sm
// npm install mongodb
// mongodb+srv://ecemafacan3:<password>@cluster0.wijkgh0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DBURL = process.env.DBURL;
module.exports = () => {
  mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  });

  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB: Error", err);
  });

  mongoose.Promise = global.Promise;
};
