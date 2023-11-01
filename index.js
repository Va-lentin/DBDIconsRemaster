/*
 ______   ______   ______   _____                                 _______                                      _                  
|_   _ `.|_   _ \ |_   _ `.|_   _|                               |_   __ \                                    / |_                
  | | `. \ | |_) |  | | `. \ | |   .---.   .--.   _ .--.   .--.    | |__) |  .---.  _ .--..--.   ,--.   .--. `| |-'.---.  _ .--.  
  | |  | | |  __'.  | |  | | | |  / /'`\]/ .'`\ \[ `.-. | ( (`\]   |  __ /  / /__\\[ `.-. .-. | `'_\ : ( (`\] | | / /__\\[ `/'`\] 
 _| |_.' /_| |__) |_| |_.' /_| |_ | \__. | \__. | | | | |  `'.'.  _| |  \ \_| \__., | | | | | | // | |, `'.'. | |,| \__., | |     
|______.'|_______/|______.'|_____|'.___.' '.__.' [___||__][\__) )|____| |___|'.__.'[___||__||__]\'-;__/[\__) )\__/ '.__.'[___] 

@Author: R. Valentin
@Description: Main file for the application. Handles the creation of the main window and the loading screen.
*/

////------------------ DEPENDENCIES ------------------\\\
const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const path = require('node:path')
const ElectronEJS = require('ejs-electron')
const { autoUpdater } = require("electron-updater")

ElectronEJS.data("PACKS", require(path.join(__dirname, "/src/server/appdata/packs/packs.json")))

///------------------ FUNCTIONS ------------------\\\

///------------------ APPLICATION PROCESS ------------------\\\
app.whenReady().then(async () => {
    const { screen } = require("electron")
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    app.setAppUserModelId("DBD Icons Remaster")

    var Window = new BrowserWindow({
        width: width,
        height: height,
        resizable: false,
        icon: path.join(__dirname, "/src/client/assets/images/Icon.ico"),
        webPreferences: {
            preload: path.join(__dirname, "/src/client/js/loader.js")
        }
    })
    Window.loadFile("src/client/html/packs.ejs")
    Window.setMenu(null)
    Window.maximize()

    Window.on("ready-to-show", () =>{
        autoUpdater.checkForUpdatesAndNotify()
    })

    autoUpdater.on("update-available", () =>{
        Window.webContents.send("update_available")
    })

    autoUpdater.on("update-downloaded", () => {
        mainWindow.webContents.send("update_downloaded")
    })

    ipcMain.on("restart_process", () =>{
        autoUpdater.quitAndInstall()
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})