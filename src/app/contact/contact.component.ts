import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus }  from 'emailjs-com';

@Component({
  selector: 'app-contact',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  isSending = false;

  sendEmail(): void {
    if (!this.name || !this.email || !this.message) {
      alert('Please fill out all fields.');
      return;
    }

    this.isSending = true;

    const templateParams = {
      from_name: this.name,
      from_email: this.email,
      message: this.message,
      time: new Date().toLocaleString(),
    };
    

    emailjs
      .send(
        'service_bqs3mfb',     // Replace with actual service ID
        'template_j7lvfa9',    // Replace with actual template ID
        templateParams,
        'Met3jreJoxCKZ1TtI'      // Replace with your actual public key
      )
      .then((response: EmailJSResponseStatus) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('✅ Email sent successfully!');
        this.name = '';
        this.email = '';
        this.message = '';
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert('❌ Failed to send email. Please try again later.');
      })
      .finally(() => {
        this.isSending = false;
      });
  }
}
