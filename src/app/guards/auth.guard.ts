import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({providedIn: 'root'}
  
)
export class AuthGuard implements CanActivate {


  constructor(private apiLogin: LoginService, private router: Router) { }

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | boolean{
    
    if(this.apiLogin.usuarioEstaAutenticado()){
      return true;
    }

this.router.navigate(['/login']);
  return false;

  }

}
