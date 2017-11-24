import { Component, Input, Output, EventEmitter} from '@angular/core';
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
    @Input() optionals: any[];
    @Input() indiceEsq: any;
    @Input() importado: any;
    @Output() impo = new EventEmitter();
    //Podria construir una funcion que me permitiera comprobar si tiene hijos
    //para aplicar solo en esos casos el collapse, por ejemplo con un booleano

    mandar() {
        this.impo.emit(this.importado);        
    }

    changeImp(id: string) {
        this.importado = this.indiceEsq[id];
        this.mandar();
    }

}