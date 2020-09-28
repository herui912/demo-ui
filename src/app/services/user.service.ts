import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  findAllUsers (): Observable<any> {
    return this.http.get(Constants.FIND_ALL_USERS)
  }
  
  addNewUser(user: any): Observable<any> {
    return this.http.post(Constants.ADD_NEW_USER, user)
  }

  findUserById(id: any): Observable<any> {
    return this.http.get(Constants.FIND_BY_ID + id)
  }

  findByCriteria(criteria: any, searchItem: any): Observable<any> {
    return this.http.get(Constants.FIND_BY_CRITERIA + criteria + '&searchItem=' + searchItem)
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(Constants.DELETE_USER + id)
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(Constants.UPDATE_USER, user)
  }

}
