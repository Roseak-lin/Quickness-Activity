var count = 0, best = Infinity, sumOfTimes = 0, attempts = 0, blueTilesClicked = 0;
var start, end;

function buildTable() {
    let html = "<table style='border: 1px solid black'><tr>";
    let bID = 0;
    for (let i = 0; i < 4; i++) {
        let used = false;
        for (let j = 0; j < 4; j++) {
            bID++;
            let n = Math.random() * 10;
            if (j == 3 && !used) {
                html += "<td><button id='" + bID + "' onclick='tileClick(1, " + bID + ")' class='red-btn'/></td>"
                break;
            }
            if (n < 3 && !used) {
                html += "<td><button id='" + bID + "' onclick='tileClick(1, " + bID + ")' class='red-btn'/></td>"
                used = true;
            } else {
                html += "<td><button id='" + bID + "' onclick='tileClick(0, " + bID + ")' class='blue-btn'/></td>"
            }
        }
        html += "</tr><tr>";
    }
    html += "<tr><table>";
    document.getElementById("grid").innerHTML = html;
}

function tileClick(x, y) {
    document.getElementById(y).disabled = true;
    document.getElementById(y).setAttribute("style", "background-color: transparent; height: 15vh; width: 15vh");
    let html = "";

    if (x == 1) {
        count++;
        if (count == 4) {
            end = performance.now();
            attempts++;
            let time = end - start + (50 * blueTilesClicked);
            sumOfTimes += time - 0.0005;
            best = Math.min(best, time - 0.0005);
            html += "Your last attempt was " + ((time).toFixed(0)) + " ms<br>Blue tiles clicked last attempt: " + blueTilesClicked + "<br><br>";
            html += "<b>Your best time so far is: " + best.toFixed(0) + " ms</b><br>";
            html += "<b>Your average time is: " + (sumOfTimes / attempts).toFixed(0) + " ms</b>";
            document.getElementById("HighScore").innerHTML = html;

            // disable buttons 
            let blue = document.getElementsByClassName("blue-btn");
            for (let i = 0; i < blue.length; i++) {
                blue[i].disabled = true;
            }
        }
    } else {
        blueTilesClicked++;
    }
}


function countdown() {
    count = 0;
    blueTilesClicked = 0;
    document.getElementsByClassName("start")[0].disabled = true;
    let html = "<table>";
    for (let i = 0; i < 4; i++) {
        html += "<tr style='height: 15vh'/>";
    }
    html += "</table>";
    document.getElementById("grid").innerHTML = html;
    document.getElementById("countdown").innerHTML = 3;

    // countdown function
    let seconds = 2;
    var x = setInterval(function () {
        document.getElementById("countdown").innerHTML = seconds;
        seconds -= 1;
        if (seconds < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "GO";
            start = performance.now();
            buildTable();
            document.getElementsByClassName("start")[0].disabled = false;
        }
    }, 1000);
}

function turnOffOverlay() {
    $("#overlay").fadeOut(150)
}

function turnOnOverlay() {
    $("#overlay").fadeIn(150)
}
