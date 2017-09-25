import {Component} from "@angular/core";
//import the file uploader plugin
import {FileUploader} from "ng2-file-upload/ng2-file-upload";
//define the constant url we would be uploading to.
const URL = 'http://localhost:4200/api/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

//declare a property called fileuploader and assign it to an instance of a new fileUploader.
    //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
    public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

}
