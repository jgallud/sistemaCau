function Sistema(){
	this.usuarios={}
	this.tecnicos={}
	this.gestor=new Gestor(this);
	this.agregarUsuario=function(nick,rol){
		let res={"res":"nook"};
		if (!this.usuarios[nick]){
				this.usuarios[nick]=new Usuario(nick,rol);
				res={"res":"ok"};
		}
		return res;
	}
	// this.agregarTecnico=function(nick){
	// 	this.tecnicos[nick]=new Tecnico(nick);
	// }
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
	this.obtenerUsuarios=function(){
		let lista=[];
		for (let key in this.usuarios){
			lista.push({"nick":key,"rol":this.usuarios[key].rol});
		}
		return lista;
	}
	this.obtenerTecnicos=function(){
		let lista=[];
		for (let key in this.usuarios){
			if (this.usuarios[key].esTecnico())
			{
				lista.push({"nick":key,"rol":this.usuarios[key].rol});
			}
		}
		return lista;	
	}
	this.obtenerUsuario=function(nick){
		return this.usuarios[nick];
	}
	this.obtenerTecnico=function(nick){
		if (this.usuarios[nick] && this.usuarios[nick].esTecnico()){
			return this.usuarios[nick];	
		}
		return undefined;
	}

}

function Usuario(nick,rol){
	this.nick=nick;
	this.rol=rol;
	this.esTecnico=function(){
		return this.rol=="tecnico";
	}
}

// function Tecnico(nick){
// 	this.nick=nick;
// 	this.servicio;
// }

function Gestor(sistema){
	this.sistema=sistema;
	this.incidencias=[]
	this.crearIncidencia=function(nick,servicio){
		let codigo=-1;
		let incidencia=new Incidencia(nick,servicio);
		codigo=incidencia.cauNum;
		this.incidencias.push(incidencia);
		return codigo;
	}
	this.asignarTecnico=function(codigo,nickTecnico){
		let incidencia=this.incidencias[codigo];
		if (sistema.tecnicos[nickTecnico]){
			incidencia.asignarTecnico(nickTecnico)
		}
	}
	this.cerrarIncidencia=function(codigo,nickTecnico){
		let incidencia=this.incidencias[codigo];
		if (incidencia.tecnico==nickTecnico){
			incidencia.cerrarIncidencia();
		}
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
	this.asignarTecnico=function(nick){
		this.estado.asignarTecnico(nick,this);
	}
	this.cerrarIncidencia=function(){
		this.estado.cerrarIncidencia(this);
	}
}

function Abierta(){
	this.nombre="abierta";
	this.asignarTecnico=function(nick,incidencia){
		incidencia.tecnico=nick;
		incidencia.estado=new Asignada();
	}
	this.cerrarIncidencia=function(incidencia){}
}

function Asignada(){
	this.nombre="asignada";
	this.asignarTecnico=function(nick,incidencia){}
	this.cerrarIncidencia=function(incidencia){
		incidencia.estado=new Cerrada();
	}
}

function Cerrada(){
	this.nombre="cerrada";
	this.asignarTecnico=function(nick,incidencia){}
	this.cerrarIncidencia=function(incidencia){}
}

module.exports.Sistema=Sistema;