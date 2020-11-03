import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MojservisService } from './mojservis.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient, private mojservis: MojservisService, private router: Router) { }
  title = 'FrenchFootball';

  ngOnInit() {

    setInterval(() => {
      if (localStorage.getItem("token") == null) {
        localStorage.removeItem("token");
        localStorage.removeItem("welcome");
        localStorage.removeItem("username");
        if (this.router.url == "/login" || this.router.url == '/register') {
          return true;
        } else {
        }
        this.router.navigate(["/login"]);
      } else {
        this.proveriToken(localStorage.getItem("token"));
      }
    }, 10000);
  }

  proveriToken(token) {
    this.dajToken(token).subscribe((data) => {
      if (Object(data).sifra == 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("welcome");
        localStorage.removeItem("username");
        this.router.navigate(["/login"]);
      }
    });
  }

  dajToken(token) {
    return this.http.get(this.mojservis.apiUrl + "/proveriToken/" + token);
  }
}
