import { OnInit, Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Loja',
                icon: 'pi pi-fw pi-shop',
                items: [
                    {
                        label: 'Cliente',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/client']
                    },
                    {
                        label: 'Pedido',
                        icon: 'pi pi-fw pi-cart-plus',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Produto',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/pages/orders']
                    },
                ]
            },
        ];
    }
}
