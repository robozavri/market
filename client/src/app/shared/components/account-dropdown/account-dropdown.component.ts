import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.scss']
})
export class AccountDropdownComponent implements OnInit {

  isSigned: boolean;
  user: User;
  constructor(
   private authService: AuthService,
   private router: Router,
  ) { }

  ngOnInit(): void {
    this.isSigned = this.authService.isSigned();
    this.authService.getCurrentUserStream().subscribe((currentUser) => {
      this.user = currentUser;
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

}
