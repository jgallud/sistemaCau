function Sistema(){
	this.usuarios={}
	this.tecnicos={}
	this.gestor=new Gestor(this);
	this.agregarUsuario=function(nick){
		this.usuarios[nick]=new Usuario(nick);
	}
	this.agregarTecnico=function(nick){
		this.tecnicos[nick]=new Tecnico(nick);
	}
	this.crearIncidencia=function(nick,servicio){
		let codigo=-1;
		if (this.usuarios[nick]){
			codigo=this.gestor.crearIncidencia(nick,servicio,this)
		}
		return codigo;
	}
	this.asignarServicio=function(nick,servicio){
		this.tecnicos[nick].servicio=servicio;
	}
}

function Usuario(nick){
	this.nick=nick;
}

function Tecnico(nick){
	this.nick=nick;
	this.servicio;
}

function Gestor(sistema){
	this.sistema=sistema;
	this.incidencias={}
	this.crearIncidencia=function(nick,servicio){
		let codigo=-1;
		let incidencia=new Incidencia(nick,servicio);
		codigo=incidencia.cauNum;
		this.incidencias[codigo]=incidencia;
		return codigo;
	}
	this.asignarTecnico=function(codigo,nickTecnico){
		let incidencia=this.incidencias[codigo];
		incidencia.asignarTecnico(nickTecnico,this)
	}
}

function Incidencia(nick,servicio){
	this.nick=nick;
	this.estado=new Abierta();
	this.servicio=servicio;
	this.cauNum=Date.now().toString();
	this.descripcion
	this.fecha=new Date().toDateString();
	this.tecnico;
	this.asignarTecnico=function(nick,gestor){
		this.estado.asignarTecnico(nick,this);
	}
}

function Abierta(){
	this.nombre="abierta";
	this.asignarTecnico=function(nick,incidencia){
		incidencia.tecnico=nick;
		incidencia.estado=new Asignada();
	}
}

function Asignada(){
	this.nombre="asignada";
	this.asignarTecnico=function(nick,incidencia){}
}

function Cerrada(){
	this.nombre="cerrada";
	this.asignarTecnico=function(nick,incidencia){}
}

