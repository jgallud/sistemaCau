const fs=require("fs");
const express = require('express');
const app = express();
const modelo = require("./servidor/modelo.js");

const PORT = process.env.PORT || 3000;

let sistema = new modelo.Sistema();

app.use(express.static(__dirname + "/"));

app.get("/", function(request,response){
  var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
  response.setHeader("Content-type","text/html");
  response.send(contenido);
});

app.get("/agregarUsuario/:nick",function(request,response){
  let nick = request.params.nick;
  let res=sistema.agregarUsuario(nick,"normal");
  response.send(res); 
});

app.get("/agregarTecnico/:nick",function(request,response){
  let nick = request.params.nick;
  let res=sistema.agregarUsuario(nick,"tecnico");
  response.send(res); 
});

app.get("/obtenerUsuarios",function(request,response){
  let lista=sistema.obtenerUsuarios();
  response.send(lista);
});

app.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${PORT}`);
  console.log('Ctrl+C para salir');
});