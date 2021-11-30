require("dotenv").config();

const app = require("./src/app");
const port = process.env.PORT || 8786;

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
});