import Game from "./../Game/Game";

const List = (props) => {
  return (
    <>
      {props.games.map(
        (game, n) =>
          // Display the game if selected number of players is "any"
          // or within range
          (props.numPlayers === "any" ||
            (props.numPlayers >= game.minPlayers &&
              props.numPlayers <= game.maxPlayers)) && (
            <div key={n}>
              <Game game={game} />
              <hr />
            </div>
          )
      )}
    </>
  );
};

export default List;
