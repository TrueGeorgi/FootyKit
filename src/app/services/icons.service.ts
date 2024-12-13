import { Injectable } from '@angular/core';
import { faCircleInfo, faBan, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  faCircleInfo = faCircleInfo;
  faBan = faBan;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor() { }
}
