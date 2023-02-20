const mongoose = require("mongoose");

const Note_url = process.env.Note_url;

mongoose.connect(Note_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});