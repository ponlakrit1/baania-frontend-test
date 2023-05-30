import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { HouseModel } from '../models/house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private headers = new HttpHeaders({ "Content-Type": `application/json` });

  constructor(private http: HttpClient) { }

  findSkipAndTake(url: string, skip: number, take: number): Observable<any>{
    return this.http.get(url + "/home?skip=" + skip + "&take=" + take);
  }

  create(url: string, req: HouseModel) {
    return this.http.post(url + "/home/", req, { responseType: 'json', headers: this.headers });
  }

  update(url: string, req: HouseModel) {
    return this.http.patch(url + "/home/"+req.id, req, { responseType: 'json', headers: this.headers });
  }

  delete(url: string, req: HouseModel) {
    return this.http.delete(url + "/home/"+req.id);
  }

  findPostCode(url: string): Observable<any>{
    return this.http.get(url + "/postCode/");
  }

  findPostCodeById(url: string, id: string): Observable<any>{
    return this.http.get(url + "/postCode/" + id);
  }

}
