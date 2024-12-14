import { Injectable } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';
import { DbService } from './db/db.service';

@Injectable({
  providedIn: 'root'
})
export class UserReactionService {

  constructor(private authService: AuthenticationService, private dbService: DbService) { }


}
