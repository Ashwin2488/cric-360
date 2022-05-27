/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const clonedData = JSON.parse(JSON.stringify(data));
  const latestMatchId = clonedData.allMatchesData.reverse()[0].matchId;
  const lastWeekRatingMap = { Runs: { previousWeek: {} }, Wickets: { previousWeek: {} } };
  let sortedPreviousWeekMostRuns = [];
  let sortedPreviousWeekMostWickets = [];
  console.log('AAA', clonedData);
  clonedData.mostRunsList.forEach((mostRunsListItem, index) => {
    clonedData.allScoreCard.some((allScoreCardItem) => {
      if (allScoreCardItem.data.MatchID === latestMatchId && allScoreCardItem.data.PlayerID === mostRunsListItem.data.PlayerID) {
          mostRunsListItem.data.AllmatchData.Runs -= parseInt(allScoreCardItem.data.Runs);
          mostRunsListItem.data.AllmatchData.Runs = mostRunsListItem.data.AllmatchData.Runs < 0 ? 0 
            : mostRunsListItem.data.AllmatchData.Runs;
            return true;
      }
    });
  });

  clonedData.mostWicketsList.forEach((mostWicketsListItem, index) => {
    clonedData.allScoreCard.some((allScoreCardItem) => {
      if (allScoreCardItem.data.MatchID === latestMatchId && allScoreCardItem.data.PlayerID === mostWicketsListItem.data.PlayerID) {
          mostWicketsListItem.data.AllmatchData.Wickets = mostWicketsListItem.data.AllmatchData.Wickets - parseInt(allScoreCardItem.data.Wickets);
          mostWicketsListItem.data.AllmatchData.Wickets = mostWicketsListItem.data.AllmatchData.Wickets < 0 ? 0
              : mostWicketsListItem.data.AllmatchData.Wickets;
              return true
      }
    });
  });

  const customSort = (property) => (a, e) => e.data.AllmatchData[property] - a.data.AllmatchData[property];

  sortedPreviousWeekMostRuns = clonedData.mostRunsList.slice(0).sort(customSort('Runs'));
  sortedPreviousWeekMostWickets = clonedData.mostWicketsList.slice(0).sort(customSort('Wickets'));

  sortedPreviousWeekMostRuns.forEach((preMostRunItem, index) => {
    lastWeekRatingMap.Runs.previousWeek[preMostRunItem.data.PlayerID] = index + 1;
  });
  sortedPreviousWeekMostWickets.forEach((preMostWicketItem, index) => {
    lastWeekRatingMap.Wickets.previousWeek[preMostWicketItem.data.PlayerID] = index + 1;
  })
  
  postMessage(lastWeekRatingMap);
});
