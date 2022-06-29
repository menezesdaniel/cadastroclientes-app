import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoAtual: ServicoPrestado;  
  sucesso: boolean = false;
  errors: String[];

  constructor(
    private clienteService : ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
    ) {
      this.servicoAtual = new ServicoPrestado();
    }


  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe( response => this.clientes = response );
  }

  onSubmit(){
      this.servicoPrestadoService.salvar(
        this.servicoAtual).subscribe( response => {
          this.sucesso = true;
          this.errors = null;
          this.servicoAtual = new ServicoPrestado();
        }, errorResponse => {
          this.sucesso = false;
          this.errors = errorResponse.error.errors;
        })
  }

}
