var express = require("express");
var router = express.Router();
var omic = require("../models/omicModel");

router.get("/", function (req, res) {
  let geneList = req.query.geneList.replaceAll(" ", "").split(",");
  req.query.geneList?.length > 0
    ? omic
        .find({ gene: { $in: geneList } })
        .then((response) => {
          res.json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    : omic
        .find()
        .then((response) => {
          res.json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
});

router.get("/:id", function (req, res) {
  omic
    .find({ _id: req.params.id })
    .then((response) => {
      const variableArr = [
        response[0].exper_rep1,
        response[0].exper_rep2,
        response[0].exper_rep3,
        response[0].control_rep1,
        response[0].control_rep2,
        response[0].control_rep3,
      ];

      const mean = (arr) => {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
          total += arr[i];
        }
        return total / arr.length;
      };

      const median = (arr) => {
        const { length } = arr;
        arr.sort((a, b) => a - b);
        if (length % 2 === 0) {
          return (arr[length / 2 - 1] + arr[length / 2]) / 2;
        }
        return arr[(length - 1) / 2];
      };

      const mode = (arr) => {
        const mode = {};
        let max = 0,
          count = 0;
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          if (mode[item]) {
            mode[item]++;
          } else {
            mode[item] = 1;
          }
          if (count < mode[item]) {
            max = item;
            count = mode[item];
          }
        }
        return max;
      };

      const values = {
        gene: response[0].gene,
        mean: mean([...variableArr]),
        median: median([...variableArr]),
        mode: mode([...variableArr]),
      };
      res.json(values);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
