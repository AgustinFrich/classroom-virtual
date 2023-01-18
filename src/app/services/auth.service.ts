import { Usuario } from './../classes/usuario';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  getAuth,
  sendEmailVerification,
  UserCredential,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  doc,
  Firestore,
  query,
  where,
  collectionData,
  docData,
  getDocs,
  Timestamp,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import {
  ref,
  uploadBytes,
  Storage,
  getDownloadURL,
} from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  emitChangeSource = new Subject<any>();
  usuarioCambio$ = this.emitChangeSource.asObservable();
  usuario?: Usuario;

  constructor(
    private fs: Firestore,
    private auth: AngularFireAuth,
    private router: Router,
    private loading: LoadingService,
    private storage: Storage
  ) {}

  postUsuario(usuario: Usuario, imagen?: File) {
    this.auth
      .createUserWithEmailAndPassword(usuario.mail, usuario.password)
      .then((usr) => {
        this.crearUsuario(usuario, imagen);
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          /*
          Swal.fire(
            'Error al registrar',
            'El correo ya está siendo utilizado por otra cuenta',
            'error'
          );
          */
        }
      });
  }

  async crearUsuario(usuario: Usuario, imagen?: File) {
    if (imagen !== undefined) {
      const filePath =
        `perfiles/${usuario.perfil}` +
        usuario.nombre +
        '-' +
        usuario.apellido +
        Date.now();
      const storageRef0 = ref(this.storage, filePath);
      await uploadBytes(storageRef0, imagen);
      const url = await getDownloadURL(storageRef0);
      usuario.imgPerfil = url;
    }

    const col = collection(this.fs, usuario.perfil);
    const col2 = collection(this.fs, 'Usuarios');
    this.usuario = usuario;
    addDoc(col, { ...usuario });
    addDoc(col2, { ...usuario });
  }

  Cambio() {
    this.auth.onAuthStateChanged(async (user) => {
      this.loading.loading = true;
      if (user !== null) {
        const q = query(
          collection(this.fs, 'Usuarios'),
          where('mail', '==', user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.usuario = doc.data() as Usuario;
        });
        this.Redirigir();
      } else {
        this.emitChangeSource.next(undefined);
        this.router
          .navigateByUrl('', { replaceUrl: true })
          .then(() => (this.loading.loading = false));
      }
      this.loading.loading = false;
    });
  }

  Redirigir() {
    if (this.usuario !== undefined) {
      this.emitChangeSource.next(this.usuario);
      if (this.usuario.perfil === 'Alumno') {
        this.router
          .navigateByUrl('home/alumno')
          .then(() => (this.loading.loading = false));
      } else if (this.usuario.perfil === 'Profesor') {
        this.router
          .navigateByUrl('home/profesor')
          .then(() => (this.loading.loading = false));
      }
    } else {
      this.emitChangeSource.next(undefined);
      this.router
        .navigateByUrl('', { replaceUrl: true })
        .then(() => (this.loading.loading = false));
    }
  }
}
