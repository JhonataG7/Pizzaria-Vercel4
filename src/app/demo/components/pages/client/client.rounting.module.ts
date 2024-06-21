import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';

@NgModule({
    // Importa e configura as rotas específicas deste módulo
    imports: [RouterModule.forChild([
        { path: '', component: ClientComponent } // Define a rota raiz do módulo para o componente ClientComponent
    ])],
    // Exporta o módulo RouterModule para que suas diretivas, como routerLink e router-outlet, estejam disponíveis para uso
    exports: [RouterModule]
})
export class ClientRoutingModule { }