let modelo=require("./modelo.js");
describe("El sistema CAU...", function() {
  var sistema;
  var us1,us2,us3;

  beforeEach(function() {
    sistema=new modelo.Sistema();
    sistema.agregarUsuario("pepe","normal");
    sistema.agregarUsuario("luis","normal");
    sistema.agregarUsuario("luisa","tecnico");
    us1=sistema.obtenerUsuario("pepe");
    us2=sistema.obtenerUsuario("luis");
    us3=sistema.obtenerUsuario("luisa");
  });

   it("comprobamos los nick de los usuarios", function(){
    expect(us1.nick).toEqual("pepe");
    expect(us2.nick).toEqual("luis");
    expect(us3.nick).toEqual("luisa");
    expect(us3.esTecnico()).toEqual(true);
  });

});