import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MojservisService } from '../mojservis.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata;
  username;
  constructor(private mojservis: MojservisService, private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    })
  }

  obradaForme(vrednosti) {
    let data_json = JSON.stringify(vrednosti);
    this.posaljiLogin(data_json).subscribe((data)=>{
      this.username = vrednosti.username;
      // console.log(data);
      if(Object(data).sifra == 1) {
        localStorage.setItem("token", Object(data).token);
        localStorage.setItem("username", this.username);
        this.router.navigate(["/"])
      } else {
        this.toastr.error(Object(data).poruka, "Upozorenje!");
      }
    });
  }

  posaljiLogin(body) {
    return this.http.post(this.mojservis.apiUrl+"/login", body);
  }

}
