import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MojservisService } from '../mojservis.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
 standings = []
 timovi = [];
  constructor(private http: HttpClient, private mojservis: MojservisService) { }

  ngOnInit() {
    this.ucitajTabelu();
    this.ucitajTimove();
  }
  ucitajTabelu() {
    this.dajTabelu().subscribe((data)=>{
      console.log(Object(data).result.total);
      let niz_standings = [];
      niz_standings = Object(data).result.total;
      for(let i=0; i<niz_standings.length; i++) {
          this.standings.push(niz_standings[i]);   
      }
      console.log(this.standings);
    });
  }

  dajTabelu() {
    return this.http.get(this.mojservis.apiFtb+"Standings&leagueId=177&APIkey="+this.mojservis.apiKey);
  }

  // za Logo timova

  ucitajTimove() {
    this.dajTimove().subscribe((data) => {
      // console.log(data);
      let niz_timova = [];
      niz_timova = Object(data).result;
      console.log(niz_timova);
      for (let i = 0; i < niz_timova.length; i++) {
          this.timovi.push(niz_timova[i]);
      }
      // console.log(this.timovi);
    })
  }

  dajTimove() {
    return this.http.get(this.mojservis.apiFtb + "Teams&APIkey=" + this.mojservis.apiKey + "&leagueId=177");
  }
}

