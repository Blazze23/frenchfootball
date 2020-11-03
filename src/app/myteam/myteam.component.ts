import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MojservisService } from '../mojservis.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {
  formdata;
  timovi = [];
  niz_igraca = [];
  pozicija = [];
  jedan_tim = [];
  igraci_tima = [];
  igraci_na_poziciji = [];
  player = {};
  igrac_key;
  team_key;
  myteam = [];
  goalkeepers = [];
  defenders = [];
  midfielders = [];
  forwards = [];

  constructor(private http: HttpClient, private mojservis: MojservisService, private toastr: ToastrService) { }

  ngOnInit() {
    this.ucitajTimove();
    if (localStorage.getItem("myteam") != null) {
      this.myteam = JSON.parse(localStorage.getItem("myteam"));
      // console.log(this.forwards)
      // console.log(this.goalkeepers)
      // console.log(this.defenders)
      // console.log(this.midfielders)
      // console.log(this.myteam)
      for (let i = 0; i < this.myteam.length; i++) {
        if (this.myteam[i].player_type == "Goalkeepers") {
          this.goalkeepers.push(this.myteam[i]);
        } else if (this.myteam[i].player_type == "Defenders") {
          this.defenders.push(this.myteam[i]);
        } else if (this.myteam[i].player_type == "Midfielders") {
          this.midfielders.push(this.myteam[i]);
        } else {
          this.forwards.push(this.myteam[i]);
        }
      }
    }
    this.formdata = new FormGroup({
      timovi: new FormControl("", Validators.compose([Validators.required])),
      pozicija: new FormControl("", Validators.compose([Validators.required])),
      igraci: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  ucitajTim(event) {
    // console.log(event.target.value)
    let jedan_tim = this.timovi.find(obj => obj.team_key == event.target.value)
    let igraci_tima = [];
    this.team_key = event.target.value;
    this.jedan_tim.push(jedan_tim);
    // console.log(this.team_key);
    console.log(this.jedan_tim);
    for (let i = 0; i < this.jedan_tim.length; i++) {
      igraci_tima.push(this.jedan_tim[0].players);
      this.igraci_tima = [...igraci_tima];
    }
    igraci_tima = [];
    this.jedan_tim = [];
    console.log(this.igraci_tima[0]);
  }

  ucitajPoziciju(event) {
    // console.log(event.target.value)
    this.pozicija = event.target.value;
    let igraci_na_pozicijama = [];
    for (let i = 0; i < this.igraci_tima[0].length; i++) {
      // console.log(this.igraci_tima[0][i].player_type);
      if (this.igraci_tima[0][i].player_type == event.target.value) {
        igraci_na_pozicijama.push(this.igraci_tima[0][i]);
        this.igraci_na_poziciji = [...igraci_na_pozicijama];
      }
    }
    igraci_na_pozicijama = [];
    // console.log(igraci_na_poziciji);
    // console.log(this.igraci_na_poziciji);
  }

  ucitajIgraca(event) {
    console.log(event.target.value);
    this.igrac_key = event.target.value;
  }

  obradaForme(vrednosti) {
    console.log(vrednosti);
    for (let i = 0; i < this.niz_igraca.length; i++) {
      console.log(this.niz_igraca[i]);
      for (let y = 0; y < this.niz_igraca[i].length; y++) {
        console.log(this.niz_igraca[i][y]);
        if (this.niz_igraca[i][y].player_key == vrednosti.igraci) {
          this.player = {
            player_name: this.niz_igraca[i][y].player_name,
            player_number: this.niz_igraca[i][y].player_number,
            player_type: this.niz_igraca[i][y].player_type,
            player_key: vrednosti.igraci
          }
        }
      }
    }
    console.log(this.player);
    let lokal_myteam = localStorage.getItem("myteam");
    if (lokal_myteam == null) {
      if (vrednosti.pozicija === "Goalkeepers") {
        if (this.goalkeepers.length < 1) {
          this.goalkeepers.push(this.player);
          this.myteam.push(this.player);
          localStorage.setItem("myteam", JSON.stringify(this.myteam));
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        } else {
          this.toastr.error("Team can only have 1 Goalkeeper", "Warning!");
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        }
      } else if (vrednosti.pozicija === "Defenders") {
        if (this.defenders.length < 4) {
          this.defenders.push(this.player);
          this.myteam.push(this.player);
          localStorage.setItem("myteam", JSON.stringify(this.myteam));
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        } else {
          this.toastr.error("Team can only have 4 Defenders", "Warning!");
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        }
      }
      else if (vrednosti.pozicija === "Midfielders") {
        if (this.midfielders.length < 4) {
          this.midfielders.push(this.player);
          this.myteam.push(this.player);
          localStorage.setItem("myteam", JSON.stringify(this.myteam));
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        } else {
          this.toastr.error("Team can only have 4 Midfielders", "Warning!");
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        }
      } else if (vrednosti.pozicija === "Forwards") {
        if (this.forwards.length < 2) {
          this.forwards.push(this.player);
          this.myteam.push(this.player);
          localStorage.setItem("myteam", JSON.stringify(this.myteam));
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        } else {
          this.toastr.error("Team can only have 2 Forwards", "Warning!");
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        }
      }
    } else {
      this.myteam = JSON.parse(lokal_myteam);
      if (this.myteam.length < 11) {
        if (this.myteam.find(player => player.player_key == vrednosti.igraci)) {
          this.toastr.error("This player is already on your team", "Warning!");
          this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
        } else {
          if (vrednosti.pozicija === "Goalkeepers") {
            if (this.goalkeepers.length < 1) {
              this.goalkeepers.push(this.player);
              this.myteam.push(this.player);
              localStorage.setItem("myteam", JSON.stringify(this.myteam));
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            } else {
              this.toastr.error("Team can only have 1 Goalkeeper", "Warning!");
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            }
          } else if (vrednosti.pozicija === "Defenders") {
            if (this.defenders.length < 4) {
              this.defenders.push(this.player);
              this.myteam.push(this.player);
              localStorage.setItem("myteam", JSON.stringify(this.myteam));
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            } else {
              this.toastr.error("Team can only have 4 Defenders", "Warning!");
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            }
          }
          else if (vrednosti.pozicija === "Midfielders") {
            if (this.midfielders.length < 4) {
              this.midfielders.push(this.player);
              this.myteam.push(this.player);
              localStorage.setItem("myteam", JSON.stringify(this.myteam));
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            } else {
              this.toastr.error("Team can only have 4 Midfielders", "Warning!");
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            }
          } else if (vrednosti.pozicija === "Forwards") {
            if (this.forwards.length < 2) {
              this.forwards.push(this.player);
              this.myteam.push(this.player);
              localStorage.setItem("myteam", JSON.stringify(this.myteam));
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            } else {
              this.toastr.error("Team can only have 2 Forwards", "Warning!");
              this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
            }
          }
        }
      } else {
        this.toastr.error("Team can only have 11 players", "Warning!");
        this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
      }
    }
    this.jedan_tim = [];
    this.igraci_tima = [];
    this.igraci_na_poziciji = [];
    this.pozicija = [];
  }

  resetMyTeam() {
    localStorage.removeItem("myteam");
    this.formdata.reset({ timovi: "", pozicija: "", igraci: "" });
    this.myteam = [];
    this.goalkeepers = [];
    this.defenders = [];
    this.midfielders = [];
    this.forwards = [];
  }



  ucitajTimove() {
    this.dajTimove().subscribe((data) => {
      // console.log(data);
      let niz_timova = [];
      niz_timova = Object(data).result;
      // console.log(niz_timova);
      for (let i = 0; i < niz_timova.length; i++) {
        this.timovi.push(niz_timova[i]);
        this.niz_igraca.push(niz_timova[i].players);
      }
      console.log(this.timovi);
      console.log(this.niz_igraca);
    });
  }

  dajTimove() {
    return this.http.get(this.mojservis.apiFtb + "Teams&APIkey=" + this.mojservis.apiKey + "&leagueId=177");
  }


}
