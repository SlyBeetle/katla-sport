import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Hive } from '../models/hive';
import { HiveListItem } from '../models/hive-list-item';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveSection } from '../models/hive-section';

@Injectable({
  providedIn: 'root'
})
export class HiveService {
  private hivesUrl = environment.apiUrl + 'api/hives/';
  private sectionsUrl = environment.apiUrl + "api/sections/";

  constructor(private http: HttpClient) { }

  getHives(): Observable<Array<HiveListItem>> {
    return this.http.get<Array<HiveListItem>>(this.hivesUrl);
  }

  getHive(hiveId: number): Observable<Hive> {
    return this.http.get<Hive>(`${this.hivesUrl}${hiveId}`);
  }

  getHiveSections(hiveId: number): Observable<Array<HiveSectionListItem>> {
    return this.http.get<Array<HiveSectionListItem>>(`${this.hivesUrl}${hiveId}/sections`);
  }

  addHive(hive: Hive): Observable<Hive> {
    return null;
  }

  updateHive(hive: Hive): Observable<Object> {
    return null;
  }

  deleteHive(hiveId: number): Observable<Object> {
    return null;
  }

  setHiveStatus(hiveId: number, deletedStatus: boolean): Observable<Object> {
    return this.http.put<Hive>(`${this.hivesUrl}${hiveId}/status/${deletedStatus}`, null);
  }

  setHiveSectionStatus(hiveSectionId: number, deletedStatus: boolean): Observable<Object> {
    return this.http.put<HiveSection>(`${this.sectionsUrl}${hiveSectionId}/status/${deletedStatus}`, null);
  }
}
