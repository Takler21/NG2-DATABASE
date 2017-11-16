import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService } from './http.service';
import { PapaParseModule } from 'ngx-papaparse';

import { AppComponent } from './app.component';
import { TreeView } from './treeview.component';

@NgModule({
    imports: [BrowserModule, RouterModule, FormsModule, HttpModule, JsonpModule, PapaParseModule],
    declarations: [AppComponent, TreeView],
    providers: [HttpService],
    bootstrap: [AppComponent ]
})
export class AppModule {
}
