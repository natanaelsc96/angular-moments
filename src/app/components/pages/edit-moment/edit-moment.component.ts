import { MessageService } from 'src/app/services/message.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment
  btnText: string = 'Editar'

  constructor(
    private momentService: MomentService,
    private messageService: MessageService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.activatedRouter.snapshot.paramMap.get('id'))
    this.momentService.getMoment(id).subscribe(
      response => this.moment = response.data
    )
  }

  async editHandler(momentData: Moment): Promise<void> {
    const id = this.moment.id
    const formData = new FormData()
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)
    if (momentData.image) formData.append('image', momentData.image)
    await this.momentService.updateMoment(id!, formData)
    this.messageService.add(`Momento ${momentData.title} foi atualizado com sucesso!`)
    this.router.navigate(['/'])
  }

}
