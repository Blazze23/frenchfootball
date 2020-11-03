import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MojservisService } from '../mojservis.service';

@Component({
  selector: 'app-topscorers',
  templateUrl: './topscorers.component.html',
  styleUrls: ['./topscorers.component.css']
})
export class TopscorersComponent implements OnInit {
  strelci = [];
  topscorers = [];
  status: boolean = false;
  constructor(private http: HttpClient, private mojservis: MojservisService) { }

  ngOnInit() {
    this.ucitajStrelce();
  }

  showAllScorers() {
    this.status = !this.status;
  }

  ucitajStrelce() {
    this.dajStrelce().subscribe((data) => {
      console.log(Object(data).result);
      let niz_strelaca = [];
      niz_strelaca = Object(data).result;
      console.log(niz_strelaca);
      for (let i = 0; i < niz_strelaca.length; i++) {
        if (i < 10) {
          this.topscorers.push(niz_strelaca[i]);
        }
        this.strelci.push(niz_strelaca[i]);
      }
      console.log(this.topscorers);
      console.log(this.strelci)
    })
  }

  dajStrelce() {
    return this.http.get(this.mojservis.apiFtb + "Topscorers&leagueId=177&APIkey=" + this.mojservis.apiKey);
  }
}

