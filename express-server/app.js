// Permite escribir en un fichero
var fs = require("fs");
// Soluciona error CORS
const cors = require('cors');
// Creamos una instancia de express y le decimos que va a usar JSON
var express = require("express");
var app = express();
app.use(express.json());
// Evitar CORS
app.use(cors({
    origin: 'http://localhost:4200'
}));


// Abrimos el puerto de escucha al 3000 y una vez abierto mostramos un mensaje.
app.listen(3000, () => console.log("El servidor está escuchando en el puerto 3000"));

// Devolvemos una respuesta sobre una petición GET
app.get("/url", (req,res,next) =>
    res.json(["Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de Chile"]));

// Creamos una variable JSON
var destinosFichero = "destinos.json";
// Leemos el listado de destinos almacenados en JSON
var misDestinos = JSON.parse(fs.readFileSync(destinosFichero));

// Devolvemos una respuesta sobre una petición GET dinámica
// Parámetros req = request, res = response, next
// Devuelve la petición sobre IP/ciudades
app.get("/ciudades", (req,res,next) => {
    res.json(misDestinos.filter((c)=> c.toLowerCase().indexOf(req.query.q.toString().toLowerCase())> -1));
});

// Devolvemos una respuesta sobre una petición GET dinámica
// Parámetros req = request, res = response, next
app.get("/my", (req,res,next) => res.json(misDestinos));

// Almacenamos un valor de una petición POST
app.post("/destinos", (req,res,next) => {
    // El destino nuevo se introduce en el cuerpo de la petición
    for (const reqElement of req.body) {
        misDestinos.push(reqElement);
    };
    fs.writeFileSync(destinosFichero, JSON.stringify(misDestinos,null,2));
    res.json(misDestinos);
});

// Actualizamos un valor introduciendo su nombre por parámetros
app.put("/destinos/:name", (req,res,next) => {
    // :name corresponde con req.params.name
    let nameIndex = misDestinos.indexOf(req.params.name);
    if(nameIndex>= 0 && req.body != null){
        //El parametro a cambiar se introduce en el cuerpo de la petición
        misDestinos[nameIndex] = req.body[0];
    }
    else {
        res.json(["Error"]);
    }
    fs.writeFileSync(destinosFichero,  JSON.stringify(misDestinos,null,2));
    res.json(misDestinos[nameIndex]);
});
// Borramos un valor introduciendo su nombre por parámetros
app.delete("/destinos/:name", (req,res,next) => {
    // :name corresponde con req.params.name
    let nameIndex = misDestinos.indexOf(req.params.name);
    if(nameIndex>= 0){
        misDestinos.splice(nameIndex,1);
        fs.writeFileSync(destinosFichero,  JSON.stringify(misDestinos,null,2));
        res.json(misDestinos);
    }
    else {
        res.json(["Error"]);
    }
});


app.get("/api/translation", (req, res, next) => res.json([{
  lang: req.query.lang, key: "HOLA", value: "HOLA "+ req.query.lang
}]));