import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService, JwtService } from '.';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { environment } from 'src/environments/environment.dev';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private http: HttpClient
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    //Al iniciar la aplicación, si hay cualquier token, se comprueba aquí
    //console.log(this.jwtService.getToken());
    // If JWT detected, attempt to get & store user's info

    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        (data) => {
          this.setAuth(data);
        },
        (err) => this.purgeAuth()

        ///NO ENTRA PERQUÈ NO ESTÀ AUTORITZAT
        // (data) => console.log(data),
        // (err) =>  console.log(err)
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User)
    // Set auth status to false
    this.isAuthenticatedSubject.next(false)
  }

  attemptAuth(type: any, credentials: any): Observable<User> {
    const route = type;

    return this.apiService.post(`${route}`, credentials).pipe(
      map((data) => {
        if (data.error) return data
        this.setAuth(data);
        return data;
      })
    );
  }

  getUserFollowing(users: String[]): Observable<any[]> {
    return this.apiService.post(`/getFollowingUsers`, { users }).pipe(
      map((data) => {
        return data;
      })
    )
  }

  getInfoUser(user: String): Observable<User> {
    return this.apiService.get(`/getUser/${user}`).pipe(
      map((data) => {
        return data;
      })
    )
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: any): Observable<User> {
    return this.apiService.put('user', { user }).pipe(
      map((data) => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }
}
