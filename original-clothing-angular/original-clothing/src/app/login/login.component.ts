import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // email = 'login@pl';
  // password = 'login';

  constructor(private router: Router, private authService: AuthService) {}

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email!, password!).subscribe(
        (data: any) => {
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
            alert('LOGIN SUCCESSFUL');
          }
          console.log(data);
        },
        (error) => {
          alert('INVALID EMAIL OR PASSWORD');
        }
      );
    } else {
      alert('INVALID EMAIL OR PASSWORD');
    }
  }
}
