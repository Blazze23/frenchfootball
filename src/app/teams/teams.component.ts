import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MojservisService } from '../mojservis.service';
import { TEMPORARY_NAME } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  timovi = [];
  jedan_tim = [];
  status: boolean = false;
  team_key1;
  team_key2 = 3029
  lastGame = [];
  event_key;
  // opponent;
  // Google chart parametri:
  title = "Last Game Stats";
  type = 'Table';
  data = [];
  columnNames = ["Type", "Home","Away"];
  options = { 
    alternatingRowStyle:true, 
  };
  width = 600;
  height = 400;
  dataStats;
  title1 = 'Ball possession';
  type1 = 'PieChart';
  data1 = [];
  columnNames1 = ['Team', 'Percentage'];
  options1 = {         
  };
  width1 = 300;
  height1 = 300;
 

  constructor(private http: HttpClient, private mojservis: MojservisService) { }

  ngOnInit() {
    this.ucitajTimove();
  }

  

  ucitajTim(event) {
    console.log(event.target.value)
    this.jedan_tim = this.timovi.find(obj=>obj.team_key == event.target.value)
    this.team_key1 = event.target.value
    console.log(this.team_key1);
   console.log(this.jedan_tim);
   
  }

  showTeam(event) {
      this.status = true;
  }


  ucitajTimove() {
    this.dajTimove().subscribe((data) => {
      console.log(data);
      let niz_timova = [];
      niz_timova = Object(data).result;
      console.log(niz_timova);
      for (let i = 0; i < niz_timova.length; i++) {
          this.timovi.push(niz_timova[i]);
      }
      console.log(this.timovi)
    })
  }

  dajTimove() {
    return this.http.get(this.mojservis.apiFtb + "Teams&APIkey=" + this.mojservis.apiKey + "&leagueId=177");
  }

  ucitajLastGame(team_key1, team_key2) {
    this.dajLastGame(this.team_key1, this.team_key2).subscribe((data) => {
      console.log(Object(data).result.firstTeamResults);
      this.lastGame = Object(data).result.firstTeamResults[0];
      console.log(this.lastGame);
      this.event_key = Object(data).result.firstTeamResults[0].event_key;
      // Bonus - kad se ne zna da li je opponent home ili away team!
      // if(Object(data).result.firstTeamResults[0].home_team_key == this.team_key1) {
      //   this.opponent = Object(data).result.firstTeamResults[0].away_team_key;
      // } else {
      //   this.opponent = Object(data).result.firstTeamResults[0].home_team_key
      // }
      // console.log(this.opponent);
      this.ucitajStats();
    });
  }

  dajLastGame(team_key1, team_key2) {
    if(this.team_key1 == team_key2) {
      team_key2++
      console.log(team_key1, team_key2);
    }
    return this.http.get(this.mojservis.apiFtb + "H2H&APIkey=" + this.mojservis.apiKey + "&firstTeamId="+team_key1+"&secondTeamId="+team_key2);
  }

  ucitajStats(){
    this.dajStats().subscribe((data)=> {
      console.log(Object(data).result);
      this.dataStats = Object(data).result.find(stats=> stats.event_key == this.event_key);
      console.log(this.dataStats);
      console.log(this.dataStats.statistics);
      // probati sa Array.from(Object.keys(data), k=>data[k]);
      for(let i=0; i<this.dataStats.statistics.length; i++){
        // console.log(this.dataStats.statistics[i].type);
        // console.log(this.dataStats.statistics[i].home);
        // console.log(this.dataStats.statistics[i].away);
        
        if(i<15) {
          this.data = [
            [this.dataStats.statistics[0].type, this.dataStats.statistics[0].home, this.dataStats.statistics[0].away],
            [this.dataStats.statistics[1].type, this.dataStats.statistics[1].home, this.dataStats.statistics[1].away],
            [this.dataStats.statistics[2].type, this.dataStats.statistics[2].home, this.dataStats.statistics[2].away],
            [this.dataStats.statistics[3].type, this.dataStats.statistics[3].home, this.dataStats.statistics[3].away],
            [this.dataStats.statistics[4].type, this.dataStats.statistics[4].home, this.dataStats.statistics[4].away],
            [this.dataStats.statistics[5].type, this.dataStats.statistics[5].home, this.dataStats.statistics[5].away],
            [this.dataStats.statistics[6].type, this.dataStats.statistics[6].home, this.dataStats.statistics[6].away],
            [this.dataStats.statistics[7].type, this.dataStats.statistics[7].home, this.dataStats.statistics[7].away],
            [this.dataStats.statistics[8].type, this.dataStats.statistics[8].home, this.dataStats.statistics[8].away],
            [this.dataStats.statistics[9].type, this.dataStats.statistics[9].home, this.dataStats.statistics[9].away],
            [this.dataStats.statistics[10].type, this.dataStats.statistics[10].home, this.dataStats.statistics[10].away],
            [this.dataStats.statistics[11].type, this.dataStats.statistics[11].home, this.dataStats.statistics[11].away],
            [this.dataStats.statistics[12].type, this.dataStats.statistics[12].home, this.dataStats.statistics[12].away],
            [this.dataStats.statistics[13].type, this.dataStats.statistics[13].home, this.dataStats.statistics[13].away]
         ];
        } 
        let ball_possession = {
          home: parseFloat(this.dataStats.statistics[0].home)/100,
          away: parseFloat(this.dataStats.statistics[0].away)/100
        };
        console.log(ball_possession);
        this.data1 = [['Home', ball_possession.home], ['Away', ball_possession.away]];
      }
    })
  }

  dajStats() {
    return this.http.get(this.mojservis.apiFtb+"Fixtures&APIkey="+this.mojservis.apiKey+"&leagueId=177&from=2020-02-10&to=2021-10-22")
  }
}
