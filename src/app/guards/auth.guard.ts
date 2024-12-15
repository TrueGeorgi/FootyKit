import { inject } from "@angular/core"
import { AuthenticationService } from "../services/user/authentication.service"
import { Router } from "@angular/router";

export const authGuard = () => {
    const auth: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);
  
    const isLoggedIn: boolean =  auth.isLogged();
    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['']);
      return false;
    }
  };