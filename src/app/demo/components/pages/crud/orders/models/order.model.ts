// Define uma interface chamada Order
export interface Order {
    // Campo opcional chamado key, que pode ser uma string
    key?: string;

    // Campo obrigatório chamado name, que deve ser uma string
    name: string;

    // Campo obrigatório chamado price, que deve ser um número
    price: number;

    // Campo obrigatório chamado category, que deve ser uma das strings especificadas: 'Pizza', 'Bebida' ou 'Sobremesa'
    category: 'Pizza' | 'Bebida' | 'Sobremesa'; // string
}
