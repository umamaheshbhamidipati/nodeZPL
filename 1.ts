import { Component } from '@angular/core';
import { webSocket } from "rxjs/webSocket";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  statusMsg: any = 'ALERT: PQ JOB COMPLETED [ZEBRA_GT800_DHAN]\r\n';
  FullLength: number = 9;
  counter: number = 0;
  constructor() {
    let subject = webSocket("ws://192.168.3.6:8080");
    // subject.subscribe();
    // subject.next({message: 'some message'});

    subject.subscribe(
      (msg) => {
        console.log('message received: ' + msg)
        this.statusMsg = msg;
        if(msg == 'ALERT: PQ JOB COMPLETED [ZEBRA_GT800_DHAN]\r\n') {
          this.counter = this.counter + 1;
          console.log(this.counter)
        }
      },  // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  callPrinter() {
    var request = new XMLHttpRequest();
    var method = "POST";
    var async = true;
    var zpl = `
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
    ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ
      ^XA^FO50,100^BXN,10,200^FDYourTextHere^FS^XZ`;
    var urlForPrint = "http://192.168.3.21:9100/printer/pstprnt";
    request.onload = function () {
        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = request.responseText; // Returned data, e.g., an HTML document.
    }

    request.open(method, urlForPrint, async);
    request.overrideMimeType('text/plain; charset=unicode');
    request.send(zpl);
  }
  
}
