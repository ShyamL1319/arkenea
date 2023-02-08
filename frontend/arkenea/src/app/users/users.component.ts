import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  //Create FormGroup
  userForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNo: ['', Validators.required],
    profileImg: ['']
  });
  @ViewChild('viewUserDetailsModelOpen') viewUserDetailsModelOpen!: ElementRef;
  @ViewChild('openModelCreateUpdate') openModelCreateUpdate!: ElementRef;
  @ViewChild('modalDismiss') modalDismiss!: ElementRef

  BASE_URL = "http://localhost:4000/api/users";
  usersList: any = [];
  submitted: any;
  formText: any = "Create New User";
  user: { lastName: any; firstName: any; email: any; phoneNo: any; profileImg: any; _id: any };
  file: File;
  constructor(private fb: FormBuilder, private httpService: HttpClient,
    private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe(() => {
      console.log(this.userForm);
    })
    this.getAllUsers();
    this.userForm.valueChanges.subscribe(() => {
      console.log(this.userForm.controls);
    })
  }

  get f() { return this.userForm.controls; }

  onSubmit(id: any) {
    console.log(id)
    if (id == null) {
      id = "";
    }
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.userForm.value)
    if (this.userForm.invalid) {
      return;
    }

    const UserDetails = this.userForm.value
    UserDetails["profileImg"] = this.file;
    if (this.userForm.valid) {
      this.httpService.post(this.BASE_URL + id, this.toFormData(UserDetails)).subscribe((resp) => {
        if (id) {
          this.snackPositionTopCenter("Record Updated Successfully")
        } else {
          this.snackPositionTopCenter("Record Creatd Successfully")
        }
        this.getAllUsers()
        this.modalDismiss.nativeElement.click();
      },
        (err: any) => {
          this.snackPositionTopCenter("Some Error occured !");
          this.modalDismiss.nativeElement.click();
        }
      );
    }
  }

  openCreatePopup() {
    this.user = null;
    this.submitted = false
    this.setFormData();
    this.formText = "Create New User";
    this.openModelCreateUpdate.nativeElement.click();
  }
  getAllUsers() {
    this.httpService.get(this.BASE_URL).subscribe((users: any) => {
      this.usersList = users.data;
    });
  }

  deleteUser(id: any) {
    this.httpService.delete(this.BASE_URL + "/" + id).subscribe(
      (User: any) => {
        this.usersList = this.usersList.filter((ele: any) => ele._id != id);
        this.snackPositionTopCenter("User deleted Successfully");
        this.modalDismiss.nativeElement.click();
      },
      (err: any) => {
        console.log(err)
        this.snackPositionTopCenter("Some Error occured!");
        this.modalDismiss.nativeElement.click();
      }
    )
  }

  getUser(id: any) {
    this.httpService.get(this.BASE_URL + "/" + id).subscribe(
      (User: any) => {
        User = User.data
        this.user = {
          firstName: User?.firstName ? User?.firstName : '',
          lastName: User?.lastName ? User?.lastName : '',
          email: User?.email ? User?.email : '',
          phoneNo: User?.phoneNo ? User?.phoneNo : '',
          profileImg: User?.profileImg ? User?.profileImg : '',
          _id: User?._id ? User?._id : '',
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  actionData(id: any, action: any) {
    switch (action) {
      case 'view':
        this.getUser(id);
        this.viewUserDetailsModelOpen.nativeElement.click();
        break;
      case 'update':
        this.getUser(id);
        this.formText = "Update User Detail"
        this.submitted = false;
        this.setFormData()
        this.openModelCreateUpdate.nativeElement.click();
        break;
      case 'delete':
        this.deleteUser(id);
        break;
    }
  }
  setFormData() {
    this.userForm = this.fb.group({
      firstName: [this.user?.firstName ? this.user?.firstName : '', Validators.required],
      lastName: [this.user?.lastName ? this.user?.lastName : '', Validators.required],
      email: [this.user?.email ? this.user?.email : '', Validators.required],
      phoneNo: [this.user?.phoneNo ? this.user?.phoneNo : '', Validators.required],
      profileImg: [this.user?.profileImg ? this.user?.profileImg : '']
    });
  }

  snackPositionTopCenter(msg: string = "") {
    this.matSnackBar.open(msg, "Okay!", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    console.log(file)
    this.file = file;
  }

  toFormData(formValue: any) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }
}