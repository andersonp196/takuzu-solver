function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == what) {
            count++;
        }
    }
    return count;
}

function getCol(matrix, col){
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
       column.push(matrix[i][col]);
    }
    return column;
}

function main() {
    var tiles = document.querySelector('.board-back').childNodes;
    var size = Math.sqrt(tiles.length);
    var board = [];
    var moves = 0; 

    if (board.length == 0) {
        for (var row = 0; row < size; row++) {
            board.push([]);
            for (var col = 0; col < size; col++) {
                if (tiles[(row*size)+col].classList.contains('cell-off')) {
                    board[row].push('');
                }else if (tiles[(row*size)+col].classList.contains('cell-0')) {
                    board[row].push('0');
                    moves++;
                }else if (tiles[(row*size)+col].classList.contains('cell-1')) {
                    board[row].push('1');
                    moves++;
                }
            }
        }
    }

    while (moves < tiles.length) {

        //if there are three of one in a row
        for (var row = 0; row < size; row++) {
            if (countInArray(board[row], '0') == (size/2)) {
                for (var col = 0; col < size; col++) {
                    if (board[row][col] == '') {
                        board[row][col] = '1';
                        moves++;
                    }
                }
            }else if (countInArray(board[row], '1') == (size/2)) {
                for (var col = 0; col < size; col++) {
                    if (board[row][col] == '') {
                        board[row][col] = '0';
                        moves++;
                    }
                }
            }
        }
    
        //if there are three of one in a column
        for (var col = 0; col < size; col++) {
            if (countInArray(getCol(board, col), '0') == (size/2)) {
                for (var row = 0; row < size; row++) {
                    if (board[row][col] == '') {
                        board[row][col] = '1';
                        moves++;
                    }
                }
            }else if (countInArray(getCol(board, col), '1') == (size/2)) {
                for (var row = 0; row < size; row++) {
                    if (board[row][col] == '') {
                        board[row][col] = '0';
                        moves++;
                    }
                }
            }
        }
    
        for (var row = 0; row < size; row++) {
            for (var col = 0; col < size; col++) {
        
                //solving left and right if two in a row
                try {
                    if (board[row][col] == board[row][col+1] && board[row][col] != '') {
                        if (board[row][col+2] == '') {
                            if (board[row][col] == '0') {
                                board[row][col+2] = '1';
                                moves++;
                            }else {
                                board[row][col+2] = '0';
                                moves++;
                            }
                        }
                        if (board[row][col-1] == '') {
                            if (board[row][col] == '0') {
                                board[row][col-1] = '1';
                                moves++;
                            }else {
                                board[row][col-1] = '0';
                                moves++;
                            }
                        }
                    }
                }catch {
                    //tile doesn't exist
                }
        
                //solving top and bottom if two in a stack
                try {
                    if (board[row][col] == board[row+1][col] && board[row][col] != '') {
                        if (board[row+2][col] == '') {
                            if (board[row][col] == '0') {
                                board[row+2][col] = '1';
                                moves++;
                            }else {
                                board[row+2][col] = '0';
                                moves++;
                            }
                        }
                        if (board[row-1][col] == '') {
                            if (board[row][col] == '0') {
                                board[row-1][col] = '1';
                                moves++;
                            }else {
                                board[row-1][col] = '0';
                                moves++;
                            }
                        }
                    }   
                }catch {
                    //tile doesn't exist
                }
        
                //solving two in a row with an empty cell in the middle
                try {
                    if (board[row][col] == board[row][col+2] && board[row][col] != '') {
                        if (board[row][col+1] == '') {
                            if (board[row][col] == '0') {
                                board[row][col+1] = '1';
                                moves++;
                            }else {
                                board[row][col+1] = '0';
                                moves++;
                            }
                        }
                    }
                }catch {
                    //tile doesn't exist
                }
        
                //solving two in a stack with an empty cell in the middle
                try {
                    if (board[row][col] == board[row+2][col] && board[row][col] != '') {
                        if (board[row+1][col] == '') {
                            if (board[row][col] == '0') {
                                board[row+1][col] = '1';
                                moves++;
                            }else {
                                board[row+1][col] = '0';
                                moves++;
                            }
                        }
                    }
                }catch {
                    //tile doesn't exist
                }
            }
        }
    }
    
    for (var row = 0; row < size; row++) {
        for (var col = 0; col < size; col++) {
            if (tiles[(row*size)+col].classList.contains('selectable')) {
                if (board[row][col] == '0') {
                    tiles[(row*size)+col].style.backgroundColor = 'white'
                }else if (board[row][col] == '1') {
                    tiles[(row*size)+col].style.backgroundColor = '#515151'
                }
            }
        }
    }
}

main()




