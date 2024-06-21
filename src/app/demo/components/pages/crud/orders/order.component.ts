import { Component, OnInit } from '@angular/core';
import { Order } from '../orders/models/order.model';
import { OrderService } from './services/order.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    providers: [MessageService, ConfirmationService]
})
export class OrderComponent implements OnInit {

    orderDialog: boolean = false;
    deleteOrderDialog: boolean = false;
    deleteOrdersDialog: boolean = false;

    orders: Order[] = [];
    selectedOrders: Order[] = [];

    cols: any[] = [];
    categories: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    order: Order = {
        name: '',
        price: 0,
        category: 'Pizza' // Inicializado com um valor padrão 'Pizza'
    };

    submitted: boolean = false;

    constructor(
        private orderService: OrderService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit() {
        this.orderService.getOrders().subscribe((orders: Order[]) => {
            this.orders = orders;
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.categories = [
            { label: 'Pizza', value: 'Pizza' },
            { label: 'Beverage', value: 'Beverage' },
            { label: 'Dessert', value: 'Dessert' }
        ];
    }

    openNew() {
        this.order = {
            name: '',
            price: 0,
            category: 'Pizza' // Inicializa com 'Pizza' ao abrir novo pedido
        };
        this.orderDialog = true;
    }

    editOrder(order: Order) {
        this.order = { ...order };
        this.orderDialog = true;
    }

    deleteSelectedOrders() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected orders?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedOrders.forEach(order => {
                    this.orderService.deleteOrder(order.key!);
                });
                this.orders = this.orders.filter(val => !this.selectedOrders.includes(val));
                this.selectedOrders = [];
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Orders Deleted', life: 3000 });
            }
        });
    }

    deleteOrder(order: Order) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${order.name}?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.orderService.deleteOrder(order.key!);
                this.orders = this.orders.filter(val => val.key !== order.key);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.orderDialog = false;
        this.submitted = false;
    }

    saveOrder() {
        this.submitted = true;

        if (this.order.name?.trim() && this.order.category) {
            if (this.order.key) {
                this.orderService.updateOrder(this.order.key, this.order);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Updated', life: 3000 });
            } else {
                this.order.key = this.createId();
                this.orderService.addOrder(this.order);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 3000 });
            }

            this.orders = [...this.orders];
            this.orderDialog = false;
            this.order = {
                name: '',
                price: 0,
                category: 'Pizza' // Reinicializa com 'Pizza' ao fechar diálogo
            };
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].key === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
