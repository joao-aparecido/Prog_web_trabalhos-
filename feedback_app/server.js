const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const feedbacks = [];

// Página inicial
app.get("/", (req, res) => {
    res.render("index");
});

// Enviar feedback
app.post("/feedbacks/enviar", (req, res) => {
    const { nome, comentario } = req.body;

    feedbacks.push({
        nome,
        comentario
    });

    res.redirect("/feedbacks/lista");
});

// Listar feedbacks
app.get("/feedbacks/lista", (req, res) => {
    res.render("lista", { feedbacks });
});

// Remover feedback
app.post("/feedbacks/remover", (req, res) => {
    const { indice } = req.body;

    feedbacks.splice(indice, 1);

    res.redirect("/feedbacks/lista");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});