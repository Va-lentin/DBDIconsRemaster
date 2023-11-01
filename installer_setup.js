const { MSICreator } = require("electron-wix-msi")
const path = require("node:path")

const APP_DIR = path.join(__dirname, "./dbdiconsremaster-win32-x64")
const OUT_DIR = path.join(__dirname, "./windows__installer")
const ICON = path.join(__dirname, "./src/client/assets/images/Icon.ico")

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    description: "Replacement tool for DBD Toolbox.",
    exe: "DBDIconsRemaster",
    name: "DBDIconsRemaster",
    manufacturer: "ImTiiTii Community",
    version: "1.0.0",
    icon: ICON,
    shortcutName: "DBDIR",
    language: 1036,
    ui: {
        chooseDirectory: true,
    }
})

msiCreator.create().then(function(binary){
    msiCreator.compile()
})