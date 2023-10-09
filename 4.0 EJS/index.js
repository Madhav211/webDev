import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const d = new Date();
    let day = d.getDay();
    let s = 'weekend';
    let sug = "time to work hard";
    if (day == 7) {
        s = 'weekday';
        sug = "Have fun!!";
    }
    res.render("index.ejs", {
        dayType: `${s}`,
        advice: `${sug}`,
    });
});

app.listen(port, () => {
    console.log(`Server Running on ${port}`);
});