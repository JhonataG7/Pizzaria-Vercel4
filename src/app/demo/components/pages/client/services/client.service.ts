import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'; // Importa classes necessárias do AngularFire para interação com o Firebase Realtime Database
import { map, Observable } from 'rxjs'; // Importa map e Observable do RxJS para manipulação de dados assíncronos
import { Client } from '../models/client.model'; // Importa o modelo Client

export interface Item {
    key?: string;
    name: string;
}

@Injectable({
    providedIn: 'root' // Define que este serviço será injetado globalmente no escopo raiz do aplicativo
})
export class ClientService {
    private dbPath = '/clients'; // Caminho para a coleção 'clients' no Firebase Realtime Database
    clientRef: AngularFireList<Client> = null; // Referência para a lista de clientes

    constructor(private db: AngularFireDatabase) {
        this.clientRef = db.list(this.dbPath); // Inicializa clientRef com a referência para a lista de clientes no Firebase
    }

    // Método para obter a lista de clientes
    getClients(): Observable<Client[]> {
        // Retorna um Observable que emite um array de Client[]
        return this.clientRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) // Transforma os dados recebidos em objetos Client com suas chaves
            )
        );
    }

    // Método para adicionar um novo cliente
    addClient(client: Client): void {
        this.clientRef.push(client); // Adiciona o produto à lista de produtos no Firebase
    }

    // Método para atualizar um cliente existente
    updateClient(key: string, value: any): void {
        this.clientRef.update(key, value).catch(error => this.handleError(error)); // Atualiza o cliente com a chave específica no Firebase
    }

    // Método privado para lidar com erros
    private handleError(error) {
        console.log(error); // Loga o erro no console
    }

    // Método para deletar um cliente
    deleteClient(key: string): void {
        this.clientRef.remove(key); // Remove o cliente com a chave específica do Firebase
    }
}