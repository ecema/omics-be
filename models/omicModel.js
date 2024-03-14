var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var omicSchema = Schema(
  {
    gene: String,
    transcript: String,
    exper_rep1: Number,
    exper_rep2: Number,
    exper_rep3: Number,
    control_rep1: Number,
    control_rep2: Number,
    control_rep3: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("omic", omicSchema);
