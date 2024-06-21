import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
            // { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
            { path: 'orders', loadChildren: () => import('./orders/order.module').then(m => m.OrderModule) }, // Rota para o módulo de pedidos
            { path: '**', redirectTo: '/notfound' } // Rota padrão para páginas não encontradas
        ])
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }