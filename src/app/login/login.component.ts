import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons, MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = {
    firstName: '',
    LastName: '',
    birthdate: new Date,
    gender: '',
    email: '',
    password: '',
    phone: 0,
    Role: '',
    department:''
  }
constructor(
  private authentificationService:AuthService,
  private messageService: MessageService,
  private confirmationService: ConfirmationService,
  private router: Router ){}
  ngOnInit() {

  }
  register(){
    this.router.navigate(['/register'])
  }
  login() {
    const data = {
      email: this.user.email,
      password: this.user.password,
    };

    // Check for empty email or password
    if (data.email === "" || data.password === "") {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Veuillez remplir les champs',
      });
      return; // Exit the function to prevent further execution
    }

    this.authentificationService.signIn(data).subscribe({
      next: (res: any) => {
        if (res.result.accessToken) {
          localStorage.setItem('token', res.result.accessToken);
          localStorage.setItem('user', JSON.stringify(res.result.user));
          if (res.result.user.role === "admin") {
            this.router.navigate(['/admin']);
          } else if (res.result.user.role === "student") {
            this.router.navigate(['/student']);
          }
        } else {
          // Handle the case where the response doesn't contain an access token
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Authentication failed',
            life: 3000,
          });
        }
      },
      error: (e) => {
        // Handle errors from the server
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User does not exist',
          life: 3000,
        });
      },
    });
  }
  }
