import { Component, OnInit } from '@angular/core';
import {CreateStory} from './create-story.interface';
import {CreateStoryService} from './create-story.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  story: CreateStory = {
    storyId:   null, 
    storyDesc:  '',
    storyName: '',
    storyPoints: null,
    board: 1 // need to be change so that it get the current boards id
  }

  constructor(
    private storyService: CreateStoryService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  storySubmit() {
    this.storyService.createNewStory(this.story).subscribe(
      res => {
        this.router.navigateByUrl('/boards');
      }
    );
  }
}