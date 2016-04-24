# Mind map for bridge calculator

## What this App does?
It calculates score for bridge game according to user input.

## Workflow?
1. Input number of players and players name.
2. Start first round.
3. For each round, ask for guess. Then wait input for actual stack.
4. After started, display scoreboard that can be viewed anytime.
5. When the game ends, display scoreboard.

## Scoreboard?
Display position, name, score, scores in each round.

## Reminder?
 - Check for each guess. Cannot exceed round number and must obey that rule.
 - Select maker (first guess dude) for each term.

## Validation
 - No. of player > 0
 - No. of player <= 52

## Future features
 - Save round result into localsotrage.
 - Service Worker
 - Allow more than 52 cards (just a troll)
 - Log for previous games
 - Duration logging
 - Fancy Chart.js for showing chart in scoreboard

## Components
1. Service (injectable) to provide players name and scoreboard.
2. App component.
3. Game
4. InputGuess.
5. InputActual
6. ScoreBoard (table)
