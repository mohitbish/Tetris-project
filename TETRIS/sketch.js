//Menu state globals
let menuManager;
let scores;
let bg;
let points;

function preload() {
    scores = loadStrings("scores.txt");
    bg     = loadImage("Menu/images/blur.jpg");
}

function setup() {
    createCanvas(1000, 1000);
    menuManager = new MenuManager();

    //Main menu
    menuManager.AddMenu(new MainMenu(), Menus.Main);

    //Play menu
    menuManager.AddMenu(new PlayMenu(), Menus.Play);
    menuManager.menus[Menus.Play].GenerateNewPiece();
    menuManager.menus[Menus.Play].platform = new Platform();
    setInterval(() => menuManager.menus[Menus.Play].ApplyGravity(), timeInterval);
    points = startingPoints;

    //Settings menu
    menuManager.AddMenu(new SettingsMenu(), Menus.Settings);

    //Scores menu
    menuManager.AddMenu(new TopScoresMenu(), Menus.Top);
    menuManager.menus[Menus.Top].scores = scores;
}

function draw() {
    background(bg);
    menuManager.ShowCurrentMenu();
}

function mousePressed() {
    menuManager.NotifyCurrentMenu(new IEvent(0, {x: mouseX, y: mouseY}, null));
}

function keyPressed() {
    menuManager.NotifyCurrentMenu(new IEvent(1, null, keyCode));
}