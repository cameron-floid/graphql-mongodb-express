const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./graphql/Schema");
const resolvers = require("./graphql/Resolvers");

const app = express();

// connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/graphql-api")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(error => {
        console.log("Error connecting to the database:", error);
    });

app.use(
    "/",
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true // Enable GraphiQL for easy testing
    })
);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});