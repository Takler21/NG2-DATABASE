import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CollapseComponent } from './collapse.component';
//Este componente es usado de forma recursiva para abarcar todos los niveles del arbol.
//Ira descendiendo hasta el ultimo nivel posible
@Component({
    selector: 'treeview',
    templateUrl: 'app/treeview.component.html'
})

export class TreeView implements OnChanges {
    @Input() hijas: any[];
    @Input() id: string;
    @Input() desplegados: string[];
    @Input() indiceEsq: any;
    importado: any;
    @Output() imp = new EventEmitter<any>();
    //Podria construir una funcion que me permitiera comprobar si tiene hijos
    //para aplicar solo en esos casos el collapse, por ejemplo con un booleano
    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            this.imp.emit(this.importado);
        }
    }

    mandar(hija: any) {
        
        this.importado = this.indiceEsq[hija];
        console.log("importa " + this.importado.id);
    }

}