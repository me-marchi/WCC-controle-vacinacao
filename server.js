require("dotenv").config();

const app = require("./src/app");
const port = process.env.PORT || 5432;

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
});