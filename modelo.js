function Sistema(){
	this.usuarios={}
	this.tecnicos
	this.incidencias
	this.agregarUsuario=function(nick){
		this.usuarios[nick]=new Usuario(nick,this);
	}
}

function Usuario(nick,sistema){
	this.nick=nick;
	this.sistema=sistema;
}

function Tecnico(nick){
	this.nick=nick;
	this.servicio;
}

function Incidencia(){
	this.estado=new Abierta();
	this.servicio
	this.descripcion
	this.fecha=new Date().toDateString();
}

function Abierta(){
	this.nombre="abierta";

}

function Asignada(){
	this.nombre="asignada";

}

function Cerrada(){
	this.nombre="cerrada";

}

