import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MojservisService } from '../mojservis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  utakmice = [];

  constructor(private http: HttpClient, private mojservis: MojservisService, private toastr: ToastrService) { }

  ngOnInit() {
    this.ucitajUtakmice();
    if(localStorage.getItem("welcome") == null) {
      this.mojservis.welcomeNote(); 
    } 
  }

  ucitajUtakmice() {
    this.dajUtakmice().subscribe((data) => {
      console.log(data);
      let niz_utakmice = [];
      niz_utakmice = Object(data).result;
      console.log(niz_utakmice);
      for (let i = 0; i < niz_utakmice.length; i++) {
        if (niz_utakmice[i].event_status == null || niz_utakmice[i].event_status == "Cancelled") {
          this.utakmice.push(niz_utakmice[i]);
        }
      }
      console.log(this.utakmice);
    })
  }

  dajUtakmice() {
    return this.http.get(this.mojservis.apiFtb + "Fixtures&APIkey=" + this.mojservis.apiKey + "&leagueId=177" + "&from=2020-05-15&to=2020-05-30");
  }
}
