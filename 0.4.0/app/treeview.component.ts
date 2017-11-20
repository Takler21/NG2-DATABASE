import { Component, Input } from '@angular/core';
import { CollapseComponent } from './collapse.component';
//Este componente es usado de forma recursiva para abarcar todos los niveles del arbol.
//Ira descendiendo hasta el ultimo nivel posible
@Component({
    selector: 'treeview',
    templateUrl: 'app/treeview.component.html'
})

export class TreeView {
    @Input() hijas: any[];
    @Input() id: string;
    @Input() desplegados: string[];
    //Podria construir una funcion que me permitiera comprobar si tiene hijos
    //para aplicar solo en esos casos el collapse, por ejemplo con un booleano
}