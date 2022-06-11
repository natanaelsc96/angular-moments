import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { faEdit, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Moment } from 'src/app/interfaces/Moment';
import { Comment } from 'src/app/interfaces/Comment';
import { MessageService } from 'src/app/services/message.service';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  apiUrl: string = environment.baseUrl

  moment?: Moment
  commentForm!: FormGroup

  faTimes: IconDefinition = faTimes
  faEdit: IconDefinition = faEdit

  constructor(
    private momentService: MomentService,
    private activatedRouter: ActivatedRoute,
    private messageService: MessageService,
    private commentService: CommentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.momentService
      .getMoment(id)
      .subscribe(response => this.moment = response.data)
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    })
  }

  get text() {
    return this.commentForm.get('text')!
  }

  get username() {
    return this.commentForm.get('username')!
  }

  async removeHandler(id: number): Promise<void> {
    await this.momentService.removeMoment(id).subscribe()

    this.messageService.add("Momento excluído com sucesso!")

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective): Promise<void> {
    if (this.commentForm.invalid) return

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment?.id)

    await this.commentService
      .createComment(data)
      .subscribe(comment => this.moment?.comments?.push(comment.data))

    this.messageService.add("Comentário adicionado!")

    this.commentForm.reset()

    formDirective.resetForm()
  }

}
