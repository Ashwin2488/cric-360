import {Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DataHelperService {
  appData;
  mostRunsList = [];
  highScoreList = [];
  battingAverageList = [];
  highestWicketList = [];
  bestEconomyList = [];
  allMatchesData = [];
  scoreCardDataMap = {
  };
  playerDetailMap = {
  };
  constructor(private dataService: DataService) {
  }
  setAppData(response) {
   this.appData = response;
   const playerData = this.addBowlingEconomy(response.playerData.players);
   this.addPlayerDetailMap(playerData);
   this.addPlayerImage(playerData);
   this.parsePlayerData(playerData);
   this.parseMatchesData(response.matchData.matches);
   this.parseScoreCardData(response.scorecardData.matches);
  }
  addBowlingEconomy(players) {
    players.forEach((player) => {
      if (player.data.AllmatchData && player.data.AllmatchData.OversBowled > 0 && player.data.AllmatchData.Matches > 1) {
        player.data.AllmatchData.economy = player.data.AllmatchData.RunsConceeded / player.data.AllmatchData.OversBowled;
        player.data.AllmatchData.economy = player.data.AllmatchData.economy.toFixed(2);
      }
    });
    return players;
  }
  addPlayerImage(players) {
    const imageList = this.dataService.getMockPlayerIcons();
    players.forEach((player) => {
      player.icon = imageList[Math.floor(Math.random() * imageList.length)];
    });
  }
  addPlayerDetailMap(players) {
    players.forEach((player) => {
      this.playerDetailMap[player.data.PlayerID] = player.data;
    });
  }
  parsePlayerData(players) {
    this.mostRunsList = players.slice(0).sort(this.matchDataSort('Runs'));
    this.highScoreList = players.slice(0).sort(this.matchDataSort('HighScore'));
    this.battingAverageList = players.slice(0).sort(this.matchDataSort('AvgRuns'));
    this.highestWicketList = players.slice(0).sort(this.matchDataSort('Wickets'));
    this.bestEconomyList = this.getBestEconomyList(players);
  }
  parseMatchesData(matches) {
    matches.forEach((match) => {
      const matchSummary = this.parseMatchSummary(match.data.Summary);
      this.allMatchesData.push({
        matchId: match.data.MatchID,
        venue: match.data.Venue,
        batOrChase: match.data.BatorChase,
        result: this.getMatchResult(match.data.Result, match.data.BatorChase, matchSummary),
        mom: this.playerDetailMap[match.data.MOM] ? this.playerDetailMap[match.data.MOM].Name : null,
        teamScore: matchSummary.teamScore,
        opponentScore: matchSummary.opponentScore
      });
    });
  }
  parseScoreCardData(matches) {
    matches.forEach((match) => {
      this.scoreCardDataMap[match.data.MatchID] = this.scoreCardDataMap[match.data.MatchID] || [];
      match.data.playerName = this.playerDetailMap[match.data.PlayerID].Name;
      match.data.strikeRate = ((match.data.Runs / match.data.Balls) * 100).toFixed(2);
      match.data.economy = (match.data.RunsConceeded / match.data.OversBowled).toFixed(2);
      this.scoreCardDataMap[match.data.MatchID].push(match.data);
    });
  }
  parseMatchSummary(summaryString) {
    const tmpString = summaryString.split('&');
    let teamStr = tmpString[0].indexOf('We') !== -1 ? tmpString[0] : tmpString[1];
    teamStr = teamStr.replace('We', '').trim();
    let opponentStr = tmpString[0].indexOf('Opponent') !== -1 ? tmpString[0] : tmpString[1];
    opponentStr = opponentStr.replace('Opponent', '').replace('-', '').trim();
    const teamScoreStr = teamStr.substr(0, teamStr.indexOf('('));
    const teamOversStr = teamStr.replace(teamScoreStr, '').slice(1, -1);
    const opponentScoreStr = opponentStr.substr(0, opponentStr.indexOf('('));
    const opponentOversStr = opponentStr.replace(opponentScoreStr, '').slice(1, -1);
    return {
      teamScore: {
        runs: teamScoreStr.split('/').join('-'),
        overs: teamOversStr.split('/'),
      },
      opponentScore: {
        runs: opponentScoreStr.split('/').join('-'),
        overs: opponentOversStr.split('/')
      }
    };
  }
  getMatchResult(resultCode, batOrChase , matchSummary) {
    let summary = '';
    const teamScore = matchSummary.teamScore.runs.split('-')[0];
    const opponentScore = matchSummary.opponentScore.runs.split('-')[0];
    const teamWickets = matchSummary.teamScore.runs.split('-')[1];
    const opponentWickets = matchSummary.opponentScore.runs.split('-')[1];
    if (resultCode === '1') {
      summary = 'Chennai bulls won by ';
      if (batOrChase === '1') {
        summary = `${summary}${teamScore - opponentScore} runs.`;
      } else {
        summary = `${summary}${10 - teamWickets} wickets`;
      }
    } else if (resultCode === '0') {
      summary = 'Opponent won by ';
      if (batOrChase === '1') {
        summary = `${summary}${10 - opponentWickets} wickets.`;
      } else {
        summary = `${summary}${opponentScore - teamScore} runs`;
      }
    }
    return summary;
  }
  getBestEconomyList(players) {
    const validEconomyPlayers = [];
    const otherPlayers = [];
    const playersList = players.slice(0).sort(this.matchDataSort('economy')).reverse();
    playersList.forEach((player) => {
      if (player.data.AllmatchData && player.data.AllmatchData.economy) {
        validEconomyPlayers.push(player);
      } else {
        otherPlayers.push(player);
      }
    });
    return validEconomyPlayers.concat(otherPlayers);
  }
  matchDataSort(property) {
    return (a, b) => {
      if (!a.data.AllmatchData) {
        a.data.AllmatchData = {
          [property]: 0
        };
      }
      if (a.data.AllmatchData && !a.data.AllmatchData[property]) {
        a.data.AllmatchData[property] = 0;
      }
      if (!b.data.AllmatchData) {
        b.data.AllmatchData = {
          [property]: 0
        };
      }
      if (b.data.AllmatchData && !b.data.AllmatchData[property]) {
        b.data.AllmatchData[property] = 0;
      }
      return b.data.AllmatchData[property] - a.data.AllmatchData[property];
    };
  }
}
