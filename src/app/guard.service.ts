import { ServerService } from './server.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private route: Router, private service: ServerService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.service.auth) {
          return true;
        } else {
          this.route.navigate(['/home']);
        }
    }
}
