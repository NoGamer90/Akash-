// A simple HTML + JavaScript chess game using the chessboard.js and chess.js libraries // You need to include these libraries in your HTML file // <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script> // <script src="https://cdnjs.cloudflare.com/ajax/libs/chessboard.js/1.0.0/chessboard.min.js"></script> // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chessboard.js/1.0.0/chessboard.min.css" />

<html>
  <head>
    <title>Simple Chess Game</title>
    <style>
      #board {
        width: 400px;
        margin: 20px auto;
      }
    </style>
  </head>
  <body>
    <h2 style="text-align:center;">Chess Game</h2>
    <div id="board"></div>
    <p style="text-align:center;" id="status"></p><script>
  const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: onDrop
  });

  const game = new Chess();

  function onDrop(source, target) {
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q' // always promote to a queen for simplicity
    });

    if (move === null) return 'snapback';

    updateStatus();
  }

  function updateStatus() {
    let status = '';

    let moveColor = 'White';
    if (game.turn() === 'b') {
      moveColor = 'Black';
    }

    if (game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.';
    } else if (game.in_draw()) {
      status = 'Game over, drawn position.';
    } else {
      status = moveColor + ' to move';

      if (game.in_check()) {
        status += ', ' + moveColor + ' is in check';
      }
    }

    document.getElementById('status').innerHTML = status;
  }
</script>

  </body>
</html>