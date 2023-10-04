import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiKey = '36673731c11964c515450ff0f6a54138'; // Replace with your OpenWeatherMap API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private router:Router,private http:HttpClient) { }

  getWeatherByCoordinates(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getWeatherByCityName(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }



  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }

  canAccess(){
    if(!this.isAuthenticated()){
      //redirect to login
      this.router.navigate(['/login'])
    }
  }

  canAuthenticate(){
    if(this.isAuthenticated()){
      //redirect to home
      this.router.navigate(['/home'])
    }
  }

  register(name:string,email:string,password:string){
    //send data to register api(firebase)
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBexzzWZKTqxSf-HQAswkJ4pZ-N8xAoII',
      {displayName:name,email,password}
      );
  }

  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    //send data to login api (firebase)
      return this.http
      .post<{idToken:string}>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBexzzWZKTqxSf-HQAswkJ4pZ-N8xAoII',
            {email,password}
      );
  }

  

  removeToken(){
    sessionStorage.removeItem('token');
  }

 


}
