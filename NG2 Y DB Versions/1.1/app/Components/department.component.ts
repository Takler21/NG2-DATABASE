import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IDepartment } from '../Models/department';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({

    templateUrl: 'app/Components/department.component.html'

})

export class DepartmentComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    departments: IDepartment[];
    department: IDepartment;
    msg: string;
    indLoading: boolean = false;
    departmentFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _userService: UserService) { }

    ngOnInit(): void {

        this.departmentFrm = this.fb.group({
            Id: [''],
            NameDepart: ['', Validators.required],
            Sales: [''],

        });

        this.LoadDeparts();

    }

    LoadDeparts(): void {
        this.indLoading = true;
        this._userService.get(Global.BASE_DEPART_ENDPOINT)
            .subscribe(departments => { this.departments = departments; this.indLoading = false; },
            error => this.msg = <any>error);

    }

    addDepart() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Nuevo Usuario";
        this.modalBtnTitle = "Agregar";
        this.departmentFrm.reset();
        this.modal.open();
    }

    editDepart(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edutar Usuario";
        this.modalBtnTitle = "Actualizar";
        this.department = this.departments.filter(x => x.Id == id)[0];
        this.departmentFrm.setValue(this.department);
        this.modal.open();
    }

    deleteDepart(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Borrar?";
        this.modalBtnTitle = "Borrar";
        this.department = this.departments.filter(x => x.Id == id)[0];
        this.departmentFrm.setValue(this.department);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.departmentFrm.enable() : this.departmentFrm.disable();
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._userService.post(Global.BASE_DEPART_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Usuario añadido correctamente.";
                            this.LoadDeparts();
                        }
                        else {
                            this.msg = "Hay problemas para guardar los datos!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._userService.put(Global.BASE_DEPART_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "El usuario se ha actualizado exitosamente.";
                            this.LoadDeparts();
                        }
                        else {
                            this.msg = "Hay problemas para guardar los datos!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._userService.delete(Global.BASE_DEPART_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "El usuario se ha borrado exitosamente.";
                            this.LoadDeparts();
                        }
                        else {
                            this.msg = "Hay problemas al guardar las modificaciones hechas!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

}