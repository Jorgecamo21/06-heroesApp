import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, Pipe } from '@angular/core';
import { Observable, map, tap } from 'rxjs';


const checkStatus = ():boolean | Observable<boolean>=>  {
  const authService:AuthService = inject(AuthService);

  const router:Router = inject(Router);

 return authService.checkAuthentication()
 .pipe(
  tap(isAuthenticated => {
    console.log(isAuthenticated);
    if (isAuthenticated == true) router.navigateByUrl('/heroes');
  }),map(isAuthenticated => !isAuthenticated )
 )
}

export const canActivatePublicGuard: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkStatus();
};

export const canMatchPublicGuard: CanMatchFn = (
  //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
 return checkStatus();
};
