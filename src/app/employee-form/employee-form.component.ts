import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  employee = {
    empName: '',
    dob: '',
    registeredID: '',
    jobField: ''
  };
  constructor(private http: HttpClient) { }

  submitForm() {
    console.log('Form submission on progress:', this.employee);
    this.http.post<any>('http://localhost:3000/add-employee', this.employee)
    .subscribe(
      (response) => {
        console.log('Form data sent successfully:', response);
        // Optionally, reset the form after successful submission
        // this.employeeForm.resetForm();
      },
      (error) => {
        console.error('Error sending form data:', error);
      }
    );
  }
}
