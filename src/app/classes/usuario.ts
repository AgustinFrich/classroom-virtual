export class Usuario {
  nombre: string;
  apellido: string;
  imgPerfil: string;
  perfil: string;
  mail: string;
  password: string;
  clases: string[];

  constructor(
    nombre: string,
    apellido: string,
    mail: string,
    password: string,
    imgPerfil: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.password = password;
    this.imgPerfil = imgPerfil;
    this.perfil = '';
    this.clases = [];
  }
}
