var repl = require("repl"),
    pos  = [
        [
            "", "", ""
        ],
        [
            "", "", ""
        ],
        [
            "", "", ""
        ]
    ];
repl.start({
    eval  : function (cmd, context, filename, callback) {
        var x     = 0,
            o     = 0,
            board = function () {
                var line = "",
                    a    = 0;
                do {
                    line = "";
                    if (a > 0) {
                        console.log("----------");
                    } else {
                        console.log("");
                    }
                    if (pos[a][0] === "x" || pos[a][0] === "o") {
                        line = pos[a][0];
                    } else {
                        line = " ";
                    }
                    line = line + " | ";
                    if (pos[a][1] === "x" || pos[a][1] === "o") {
                        line = line + pos[a][1];
                    } else {
                        line = line + " ";
                    }
                    line = line + " | ";
                    if (pos[a][2] === "x" || pos[a][2] === "o") {
                        line = line + pos[a][2];
                    } else {
                        line = line + " ";
                    }
                    console.log(line);
                    a = a + 1;
                } while (a < 3);
            },
            cell  = [],
            data  = cmd.replace(/\s+/g, "");
        if (data === "exit" || data === "'exit'" || data === "\"exit\"") {
            process.exit(0);
        }
        cell    = data.split(",");
        cell[0] = cell[0] - 1;
        cell[1] = cell[1] - 1;
        if ((/\d,\d/).test(data) === true) {
            if (pos[cell[0]][cell[1]] === "") {
                pos[cell[0]][cell[1]] = "x";
                (function () {
                    var b = 0,
                        c = 0;
                    cc   = 0,
                    ce   = 0,
                    dc   = 0,
                    done = false;
                    if (pos.toString().split("x").length < 3) {
                        // first ai move
                        if (cell[0] === 0 || cell[1] === 0 || cell[0] + cell[1] !== 2) {
                            pos[1][1] = "o";
                        } else {
                            pos[0][1] = "o";
                        }
                    } else {
                        // check for win state by row
                        do {
                            c  = 0;
                            cc = 0;
                            do {
                                if (pos[b][c] === "o") {
                                    cc = cc + 1;
                                } else if (pos[b][c] === "") {
                                    ce = c;
                                }
                                c = c + 1;
                            } while (c < 3);
                            if (cc > 1 && pos[b][ce] === "") {
                                pos[b][ce] = "o";
                                board();
                                console.log("I win on row " + (
                                    b + 1
                                ) + ", you loose!");
                                process.exit(0);
                            }
                            b = b + 1;
                        } while (b < 3);

                        // check for win state by column
                        b  = 0;
                        c  = 0;
                        ce = 0;
                        cc = 0;
                        do {
                            c  = 0;
                            cc = 0;
                            do {
                                if (pos[c][b] === "o") {
                                    cc = cc + 1;
                                } else if (pos[c][b] === "") {
                                    ce = c;
                                }
                                c = c + 1;
                            } while (c < 3);
                            if (cc > 1 && pos[ce][b] === "") {
                                pos[ce][b] = "o";
                                board();
                                console.log("I win on column " + (
                                    b + 1
                                ) + ", you loose!");
                                process.exit(0);
                            }
                            b = b + 1;
                        } while (b < 3);

                        // check for win state by diagnol
                        if (((pos[0][0] === "o" && pos[2][2] === "o") || (pos[0][2] === "o" && pos[2][0] === "o")) && pos[1][1] === "") {
                            pos[1][1] = "o";
                            board();
                            console.log("I win on diagnal, you loose!");
                            process.exit(0);
                        }
                        if (pos[1][1] === "o" && pos[0][2] === "o" && pos[2][0] === "") {
                            pos[2][0] = "o";
                            board();
                            console.log("I win on diagnal, you loose!");
                            process.exit(0);
                        }
                        if (pos[1][1] === "o" && pos[2][0] === "o" && pos[0][2] === "") {
                            pos[0][2] = "o";
                            board();
                            console.log("I win on diagnal, you loose!");
                            process.exit(0);
                        }
                        if (pos[1][1] === "o" && pos[0][0] === "o" && pos[2][2] === "") {
                            pos[2][2] = "o";
                            board();
                            console.log("I win on diagnal, you loose!");
                            process.exit(0);
                        }
                        if (pos[1][1] === "o" && pos[2][2] === "o" && pos[0][0] === "") {
                            pos[0][0] = "o";
                            board();
                            console.log("I win on diagnal, you loose!");
                            process.exit(0);
                        }


                        b  = 0;
                        c  = 0;
                        ce = 0;
                        cc = 0;
                        do {
                            if (pos[b][cell[1]] === "x") {
                                cc = cc + 1;
                            } else {
                                ce = b;
                            }
                            b = b + 1;
                        } while (b < 3);
                        if (cc > 1 && pos[ce][cell[1]] === "") {
                            pos[ce][cell[1]] = "o";
                        } else {
                            b  = 0;
                            ce = 0;
                            cc = 0;
                            do {
                                if (pos[cell[0]][b] === "x") {
                                    cc = cc + 1;
                                } else {
                                    ce = b;
                                }
                                b = b + 1;
                            } while (b < 3);
                            if (cc > 1 && pos[cell[0]][ce] === "") {
                                pos[cell[0]][ce] = "o";
                            } else {
                                b = 0;
                                c = 0;
                                do {
                                    do {
                                        if (pos[b][c] === "") {
                                            pos[b][c] = "o";
                                            done      = true;
                                            break;
                                        }
                                        c = c + 1;
                                    } while (c < 3);
                                    b = b + 1;
                                } while (b < 3 && done === false);
                            }
                        }
                    }
                }());
            } else {
                if (pos[cell[0]][cell[1]] === "x") {
                    console.log("Doh.. you already went there.");
                } else {
                    console.log("Nope. I already went there.");
                }
            }
        } else {
            console.log(
                "Please make your move by stating a line number and a column number from 1 to 3"
            );
            console.log("Example: 1, 3");
            console.log("type 'exit' to quit");
        }
        board();
        this.displayPrompt();
    },
    prompt: "tictac> "
});