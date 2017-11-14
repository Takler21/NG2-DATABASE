import { Component, OnInit } from "@angular/core"
import { HttpService } from './http.service';
import { PapaParseService } from 'ngx-papaparse'; 
@Component({
    selector: "user-app",
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit {

    msg: any;
    prueba: string[];
    luna: string = "Una cebolla";
    objey: string[] = [];
    constructor(private _httpService: HttpService, private _papaParse: PapaParseService) { }

    ngOnInit() {
        this.luna.split(',');
        this._httpService.get("../esquema.csv").subscribe(a => {
            this.prueba = this._papaParse.parse(a).data;
            console.log(this.prueba);

        },
            error => this.msg = error);
            
        
    }
    mostrar() {
        this.objey = this.prueba[2].toString().split(',');
    }
    }