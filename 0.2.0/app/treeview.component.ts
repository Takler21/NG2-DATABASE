import { Component, Input } from '@angular/core';
//Este componente es usado de forma recursiva para abarcar todos los niveles del arbol.
//Ira descendiendo hasta el ultimo nivel posible
@Component({
    selector: 'treeview',
    templateUrl: 'app/treeview.component.html'
})

export class TreeView {
    @Input() hijas: any[];
    @Input() id: string;
}