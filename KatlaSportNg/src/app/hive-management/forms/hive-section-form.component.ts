import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSection } from '../models/hive-section';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveListItem } from '../models/hive-list-item';
import { HiveService } from '../services/hive.service';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  section = new HiveSection(0, "", "", 0, false, "");
  existed = false;
  hiveId: number;
  sectionHives: HiveListItem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private hiveService: HiveService
  ) { }

  ngOnInit() {
    this.hiveService.getHives().subscribe(h => this.sectionHives = h);
    this.route.params.subscribe(p => {
      this.hiveId = p['hiveId'];
      if (p['id'] === undefined) return;
      this.hiveSectionService.getHiveSection(p['id']).subscribe(s => this.section = s);
      this.existed = true;
    });
  }

  navigateToHiveSections() {
    if (this.hiveId === undefined) {
      this.router.navigate(['/sections']);
    } else {
      this.router.navigate([`/hive/${this.hiveId}/sections`]);
    }
    // this.router.navigate(['/sections']);
  }

  onCancel() {
    this.navigateToHiveSections();
  }

  onSubmit() {
    if (this.existed) {
      this.hiveSectionService.updateHive(this.section).subscribe(c => this.navigateToHiveSections());
    } else {
      this.hiveSectionService.addHive(this.section).subscribe(c => this.navigateToHiveSections());
    }
  }

  onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.section.id, true).subscribe(c => this.section.isDeleted = true);
  }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.section.id, false).subscribe(c => this.section.isDeleted = false);
  }

  onPurge() {
    this.hiveSectionService.deleteHive(this.section.id).subscribe(c => this.navigateToHiveSections());
  }
}
