
(async () => {
    const fookie = require("fookie")
    await fookie.use(require("./index"))
    await fookie.use(require("fookie-server"))
    await fookie.listen(3435)
    console.log("Server started");
})()