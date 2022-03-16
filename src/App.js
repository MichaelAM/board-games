import "./App.css";
import List from "./List/List";
import Controls from "./Controls/Controls";
import React from "react";
import { getXMLData } from "./tools/Toolkit.ts";

const RETRIEVE_COLLECTION_SCRIPT =
  "https://boardgamegeek.com/xmlapi2/collection?username=MichaelAM&subtype=boardgame&own=1&excludesubtype=boardgameexpansion";
const RETRIEVE_GAMES_SCRIPT = "https://boardgamegeek.com/xmlapi2/thing?id=";

const App = () => {
  // --------------------------------------------- event handlers
  // Fetch list of user's games then request additional details from api
  const collectionHandler = (result) => {
    let xmlCollection = result.querySelectorAll("item");
    let gameIDs = Array.from(xmlCollection).map((xmlGame) => {
      return xmlGame.getAttribute("objectid");
    });

    // Request additional data from api for all games in collection
    getXMLData(
      RETRIEVE_GAMES_SCRIPT + gameIDs.join(","),
      gamesHandler,
      onError
    );
  };

  // Receive games data and create array of relevant information
  const gamesHandler = (result) => {
    let xmlGames = result.querySelectorAll("item");
    let gamesArray = [];
    xmlGames.forEach((xmlGame) => {
      // Create a game object with just the needed data
      let game = {
        id: xmlGame.getAttribute("id"),
        name: xmlGame
          .querySelector("name[type='primary']")
          .getAttribute("value"),
        thumbnail: xmlGame.querySelector("thumbnail").textContent,
        description: xmlGame.querySelector("description").textContent,
        minPlayers: Number(
          xmlGame.querySelector("minplayers").getAttribute("value")
        ),
        maxPlayers: Number(
          xmlGame.querySelector("maxplayers").getAttribute("value")
        ),
      };
      gamesArray.push(game);
    });
    setGames(gamesArray);
  };

  const onError = () =>
    console.log("*** Error has occured during AJAX data transmission");

  React.useEffect(() => {
    // Initial retrieval of board game data
    getXMLData(RETRIEVE_COLLECTION_SCRIPT, collectionHandler, onError);
  }, []);

  // --------------------------------------------- state setup
  const [games, setGames] = React.useState([]);
  const [numPlayers, setNumPlayers] = React.useState("any");

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Controls
          numPlayers={numPlayers}
          setNumPlayers={(num) => setNumPlayers(num)}
        />
        <List games={games} numPlayers={numPlayers} />
      </main>
    </div>
  );
};

export default App;
