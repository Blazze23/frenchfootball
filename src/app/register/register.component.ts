import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MojservisService } from '../mojservis.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 formdata;
  constructor(private http: HttpClient, private mojservis: MojservisService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,}")])),
      rptpassword: new FormControl("", Validators.compose([Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,}")]))
    })
  }

  obradaForme(vrednosti) {
    let data_json = JSON.stringify(vrednosti);
    if(vrednosti.password === vrednosti.rptpassword) {
      this.posaljiRegistraciju(data_json).subscribe((data)=>{
        if(Object(data).sifra == 1) {
          this.router.navigate(["/login"]);
        } else {
          this.toastr.error(Object(data).poruka, "Upozorenje!");
        }
       });
    } else {
      this.toastr.error("Lozinke se ne poklapaju!", "Upozorenje!");
    }
  }

  posaljiRegistraciju(body) {
    return this.http.post(this.mojservis.apiUrl+"/registracija", body);
  }
}
