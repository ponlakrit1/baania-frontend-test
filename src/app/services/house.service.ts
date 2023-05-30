import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { ROOT_URL } from '../utils/config';
import { HouseModel } from '../models/house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private headers = new HttpHeaders({ "Content-Type": `application/json` });

  constructor(private http: HttpClient) { }

  findSkipAndTake(skip: number, take: number): Observable<any>{
    return this.http.get(ROOT_URL + "/home?skip=" + skip + "&take=" + take);
  }

  create(req: HouseModel) {
    return this.http.post(ROOT_URL + "/home/", req, { responseType: 'json', headers: this.headers });
  }

  update(req: HouseModel) {
    return this.http.patch(ROOT_URL + "/home/"+req.id, req, { responseType: 'json', headers: this.headers });
  }

  delete(req: HouseModel) {
    return this.http.delete(ROOT_URL + "/home/"+req.id);
  }

  findPostCode(): Observable<any>{
    return this.http.get(ROOT_URL + "/postCode/");
  }

  findPostCodeById(id: number): Observable<any>{
    return this.http.get(ROOT_URL + "/postCode/" + id);
  }

}
