class IEvent {
    constructor(eventType = 0, mousePosition = {x: 0, y: 0}, keyPressed = 0) {
        this.eventType      = eventType;
        this.mousePosition  = mousePosition;
        this.keyPressed     = keyPressed;
    }
}

class IMenu {
    constructor(buttons = [], manager = 0) {
        this.manager = manager;
        this.buttons = buttons;
    }
    
    RequestMenuChange(menuIndex) {
        if (this.manager)
            this.manager.ChangeMenu(menuIndex);
    }
    
    //event callback (virtual)
    Notify(event) {
        if (event.eventType == 0) {
            this.buttons.forEach(button => {
                if (button.CheckCollision(event.mousePosition)) {
                    button.OnNotify();
                    return;
                } 
          });
        }
    }

    //virtual
    Show() {
        fill(255);
        this.buttons.forEach(button => button.Show());
    }
    
    AddButton(button) {
        let buttonId = this.buttons.length;
        button.menu  = this;
        this.buttons.push(button);
        return buttonId;
    }
    
    RemoveButton(buttonId) {
        if (buttonId >= 0 && buttonId <= this.buttons.length - 1)
            this.buttons.splice(0, buttonId);
    }
  }


class MainMenu extends IMenu {
    constructor(buttons = [], manager = 0) {
        super(buttons, manager);

        //play button
        this.play = this.AddButton(new ChangeMenuButton(
                {pX: width / 2 - 100, pY: height / 3 + 75 * 1},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60},
                Menus.Play
            ));
        this.buttons[this.play].AddText({tR: 255, tG: 255, tB: 255}, 32, "Play");

        //settings button
        this.settings = this.AddButton(new ChangeMenuButton(
                {pX: width / 2 - 100, pY: height / 3 + 75 * 2},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60},
                Menus.Settings
            ));
        this.buttons[this.settings].AddText({tR: 255, tG: 255, tB: 255}, 32, "Settings");
      
        //top-scores button
        this.topScores = this.AddButton(new ChangeMenuButton(
                {pX: width / 2 - 100, pY: height / 3 + 75 * 3},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60},
                Menus.Top
            ));
        this.buttons[this.topScores].AddText({tR: 255, tG: 255, tB: 255}, 32, "Top-Scores");

        //exit button
        this.exit = this.AddButton(new ExitButton(
            {pX: width / 2 - 100, pY: height / 3 + 75 * 4},
            {dX: 200, dY: 50},
            {r: 60, g: 150, b: 60},
        ));
        this.buttons[this.exit].AddText({tR: 255, tG: 255, tB: 255}, 32, "Exit");
        
        this.title      = "Tetris";
        this.courseCode = "2022\n2805ICT / 3815ICT";
        this.members    = "Brendon Rauch\nMohit Bishnoi\nPatrick Czaczka\nMitchell Muriwai";
    }

    Show() {
        fill(255);
        this.buttons.forEach(button => button.Show());

        textSize(width / 10);
        textAlign(CENTER, CENTER);

        //title
        text(this.title, width / 2, 100);

        //course
        textSize(width / 20);
        text(this.courseCode, width / 2, 100 + width / 10 + 20);

        //members
        textSize(width / 30);
        text(this.members, width / 2, height - width / 30 * 4);
    }
}


class SettingsMenu extends IMenu {
    constructor(buttons = [], manager = 0) {
        super(buttons, manager);

        //back button
        this.back = this.AddButton(new ChangeMenuButton(
                {pX: 0, pY: 0},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60},
                Menus.Main
            ));
        this.buttons[this.back].AddText({tR: 255, tG: 255, tB: 255}, 32, "Back");

        //difficulty button
        this.difficulty = this.AddButton(new IncrementButton(
                {pX: width / 2 - 100, pY: 100},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60},
                0
            ));
        this.buttons[this.difficulty].total = 2;
        this.buttons[this.difficulty].currentText = [
            "normal", "extended"
        ];
        this.buttons[this.difficulty].AddText({tR: 255, tG: 255, tB: 255}, 32, this.buttons[this.difficulty].currentText[0]);

        //AI button
        this.ai = this.AddButton(new IncrementButton(
                {pX: width / 2 - 100, pY: 100 + 75 * 1},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60},
                0
            ));
        this.buttons[this.ai].total = 2;
        this.buttons[this.ai].currentText = [
            "player", "AI"
        ];
        this.buttons[this.ai].AddText({tR: 255, tG: 255, tB: 255}, 32, this.buttons[this.ai].currentText[0]);
        
        //Game level button
        this.gameLevel = this.AddButton(new IncrementButton(
                {pX: width / 2 - 100, pY: 100 + 75 * 2},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60}
            ));
        this.buttons[this.gameLevel].total = 3;
        this.buttons[this.gameLevel].currentText = [
            "slow", "medium", "fast"
        ];
        this.buttons[this.gameLevel].AddText({tR: 255, tG: 255, tB: 255}, 32, this.buttons[this.gameLevel].currentText[0]);

        //Game field button
        this.gameField = this.AddButton(new IncrementButton(
            {pX: width / 2 - 100, pY: 100 + 75 * 3},
            {dX: 200, dY: 50},
            {r: 60, g: 150, b: 60}
            ));
        this.buttons[this.gameField].total = 3;
        this.buttons[this.gameField].currentText = [
            "20 x 20", "30 x 30", "40 x 40"
        ];
        this.buttons[this.gameField].AddText({tR: 255, tG: 255, tB: 255}, 32, this.buttons[this.gameField].currentText[0]);
    }
}


