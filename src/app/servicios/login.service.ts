import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private authService: AngularFireAuth) {}

  Login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.auth.signInWithEmailAndPassword(email, password)
      .then(datos => resolve(datos),
      error => reject(error)
      );
    });
  }

  // regresa el usuario que se ha autenticado a la base de datos
  getAuth() {
    return this.authService.authState.pipe(
      map( auth => auth)
    );
  }

  logout() {
    this.authService.auth.signOut();
  }
}
