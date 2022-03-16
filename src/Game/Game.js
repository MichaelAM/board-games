const Game = (props) => {
  return (
    <>
      <div className="m-4 p-2 text-center">
        <h2 className="text-xl font-semibold mb-2">{props.game.name}</h2>
        <a
          href={`https://boardgamegeek.com/boardgame/${props.game.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={props.game.thumbnail}
            alt={`Cover for ${props.game.name}`}
            className="m-auto inline"
          ></img>
        </a>
        <p>
          Players: {props.game.minPlayers} - {props.game.maxPlayers}
        </p>
        {/* <p>{props.game.description}</p> */}
      </div>
    </>
  );
};

export default Game;
