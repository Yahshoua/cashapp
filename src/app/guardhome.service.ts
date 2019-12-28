import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GuardhomeService implements CanActivate{

  constructor(private route: Router, private service: ServerService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.service.getStorageUser().auth) {
          this.route.navigate(['/accueil']);
        } else {
          return true
        }
    }
}
