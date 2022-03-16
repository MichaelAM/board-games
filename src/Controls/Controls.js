const Controls = (props) => {
  return (
    <div className="text-center mt-4">
      <label htmlFor="players-select">Number of Players: </label>
      <select
        name="players-select"
        id="players-select"
        value={props.numPlayers}
        onChange={(e) => props.setNumPlayers(e.target.value)}
      >
        <option value="any">Any</option>
        {/* Generate the options for the select element */}
        {[...Array(12).keys()].map((el, i) => (
          <option key={i} value={el + 1}>
            {el + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Controls;
