// Importa o decorador Injectable do módulo @angular/core
import { Injectable } from '@angular/core';

// Importa AngularFireDatabase e AngularFireList do módulo @angular/fire/compat/database
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

// Importa map e Observable do módulo rxjs
import { map, Observable } from 'rxjs';

// Importa a interface Order do arquivo order.model na pasta models
import { Order } from '../models/order.model';

// Utiliza o decorador Injectable para indicar que este serviço pode ser injetado em outros componentes ou serviços
@Injectable({
    providedIn: 'root'
})
// Declaração da classe OrderService que contém métodos para manipular pedidos no banco de dados
export class OrderService {
    // Define um caminho para a referência do banco de dados
    private dbPath = '/orders';

    // Declara uma referência de lista do tipo AngularFireList<Order>
    orderRef: AngularFireList<Order> = null;

    // O construtor injeta uma instância de AngularFireDatabase
    constructor(private db: AngularFireDatabase) {
        this.orderRef = db.list(this.dbPath);
    }

    // Método para obter a lista de pedidos como um Observable
    getOrders(): Observable<Order[]> {
        return this.orderRef.snapshotChanges().pipe(
            // Mapeia as mudanças para incluir a chave do pedido no objeto de retorno
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    // Método para adicionar um novo pedido à lista
    addOrder(order: Order): void {
        this.orderRef.push(order);
    }

    // Método para atualizar um pedido existente
    updateOrder(key: string, value: any): void {
        this.orderRef.update(key, value).catch(error => this.handleError(error));
    }

    // Método para deletar um pedido da lista
    deleteOrder(key: string): void {
        this.orderRef.remove(key).catch(error => this.handleError(error));
    }

    // Método privado para tratar erros
    private handleError(error: any): void {
        console.error('Erro ao interagir com o banco de dados: ', error);
    }
}

/*
// Importa o decorador Injectable do módulo @angular/core
// Injectable é usado para que o serviço possa ser injetado em componentes ou outros serviços.
import { Injectable } from '@angular/core';

// Importa AngularFireDatabase e AngularFireList do módulo @angular/fire/compat/database
// AngularFireDatabase é usado para interagir com o Firebase Realtime Database.
// AngularFireList é uma lista tipada de itens do banco de dados.
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

// Importa map e Observable do módulo rxjs
// map é um operador usado para transformar os valores emitidos por um Observable.
// Observable é usado para trabalhar com fluxos assíncronos de dados.
import { map, Observable } from 'rxjs';

// Importa a interface Order do arquivo order.model na pasta models
// Order é a estrutura que descreve um pedido.
import { Order } from '../models/order.model';

// Utiliza o decorador Injectable para indicar que este serviço pode ser injetado em outros componentes ou serviços
@Injectable({
    providedIn: 'root'
})
// Declaração da classe OrderService que contém métodos para manipular pedidos no banco de dados
export class OrderService {
    // Define um caminho para a referência do banco de dados
    // dbPath é o caminho no banco de dados onde os pedidos estão armazenados.
    private dbPath = '/orders';

    // Declara uma referência de lista do tipo AngularFireList<Order> e inicializa com null
    // orderRef é uma referência à lista de pedidos no banco de dados.
    orderRef: AngularFireList<Order> = null;

    // O construtor injeta uma instância de AngularFireDatabase
    // O construtor inicializa a orderRef com a lista de pedidos no caminho dbPath.
    constructor(private db: AngularFireDatabase) {
        this.orderRef = db.list(this.dbPath);
    }

    // Método para obter a lista de pedidos como um Observable
    // getOrders retorna um Observable que emite uma lista de pedidos.
    getOrders(): Observable<Order[]> {
        return this.orderRef.snapshotChanges().pipe(
            // Mapeia as mudanças para incluir a chave do pedido no objeto de retorno
            // Cada mudança é mapeada para incluir a chave do pedido junto com seus dados.
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    // Método para adicionar um novo pedido à lista
    // addOrder adiciona um novo pedido à lista no banco de dados.
    addOrder(order: Order): void {
        this.orderRef.push(order);
    }

    // Método para atualizar um pedido existente
    // updateOrder atualiza um pedido existente com um novo valor.
    updateOrder(key: string, value: any): void {
        // Se houver um erro durante a atualização, handleError é chamado.
        this.orderRef.update(key, value).catch(error => this.handleError(error));
    }

    // Método privado para tratar erros
    // handleError simplesmente loga o erro no console.
    private handleError(error) {
        console.log(error);
    }

    // Método para deletar um pedido da lista
    // deleteOrder remove um pedido da lista no banco de dados.
    deleteOrder(key: string): void {
        this.orderRef.remove(key);
    }
}
*/