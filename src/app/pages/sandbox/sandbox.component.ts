import { Donation } from './models/donation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ToForm } from 'src/app/utils/form-utils';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { timer } from 'rxjs';
@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzCardModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputNumberModule,
    NzInputModule,
  ],
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  form!: FormGroup<ToForm<Donation>>;
  sourceForm!: FormGroup<{ source: FormControl<string | null> }>;
  @ViewChild('iframe', { static: false }) iframe!: HTMLIFrameElement;
  protected sourceUrl?: SafeResourceUrl;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.form = this.fb.group({
      amount: [35, [Validators.required]],
      author: [''],
      message: [''],
      authorProfileImageUrl: [''],
      createTime: [''],
    });

    this.sourceForm = this.fb.group({
      source: ['', [Validators.required]],
    });
  }

  setSourceUrl() {
    this.sourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sourceForm.value.source!
    );
  }

  submitForm() {
    this.iframe.contentWindow?.postMessage(this.form.value, '*');
  }
}
