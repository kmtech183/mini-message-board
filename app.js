const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/index.js");

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

//set engine view
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", indexRouter);

// 404 handler (no route matched)
app.use((req, res) => {
  res.status(404).render("error", { message: "Page not found" });
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(500).render("error", { message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
