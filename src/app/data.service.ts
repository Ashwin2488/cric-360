import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseHttpService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseHttpService {
  private static API_DOMAIN = 'https://magnetscc.herokuapp.com';
  // private static API_DOMAIN = null;

  contextPrefixMap = {
    getPlayerData: 'Player',
    getMatchesData: 'Matches',
    getScorecardData: 'Scorecard'
  };
  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  getPlayerData(): Observable<any> {
    const url = this.getUrl('getPlayerData');
    return this.doGet(url);
  }

  getMatchData(): Observable<any> {
    const url = this.getUrl('getMatchesData');
    return this.doGet(url);
  }

  getScorecardData(): Observable<any> {
    const url = this.getUrl('getScorecardData');
    return this.doGet(url);
  }
  getUrl(context) {
    let url;
    if (DataService.API_DOMAIN) {
      url = `${DataService.API_DOMAIN}/api/${this.contextPrefixMap[context]}/${context}`;
    } else {
      url = `assets/data/${context}.json`;
    }
    return url;
  }
  getMockPlayerIcons() {
    return [
      'https://static.iplt20.com/players/284/164.png',
      'https://static.iplt20.com/players/284/2973.png',
      'https://static.iplt20.com/players/284/233.png',
      'https://static.iplt20.com/players/284/1.png',
      'https://static.iplt20.com/players/284/24.png',
      'https://static.iplt20.com/players/284/4942.png',
      'https://static.iplt20.com/players/284/9.png',
      'https://static.iplt20.com/players/284/1563.png',
      'https://static.iplt20.com/players/284/135.png',
      'https://static.iplt20.com/players/284/8.png',
      'https://static.iplt20.com/players/284/41.png',
      'https://static.iplt20.com/players/284/2972.png',
      'https://static.iplt20.com/players/284/107.png',
      'https://static.iplt20.com/players/284/2740.png',
      'https://static.iplt20.com/players/284/1124.png',
      'https://static.iplt20.com/players/284/108.png'
    ];
  }
}
