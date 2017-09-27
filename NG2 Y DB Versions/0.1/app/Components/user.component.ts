import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IUser } from '../Models/user';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';

@Component({

    templateUrl: 'app/Components/user.component.html'

})

export class UserComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    users: IUser[];
    user: IUser;
    msg: string;
    indLoading: boolean = false;
    userFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _userService: UserService) { }

    ngOnInit(): void {

        this.userFrm = this.fb.group({
            Id: [''],
            FirstName: ['', Validators.required],
            LastName: [''],
            Gender: [''],
            Id_Depart: ['']
        });

        this.LoadUsers();

    }

    LoadUsers(): void {
        this.indLoading = true;
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.indLoading = false; },
            error => this.msg = <any>error);

    }

    addUser() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Nuevo Usuario";
        this.modalBtnTitle = "Agregar";
        this.userFrm.reset();
        this.modal.open();
    }

    editUser(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edutar Usuario";
        this.modalBtnTitle = "Actualizar";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }

    deleteUser(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Borrar?";
        this.modalBtnTitle = "Borrar";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.userFrm.setValue(this.user);
        this.modal.open();
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.userFrm.enable() : this.userFrm.disable();
    }

    onSubmit(formData: any) {
    this.msg = "";
  
    switch (this.dbops) {
      case DBOperation.create:
        this._userService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
          data => {
            if (data == 1) //Success
            {
              this.msg = "Usuario añadido correctamente.";
              this.LoadUsers();
            }
            else
            {
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
        this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
          data => {
            if (data == 1) //Success
            {
              this.msg = "El usuario se ha actualizado exitosamente.";
              this.LoadUsers();
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
        this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
          data => {
            if (data == 1) //Success
            {
              this.msg = "El usuario se ha borrado exitosamente.";
              this.LoadUsers();
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