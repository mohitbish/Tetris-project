class IButton {
    constructor(position = {pX: 0, pY: 0}, dimensions = {dX: 0, dY: 0}, colour = {r: 0, g: 0, b: 0}) {
        this.menu = null;
      
        this.colour     = colour;
        this.position   = position;
        this.dimensions = dimensions;
      
        this.textColour = null;
        this.textSize   = null;
        this.text       = "";
    }
    
    //pure virtual
    OnNotify() {} //button-clicked callback
    
    CheckCollision(point) {
        let {pX, pY}  = this.position;
        let {dX, dY}  = this.dimensions;

        return (
            point.x > pX &&
            point.x < pX + dX &&
            point.y > pY &&
            point.y < pY + dY
        );
    }

    //virtual
    Show() {
        let {r, g, b} = this.colour;
        let {pX, pY}  = this.position;
        let {dX, dY}  = this.dimensions;

        fill(r, g, b);
        rect(pX, pY, dX, dY);

        if (this.text != "") {
            let {tR, tG, tB} = this.textColour;
            fill(tR, tG, tB);
            textSize(this.textSize);
            text(this.text, pX, pY, dX, dY);
        }
    }
    
    AddText(colour, size, string) {
        this.textColour = colour;
        this.textSize   = size;
        this.text       = string;
    }
}

class IncrementButton extends IButton {
    constructor(position = {pX: 0, pY: 0}, dimensions = {dX: 0, dY: 0}, colour = {r: 0, g: 0, b: 0}, state = 0) {
        super(position, dimensions, colour);

        this.total = 0;
        this.currentCount = 0;
        this.currentText = [];
    }

    OnNotify() {
        this.currentCount = (this.currentCount + 1) % this.total;
        this.text = this.currentText[this.currentCount];
    }
}

class ExitButton extends IButton {
    constructor(position = {pX: 0, pY: 0}, dimensions = {dX: 0, dY: 0}, colour = {r: 0, g: 0, b: 0}) {
        super(position, dimensions, colour);
    }

    OnNotify() {
        window.close();
    }
}
  
class ChangeMenuButton extends IButton {
    constructor(position = {pX: 0, pY: 0}, dimensions = {dX: 0, dY: 0}, colour = {r: 0, g: 0, b: 0}, desiredMenu = 0) {
        super(position, dimensions, colour, desiredMenu);
        this.menuIndex = desiredMenu;
    }
    
    OnNotify() {
        if (this.menuIndex >= null && this.menuIndex < Menus.Size && this.menu != null)
            this.menu.RequestMenuChange(this.menuIndex);
    }
    
    Show() {
        let {r, g, b} = this.colour;
        let {pX, pY}  = this.position;
        let {dX, dY}  = this.dimensions;

        fill(r, g, b);
        rect(pX, pY, dX, dY);

        if (this.text != "") {
            let {tR, tG, tB} = this.textColour;
            fill(tR, tG, tB);
            textSize(this.textSize);
            text(this.text, pX, pY, dX, dY);
        }
    }
}