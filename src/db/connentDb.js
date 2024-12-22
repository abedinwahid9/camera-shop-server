const mongoose = require("mongoose");
require("dotenv").config();
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const getConnectionStrings = () => {
  let connectUrl;

  if ((process.env.NODE_ENV = "development")) {
    connectUrl = process.env.DATABASE_LOCAL;
    connectUrl = connectUrl.replace("<db_username>", process.env.DATABASE_USER);
    connectUrl = connectUrl.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );
  } else {
    process.env.DATABASE_PROD;
  }

  return connectUrl;
};

const connectDb = async () => {
  const uri = getConnectionStrings();
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
};

module.exports = connectDb;
