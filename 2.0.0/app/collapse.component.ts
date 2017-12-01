import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
@Component({
  selector: 'my-collap',
  templateUrl: 'app/collapse.component.html'
})
export class CollapseComponent {
  @Input() nombre: string;
  @Input() isOpen = false;
  @Input() indiceEsq: any;
  @Input() importado: any;
  @Output() imp = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.opened.emit() : this.closed.emit();
    this.verInfo();
  }
  verInfo() {
      this.importado = this.indiceEsq[this.nombre];
      this.imp.emit(this.importado);
  }
}
