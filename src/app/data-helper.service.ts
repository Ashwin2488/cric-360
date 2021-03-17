import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import firebase from 'firebase/app';
import 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class DataHelperService {
  appData;
  mostRunsList = [];
  highScoreList = [];
  battingAverageList = [];
  highestWicketList = [];
  highestFoursList = [];
  highestSixList = [];
  bestEconomyList = [];
  allMatchesData = [];
  sortedMatchIdList = [];
  scoreCardDataMap = {
  };
  playerDetailMap = {
  };
  allScoreCard = [];
  strikeRateList = [];
  constructor(private dataService: DataService) {
  }
  setAppData(response) {
    this.appData = response;
    this.allScoreCard = response.scorecardData.matches;
    const playerData = this.addMissingData(response.playerData.players);
    this.addPlayerDetailMap(playerData);
    this.parsePlayerData(playerData);
    this.parseMatchesData(response.matchData.matches);
    this.parseScoreCardData(response.scorecardData.matches);
  }
  addMissingData(players) {
    players.forEach((player) => {
      this.addPlayerImage(player);
      this.addHighScore(player);
      if (player.data.AllmatchData && player.data.AllmatchData.OversBowled > 0 && player.data.AllmatchData.Matches > 1) {
        player.data.AllmatchData.economy = player.data.AllmatchData.RunsConceeded / player.data.AllmatchData.OversBowled;
        player.data.AllmatchData.economy = player.data.AllmatchData.economy.toFixed(2);
      }
    });
    return players;
  }
  addHighScore(player) {
    let highScore = 0;
    this.allScoreCard.forEach((scoreCard) => {
      if (scoreCard.data.PlayerID === player.data.PlayerID) {
          highScore = Number(scoreCard.data.Runs) > highScore ? scoreCard.data.Runs : highScore;
      }
    });
    player.data.AllmatchData.HighScore = highScore;
  }
  addPlayerImage(player) {
    const storage = firebase.storage();
    const storageRef = storage.ref();

    storageRef.child(`player-dp/${player.data.PlayerID}/player.jpg`).getDownloadURL().then((url) => {
      player.data.icon = url;
    }).catch(() => {
      player.data.icon = 'assets/images/bowler.png';
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
    this.highestFoursList = players.slice(0).sort(this.matchDataSort('Fours'));
    this.highestSixList = players.slice(0).sort(this.matchDataSort('Sixes'));
    this.strikeRateList = players.slice(0).sort(this.matchDataSort('StrikeRate'));

  }
  parseMatchesData(matches) {
    matches = matches.sort(this.matchDateSort);
    matches.forEach((match) => {
      const isTournament = match.data.IsTournament === '1' ? true : false;
      const matchSummary = this.parseMatchSummary(match.data.Summary, isTournament);
      this.allMatchesData.push({
        matchId: match.data.MatchID,
        venue: match.data.Venue,
        batOrChase: match.data.BatorChase,
        result: this.getMatchResult(match.data.Result, match.data.BatorChase, matchSummary),
        mom: this.playerDetailMap[match.data.MOM] ? this.playerDetailMap[match.data.MOM].Name : null,
        teamScore: matchSummary.teamScore,
        opponentScore: matchSummary.opponentScore,
        opponentName: matchSummary.opponentName,
        matchType: matchSummary.matchType,
        isTournament,
        matchDate: this.getMatchDate(match.data.Date)
      });
      this.sortedMatchIdList.push(match.data.MatchID);
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
  parseMatchSummary(summaryString, isTournament) {
    const tmpString = summaryString.split('&');
    let teamStr = tmpString[0].indexOf('We') !== -1 ? tmpString[0] : tmpString[1];
    teamStr = teamStr.replace('We', '').trim();
    let opponentStr = tmpString[0].indexOf('Opponent') !== -1 ? tmpString[0] : tmpString[1];
    const opponentName = tmpString[2] ? tmpString[2].split('=')[1] : 'Opponent';
    const matchType = isTournament ? tmpString[3] ? tmpString[3].split('=')[1] : 'Tournament' : 'Practice match';
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
      },
      opponentName,
      matchType
    };
  }
  getMatchResult(resultCode, batOrChase , matchSummary) {
    let summary = '';
    const teamScore = matchSummary.teamScore.runs.split('-')[0];
    const opponentScore = matchSummary.opponentScore.runs.split('-')[0];
    const teamWickets = matchSummary.teamScore.runs.split('-')[1];
    const opponentWickets = matchSummary.opponentScore.runs.split('-')[1];
    if (resultCode === '1') {
      summary = 'Chennai Bulls won by ';
      if (batOrChase === '1') {
        summary = `${summary}${teamScore - opponentScore} runs.`;
      } else {
        summary = `${summary}${10 - teamWickets} wickets`;
      }
    } else if (resultCode === '0') {
      summary = `${matchSummary.opponentName} won by `;
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
  getChartData() {
    const chartData = {};
    const playerScoreMap = {};
    const matchPlayerMap = {};
    this.sortedMatchIdList.forEach((matchId, matchIndex) => {
      if (this.scoreCardDataMap[matchId]) {
        matchIndex = matchIndex + 1;
        chartData[matchIndex] = [];
        this.scoreCardDataMap[matchId].forEach((player) => {
          playerScoreMap[player.playerName] = playerScoreMap[player.playerName] || {};
          playerScoreMap[player.playerName].runs = playerScoreMap[player.playerName].runs ? playerScoreMap[player.playerName].runs : 0;
          playerScoreMap[player.playerName].runs += Number(player.Runs);
          matchPlayerMap[matchId] = matchPlayerMap[matchId] || {};
          matchPlayerMap[matchId][player.playerName] = true;
          const playerScoreObj = {
            player: player.playerName,
            runs: playerScoreMap[player.playerName].runs
          };
          chartData[matchIndex].push(playerScoreObj);
        });
        // push other player details if not present for current match
        Object.keys(this.playerDetailMap).forEach((playerId) => {
          const playerName = this.playerDetailMap[playerId].Name;
          if (!matchPlayerMap[matchId][playerName]) {
            playerScoreMap[playerName] = playerScoreMap[playerName] || {};
            playerScoreMap[playerName].runs = playerScoreMap[playerName].runs ? playerScoreMap[playerName].runs : 0;
            chartData[matchIndex].push({
              player: playerName,
              runs: playerScoreMap[playerName].runs
            });
          }
        });
      }
    });
    // sort the chart data by player name so that the charts are plotted correctly
    this.sortChartData(chartData);
    return chartData;
  }
  sortChartData(chartData) {
    Object.keys(chartData).forEach((matchIndex) => {
      chartData[matchIndex] = chartData[matchIndex].sort((a, b) => a.player.localeCompare(b.player));
    });
    return chartData;
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
  getMatchDate(date) {
    let formattedDate = '';
    try {
      const tempDate = date.split('/');
      const newDate = new Date(`${tempDate[1]}/${tempDate[0]}/${tempDate[2]}`);
      formattedDate = newDate.toDateString();
    } catch (e) {
      formattedDate = '';
    }
    return formattedDate;
  }
  matchDateSort(a, b) {
    const tempADate = a.data.Date.split('/');
    const newADate = `${tempADate[1]}/${tempADate[0]}/${tempADate[2]}`;
    const tempBDate = b.data.Date.split('/');
    const newBDate = `${tempBDate[1]}/${tempBDate[0]}/${tempBDate[2]}`;
    return new Date(newADate).getTime() - new Date(newBDate).getTime();
  }
}
