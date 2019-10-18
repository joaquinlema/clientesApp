import { Component, OnInit } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
  }

  getSaldoTotal() {
    let saldoTotal = 0;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  // value cada uno de los elementos del form
  agregar({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor complete el formulario correctamente', {
        cssClass: 'alert-danger', tiemout: 4000
      });
    } else {
      // agregamos el metodo en el servicio
    }
  }
}
