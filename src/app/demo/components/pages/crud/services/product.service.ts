import { Injectable } from '@angular/core'; // Importa o decorador Injectable do Angular
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'; // Importa serviços do AngularFire para interação com o banco de dados Firebase
import { map, Observable } from 'rxjs'; // Importa operadores e tipos do RxJS para manipulação de streams de dados reativos
import { Product } from '../models/product.model'; // Importa o modelo Product para tipagem forte

// Define uma interface para Item que inclui opcionalmente uma chave (key) e um nome (name)
export interface Item {
    key?: string;
    name: string;
}

@Injectable({
    providedIn: 'root' // Declara que o serviço será fornecido na raiz do aplicativo
})
export class ProductService {
    private dbPath = '/products'; // Define o caminho no banco de dados Firebase onde os produtos são armazenados
    productRef: AngularFireList<Product> = null; // Referência para a lista de produtos no Firebase

    // Construtor do serviço, injeta uma instância do AngularFireDatabase
    constructor(private db: AngularFireDatabase) {
        this.productRef = db.list(this.dbPath); // Inicializa a referência da lista de produtos com o caminho definido
    }

    // Método para obter a lista de produtos como um Observable
    getProducts(): Observable<Product[]> {
        // Retorna um Observable com as mudanças de snapshot dos produtos
        return this.productRef.snapshotChanges().pipe(
            map(changes =>
                // Mapeia as mudanças para incluir a chave de cada produto no objeto retornado
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    // Método para adicionar um novo produto ao banco de dados
    addProduct(product: Product): void {
        this.productRef.push(product); // Adiciona o produto à lista no Firebase
    }

    // Método para atualizar um produto existente no banco de dados
    updateProduct(key: string, value: any): void {
        this.productRef.update(key, value).catch(error => this.handleError(error)); // Atualiza o produto e captura possíveis erros
    }

    // Método para lidar com erros, atualmente apenas registra o erro no console
    private handleError(error) {
        console.log(error); // Loga o erro no console
    }

    // Método para deletar um produto do banco de dados
    deleteProduct(key: string): void {
        this.productRef.remove(key); // Remove o produto do Firebase usando a chave
    }
}