import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MojservisService {
  apiUrl = "https://obrada.in.rs/kladionica/api";
  apiFtb = "https://allsportsapi.com/api/football/?met=";
  apiKey="7630094609e1279b8a7ad25fd49b83a6e895930aa53103579ccc2981262345de";
  welcome="1";
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  welcomeNote() {
    localStorage.setItem("welcome", this.welcome);
    this.toastr.info ("", "Welcome "+localStorage.getItem("username")+" to French Football App!");
  }

  dajToken(token) {
    return this.http.get(this.apiUrl+"/proveriToken/"+token).pipe(map(data => Object(data).sifra == 1 ? true : false));
  }
}
