import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  successMsg: string;
  errorMsg: string;

  constructor(
    private service: ClientesService,
    private router: Router) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe( resposta => this.clientes = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  prepareToDelete(cliente : Cliente){
    this.clienteSelecionado = cliente;
  }

  deleteClient(){
    this.service
      .delete(this.clienteSelecionado)
      .subscribe(
        response => {
          this.successMsg = 'Cliente deletado com sucesso!',
          this.ngOnInit()
        },
        error => this.errorMsg = 'Ocorreu um erro ao deletar o cliente.'
      );
  }
}
