// Importa NgModule do módulo @angular/core
import { NgModule } from '@angular/core';

// Importa RouterModule e Routes do módulo @angular/router
import { RouterModule, Routes } from '@angular/router';

// Importa o componente OrderComponent do arquivo order.component
import { OrderComponent } from './order.component';

// Define um array de rotas para o módulo de pedidos
const routes: Routes = [
    // Define uma rota com o caminho vazio que carrega OrderComponent
    { path: '', component: OrderComponent }
];

// Declara um módulo Angular chamado OrderRoutingModule
@NgModule({
    // Importa o RouterModule configurado com as rotas definidas
    imports: [RouterModule.forChild(routes)],
    // Exporta o RouterModule para que ele esteja disponível em outros módulos que importem OrderRoutingModule
    exports: [RouterModule]
})
// Exporta a classe OrderRoutingModule
export class OrderRoutingModule { }
