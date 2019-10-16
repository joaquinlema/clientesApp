import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../modelo/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteServicio {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;


  constructor(private db: AngularFirestore) { // para traer los elementos de firestore
    // solicitamos la coleccion de clientes de firestore, tenemos clientes y configuracion
    this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  getClientes(): Observable<Cliente[]> {
    // obtenemos los clientes
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map( accion => {
          // tslint:disable-next-line: max-line-length
          const datos = accion.payload.doc.data() as Cliente; // payload son los valores por cada campo en firestore existe el id y el payload
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );

    return this.clientes;
  }
}
