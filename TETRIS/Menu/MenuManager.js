//menu enumerator
const Menus = {
    Main:     0,
    Settings: 1,
    Top:      2,
    Play:     3,
    Size:     4
};

class MenuManager {
    constructor(menus = [Menus.Size], currentMenu = Menus.Main) {
        this.menus = menus;
        this.currentMenu = currentMenu;
    }
    
    AddMenu(menu, menuIndex) {
        if (menuIndex >= 0 && menuIndex <= Menus.Size - 1) {
            menu.manager = this;
            this.menus[menuIndex] = menu;
        }
    }
    
    RemoveMenu(menuIndex) {
        if (menuIndex >= 0 && menuIndex <= Menus.Size - 1)
            this.menus.splice(0, menuIndex);
    }
    
    ShowCurrentMenu() {
        this.menus[this.currentMenu].Show();
    }
    
    NotifyCurrentMenu(event) {
        this.menus[this.currentMenu].Notify(event);
    }
    
    ChangeMenu(menuIndex) {
        if (menuIndex >= 0 && menuIndex <= this.menus.length - 1)
            this.currentMenu = menuIndex;
    }
}
