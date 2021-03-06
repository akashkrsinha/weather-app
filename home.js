const http = require("http")
const fs = require("fs")
var requests = require("requests")

const homeFile = fs.readFileSync("index.html", "utf-8")

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    return temperature
}

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests(
            "{API}"
        )
            .on("data", function (chunk) {
                const objData = JSON.parse(chunk)
                const arrData = [objData]
                // console.log(arrData[0].main.temp);
                const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("")
                res.write(realTimeData)
                console.log(realTimeData);
            })
            .on("end", function (err) {
                if (err) return console.log("connection closed due to errors", err);
                // console.log("end");
                res.end()
            })
    }
})

server.listen(8000, "http://127.0.0.")
