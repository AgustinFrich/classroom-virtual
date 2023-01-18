import { LoadingService } from './../../services/loading.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
})
export class IngresoComponent implements OnInit, AfterViewInit {
  public forma!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private l: LoadingService
  ) {}

  ngOnInit(): void {
    this.l.loading = true;

    this.forma = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngAfterViewInit(): void {
    this.l.loading = false;
  }

  login() {
    
  }
}
