import express from "express";
import { engine } from "express-handlebars";
import * as fs from "fs";
const app = express();
const port = 3000;
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

const mainHead = fs.readFileSync("./views/custom/mainHead.hbs", "utf8");

app.get("/", (req, res) => {
  res.render("home", { customHead: mainHead });
});

app.get("/calcs", (req, res) => {
  res.send(bitBank);
});

////////////////////////////////////////////////////////
//bitGold business logic
let numberOfPeriods = 500;
let numberOfMiners = 0;
let bitBank = [];
let lastGradeDiff = 100;
let productionFactor = 1;
let periodProdCostAvgs = [];

// for each period
for (let i = 0; i < numberOfPeriods; i++) {
  //get number of miners
  numberOfMiners = Math.floor(Math.random() * 10);
  if (numberOfMiners === 0) {
    numberOfMiners = 1;
  }
  console.log("lastGradeDiff", lastGradeDiff);
  let totalProductionCost = 0;
  //for each miner
  for (let k = 0; k < numberOfMiners; k++) {
    let bitGoldUnit = {
      gradeDifficulty: 0,
      costToProduce: 0,
      pFactor: 0,
      period: 0,
      miner: 0,
    };
    bitGoldUnit.miner = k;
    bitGoldUnit.gradeDifficulty = lastGradeDiff;
    // cost to produce and adjustment
    bitGoldUnit.costToProduce = 100 * productionFactor + 100 - lastGradeDiff;
    totalProductionCost += bitGoldUnit.costToProduce;
    bitGoldUnit.pFactor = productionFactor;
    bitGoldUnit.period = i;
    bitBank.push(bitGoldUnit);
  }
  ////////////////////////////////////////////////////////
  //section for changes in production factor
  //
  // every five periods do something
  //   if (i % 5 === 0) {
  //     productionFactor = productionFactor * 0.5;
  //   }
  productionFactor = productionFactor / 1.01;
  ////////////////////////////////////////////////////////
  // updates for next period
  let avgProductionCost = 0;
  avgProductionCost = totalProductionCost / numberOfMiners;
  lastGradeDiff = avgProductionCost;
  periodProdCostAvgs.push(avgProductionCost);
  ////////////////////////////////////////////////////////
  //loggin/output
  console.log("productionFactor", productionFactor);
  console.log(
    "numberOfMiners",
    numberOfMiners,
    " average prod cost ",
    avgProductionCost
  );
  if (i === numberOfPeriods - 1) {
    bitBank.forEach((bgUnit) => {
      // console.log(bgUnit);
    });
  }
  if (i === numberOfPeriods - 1) {
    periodProdCostAvgs.forEach((avg) => {
      console.log(avg);
    });
  }
  ////////////////////////////////////////////////////////
}

////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
