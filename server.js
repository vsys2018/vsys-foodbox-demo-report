const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const configs = require("./configs");
const { Server } = require("http");
const { MongoClient } = require("mongodb");

// APP
const app = express();

app.use("/", express.static(path.join(__dirname + "/src")));
app.use(bodyParser.json());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/src");

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/api/dathang", (req, res) => {
  MongoClient.connect(configs.mongouri, { useNewUrlParser: true }, (cnnError, client) => {
    if (cnnError) {
      res.json({ error: cnnError.message, type: "Connection Error" });
      return;
    }
    let db = client.db();

    db.collection(configs.collection1, (colError, col) => {
      if (colError) {
        res.json({ error: cnnError.message, type: "Collection Error" });
        return;
      }

      col
        .aggregate([
          {
            $match: {
              t: {
                $gte: new Date(req.body.fromdate),
                $lt: new Date(req.body.todate)
              }
            }
          },
          { $project: { _id: 0 } }
        ])
        .toArray((errData, docs) => {
          if (errData) res.json(new Error(errData));
          res.json(docs);
        });
    });
  });
});

app.post("/api/layhang", (req, res) => {
  MongoClient.connect(configs.mongouri, { useNewUrlParser: true }, (cnnError, client) => {
    if (cnnError) {
      res.json({ error: cnnError.message, type: "Connection Error" });
      return;
    }
    let db = client.db();

    db.collection(configs.collection2, (colError, col) => {
      if (colError) {
        res.json({ error: cnnError.message, type: "Collection Error" });
        return;
      }
      col
        .aggregate([
          {
            $match: {
              t: {
                $gte: new Date(req.body.fromdate),
                $lt: new Date(req.body.todate)
              }
            }
          },
          { $project: { _id: 0 } }
        ])
        .toArray((errData, docs) => {
          if (errData) res.json(new Error(errData));
          res.json(docs);
        });
    });
  });
});

app.post("/api/nhanvien", (req, res) => {
  MongoClient.connect(configs.mongouri, { useNewUrlParser: true }, (cnnError, client) => {
    if (cnnError) {
      res.json({ error: cnnError.message, type: "Connection Error" });
      return;
    }
    let db = client.db();

    db.collection(configs.collection3, (colError, col) => {
      if (colError) {
        res.json({ error: cnnError.message, type: "Collection Error" });
        return;
      }
      col
        .aggregate([
          {
            $match: {
              t: {
                $gte: new Date(req.body.fromdate),
                $lt: new Date(req.body.todate)
              }
            }
          },
          { $project: { _id: 0 } }
        ])
        .toArray((errData, docs) => {
          if (errData) res.json(new Error(errData));
          res.json(docs);
        });
    });
  });
});

// SERVER
const server = Server(app);
server.listen(configs.appport, () => {
  console.log("Server init on port: " + configs.appport);
});
