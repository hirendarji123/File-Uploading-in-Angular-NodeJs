import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fileupload';
  baseURL = 'http://localhost:4000/';
  data;
  selectedFile: File;
  image;
  constructor(private http:HttpClient,private form:FormBuilder){}

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.image=this.selectedFile;
  }
  onUpload() {
    const formData = new FormData();
    formData.append('file',this.image);
    console.log("upload is call");
  
    this.http.post<any>(this.baseURL,formData).subscribe((res)=>{
      console.log(res);
      this.data='../../../nodejs/uploads/'+res["filename"];
    });
  
  }


}
