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
import { Observable, tap } from 'rxjs';

const checkStatus = ():boolean | Observable<boolean>=>  {
  const authService:AuthService = inject(AuthService);

  const router:Router = inject(Router);

 return authService.checkAuthentication()
 .pipe(
  tap(isAuthenticated => {
    if (!isAuthenticated) router.navigateByUrl('/auth/login');
  })
 )
}

export const canActivateGuard: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkStatus();
};

export const canMatchGuard: CanMatchFn = (
  //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
 return checkStatus();
};
