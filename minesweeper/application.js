var Minesweeper = window.Minesweeper = window.Minesweeper || {};

var Game = React.createClass({
  getInitialState: function() {
    return { board: new Minesweeper.Board(4, 1),
             over: false,
             won: false
           };
  },

  updateGame: function (e) {
    console.log("this is working, i swear")
    // e.currentTarget.explore();
  },

  render: function () {

    return (<Board board={this.state.board} gameUpdate={this.updateGame}>
              Im a board
            </Board>);
  },
});

var Board = React.createClass({

  getInitialState: function () {
    return ({ value: "B" });
  },

  render: function () {

    var size = this.props.board.gridSize;
    var tiles = [];
    for (var i = 0; i < size; i++) {
      tiles.push([]);
    }
    for (i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        tiles[i].push(<Tile pos={[i,j]} gameUpdate={this.props.gameUpdate}>{this.state.value}</Tile>);
      }
    }
    return (<div className="board group">{tiles}</div>);
    //
    //   <div>{this.props.board.map(function(row, rowIdx) {
    //     row.map(function(tile, tileIdx) {
    //       <Tile onClick={this.props.onClick} pos={[rowIdx, tileIdx]}></Tile>
    //     })
    //   })}
    // );
  }

});

var Tile = React.createClass({

  getInitialState: function () {
    return ({ value: "T" });
  },

  render: function () {
    if (this.bombed) {
      return <div pos={this.props.pos} className="tile bombed" onClick={this.props.gameUpdate}>⊛</div>;
    } else if (this.flagged) {
      return <div className="tile flagged" onClick={this.props.gameUpdate}>F</div>;
    } else if (this.explored) {
      return <div className="tile explored" onClick={this.props.gameUpdate}>{this.adjacentBombCount()}</div>;
    } else {
      return <div pos={this.props.pos} className="tile" onClick={this.props.gameUpdate}></div>;
    }
  }

});
