// Importações necessárias do Angular e de componentes personalizados
import { NgModule } from '@angular/core'; // Decorador que marca uma classe como um módulo Angular
import { CommonModule } from '@angular/common'; // Fornece diretivas comuns como ngIf e ngFor
import { FormsModule } from '@angular/forms'; // Necessário para trabalhar com formulários no Angular
import { OrderRoutingModule } from '../orders/order.routing-module'; // Módulo de roteamento personalizado para gerenciar as rotas relacionadas ao componente de pedidos
import { OrderComponent } from './order.component'; // Componente personalizado que será declarado e usado neste módulo

// Importações do PrimeNG, uma biblioteca de componentes de UI para Angular
import { TableModule } from 'primeng/table'; // Módulo de tabelas
import { FileUploadModule } from 'primeng/fileupload'; // Módulo de upload de arquivos
import { ButtonModule } from 'primeng/button'; // Módulo de botões
import { RippleModule } from 'primeng/ripple'; // Módulo de efeito ripple para botões e outros elementos
import { ToastModule } from 'primeng/toast'; // Módulo para exibição de mensagens toast
import { ToolbarModule } from 'primeng/toolbar'; // Módulo de barra de ferramentas
import { RatingModule } from 'primeng/rating'; // Módulo de avaliação por estrelas
import { InputTextModule } from 'primeng/inputtext'; // Módulo de campo de texto
import { InputTextareaModule } from 'primeng/inputtextarea'; // Módulo de área de texto
import { DropdownModule } from 'primeng/dropdown'; // Módulo de dropdown (menu suspenso)
import { RadioButtonModule } from 'primeng/radiobutton'; // Módulo de botões de rádio
import { InputNumberModule } from 'primeng/inputnumber'; // Módulo de entrada numérica
import { DialogModule } from 'primeng/dialog'; // Módulo de diálogos (janelas modais)
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Módulo para diálogos de confirmação
import { ConfirmationService, MessageService } from 'primeng/api'; // Serviços do PrimeNG para exibição de mensagens e diálogos de confirmação

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Permite o uso de elementos personalizados não reconhecidos pelo Angular

@NgModule({
    imports: [
        CommonModule, // Diretivas comuns do Angular
        FormsModule, // Formulários do Angular
        OrderRoutingModule, // Roteamento específico para o módulo de pedidos
        TableModule, // Tabelas do PrimeNG
        FileUploadModule, // Upload de arquivos do PrimeNG
        ButtonModule, // Botões do PrimeNG
        RippleModule, // Efeito ripple do PrimeNG
        ToastModule, // Mensagens toast do PrimeNG
        ToolbarModule, // Barra de ferramentas do PrimeNG
        RatingModule, // Avaliação por estrelas do PrimeNG
        InputTextModule, // Campo de texto do PrimeNG
        InputTextareaModule, // Área de texto do PrimeNG
        DropdownModule, // Dropdown do PrimeNG
        RadioButtonModule, // Botões de rádio do PrimeNG
        InputNumberModule, // Entrada numérica do PrimeNG
        DialogModule, // Diálogos do PrimeNG
        ConfirmDialogModule // Diálogos de confirmação do PrimeNG
    ],
    declarations: [OrderComponent], // Declaração do componente personalizado deste módulo
    providers: [ConfirmationService, MessageService], // Serviços do PrimeNG disponíveis para injeção de dependência
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite o uso de elementos personalizados não reconhecidos pelo Angular
})
export class OrderModule { }