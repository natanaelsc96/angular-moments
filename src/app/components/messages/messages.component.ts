import { Component, OnInit } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  faTimes: IconDefinition = faTimes;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {}

}