class TopScoresMenu extends IMenu {
    constructor(buttons = [], manager = 0, scores = []) {
        super(buttons, manager);

        //array containing top ten scores
        this.scores = scores;

        //back button
        this.back = this.AddButton(new ChangeMenuButton(
                {pX: 0, pY: 0},
                {dX: 200, dY: 50},
                {r: 60, g: 150, b: 60},
                Menus.Main));
        this.buttons[this.back].AddText({tR: 255, tG: 255, tB: 255}, 32, "Back");
    }

    Show() {
        fill(255);
        this.buttons.forEach(button => button.Show());

        let count = scores.length > 10 ? 10 : this.scores.length;
        for (let i = 0; i < count; i++) {
            textSize(width / 20);
            textAlign(CENTER, CENTER);
            text(this.scores[i], width / 2, 100 + i * 50);
        }
    }
}


class PlayMenu extends IMenu {
    constructor(buttons = [], manager = 0, scores = []) {
        super(buttons, manager);

        this.currentPiece;
        this.platform;

        this.promptExit = false;
    }

    Show() {
        createCanvas(canvasWidth, canvasHeight);
        background(backgroundColor);

        if (this.promptExit) {
            fill(60, 150, 60);
            rect(canvasWidth / 2 - 100, canvasHeight / 2, 200, 50);
            rect(canvasWidth / 2 - 100, canvasHeight / 2 + 75, 200, 50);

            fill(255);
            textSize(32);
            text("Would you like to exit?", width / 2, 100);
            text("Yes", canvasWidth / 2 - 100, canvasHeight / 2, 200, 50);
            text("No", canvasWidth / 2 - 100, canvasHeight / 2 + 75, 200, 50);
        } else {
            textSize(16);
            text(
                "Group number: 12" +
                "\nscore: " + points +
                "\nLines eliminated: 0" +
                "\nGame field: 20 x 20" +
                "\nGame level: medium" +
                "\nGame type:  normal" +
                "\nGame mode:  player", 90, 90
            );
    
            this.platform.show();
            this.currentPiece.show();
        }
    }

    ApplyGravity() {
        if(!this.currentPiece.canCollide(box => box.y + boxDimension === height) && !this.platform.piecesColliding(this.currentPiece)){
            this.currentPiece.y += boxDimension;
        } else {
            this.currentPiece.canCollide(box => box.y === begginingPoint) ? setup() : this.platform.placePiece(this.currentPiece); this.platform.cleanFilledRows(); this.GenerateNewPiece();
        }
    }

    GenerateNewPiece() {
        let index = Math.floor((Math.random() * pieces.length))
        let indexColor = Math.floor((Math.random() * colors.length))
        this.currentPiece = new Piece(pieces[index], width / 2, -boxDimension * marginPieceBeginning, colors[indexColor])
    }

    Notify(event) {
        if (event.eventType == 0 && this.promptExit) {
            if (event.mousePosition.x > canvasWidth / 2 - 50 &&
                event.mousePosition.x < canvasWidth / 2 + 50 &&
                event.mousePosition.y > canvasHeight / 2 &&
                event.mousePosition.y < canvasHeight / 2 + 50) {
                    setup();
                } else if (event.mousePosition.x > canvasWidth / 2 - 50 &&
                event.mousePosition.x < canvasWidth / 2 + 50 &&
                event.mousePosition.y > canvasHeight / 2 + 75 &&
                event.mousePosition.y < canvasHeight / 2 + 125) {
                    this.promptExit = false;
                }
        } else if (event.eventType == 1) {
            if (event.keyPressed === UP_ARROW) {
                this.currentPiece.rotation();
            } if (event.keyPressed === RIGHT_ARROW && !this.currentPiece.canCollide(box => box.x + boxDimension === width) && !this.platform.piecesColliding(this.currentPiece, (rect1, rect2) => rectCollision(rect1, rect2), (box) => box.x += boxDimension)) {
                this.currentPiece.x += boxDimension;
            } if (event.keyPressed === LEFT_ARROW && !this.currentPiece.canCollide(box => box.x === begginingPoint) && !this.platform.piecesColliding(this.currentPiece, (rect1, rect2) => rectCollision(rect1, rect2), (box) => box.x -= boxDimension)) {
                this.currentPiece.x -= boxDimension;
            } if (event.keyPressed === DOWN_ARROW) {
                this.ApplyGravity();
            } if (event.keyPressed === ESCAPE) {
                this.promptExit = true;
            }
        }
    }
}