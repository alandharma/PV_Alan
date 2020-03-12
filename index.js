const electron = require("electron");

const {
    app, 
    BrowserWindow, 
    Menu,
    ipcMain
 } = electron;

let todayWindow;
let cretewindow;
let listwindow;


app.on("ready", ()=>{
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration:true
        },
        title: "Informasi Claykoi"
    });

    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", () => {

        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

}); 

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "All Appoinments"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null));
};
const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create Appoinments"
    });

    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", () => (CreateWindow = null))
};


ipcMain.on("appointment:create", (event, appointment) => {
    console.log(appointment);
});

ipcMain.on("appointment:request:list", event => {
    console.log("Here");
});




const menuTemplate = [{
    label: "File",
    submenu: [{
        label: "New Appoinment",

        click() {
            createWindowCreator();
        }
    },
    {
        label: "All Appointments",
        click() {
            listWindowCreator();
        }
    },
    {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" :
        "Ctrl + Q",
        click() {
            app.quit();
            }
            }
        ]

    },

    {
        label: "View",
        submenu: [{ 
            role: "reload" 
        }, { 
            role: "toogledevtools" 
        }]

    }

]