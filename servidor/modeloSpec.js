let modelo=require("./modelo.js");
describe("El sistema CAU...", function() {
  var sistema;
  var us1,us2;

  beforeEach(function() {
    sistema=new modelo.Sistema();
    sistema.agregarUsuario("pepe");
    sistema.agregarUsuario("luis");
    us1=sistema.usuarios["pepe"];
    us2=sistema.usuarios["luis"];
  });

   it("comprobamos los nick de los usuarios", function(){
    expect(us1.nick).toEqual("pepe");
    expect(us2.nick).toEqual("luis");
  });

});