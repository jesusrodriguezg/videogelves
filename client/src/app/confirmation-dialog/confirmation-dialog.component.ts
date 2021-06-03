import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html',
    styleUrls: ['confirmation-dialog.component.css']
})

export class ConfirmationDialogComponent implements OnInit {
    message: any;
    constructor(
        private _confirmationDialogService: ConfirmationDialogService
    ) { }

    ngOnInit(): any {
       /**
        *   This function waits for a message from alert service, it gets
        *   triggered when we call this from any other component
        */
        this._confirmationDialogService.getMessage().subscribe(message => {
            this.message = message;
        });
    }
}
