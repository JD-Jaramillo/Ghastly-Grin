import React from "react";
import "./style.css";

function CreateGame() {
  return (
    <form>
      <div class="form-group">
        {/* <label for="exampleFormControlSelect1">How Many Players will your game have?</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select> */}
        <button type="submit" class="btn">Create Game</button>
      </div>
    </form>
  )
}

export default CreateGame;