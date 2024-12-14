import { Injectable } from '@angular/core';
import { 
  faCircleInfo, 
  faBan, 
  faThumbsUp, 
  faThumbsDown,
  faSquarePlus,
  faUser,
  faEnvelope,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  faCircleInfo = faCircleInfo;
  faBan = faBan;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faSquarePlus = faSquarePlus;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faTrashCan = faTrashCan;

  constructor() { }
}
