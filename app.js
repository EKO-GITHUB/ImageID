const { app, BrowserWindow } = require("electron");
const ElectronStore = require("electron-store");
ElectronStore.initRenderer();

let appWindow;

function createWindow() {
	appWindow = new BrowserWindow({
		show: false,
		webPreferences: {
			spellcheck: true,
			nodeIntegration: true,
			nodeIntegrationInWorker: true,
			contextIsolation: false,
		},
	});
	appWindow.maximize();
	appWindow.setMenu(null);
	appWindow.loadFile("dist/image-id/index.html");

	appWindow.on("closed", function () {
		appWindow = null;
	});

	appWindow.webContents.on("did-fail-load", () => {
		console.log("did-fail-load");
		win.loadURL(
			url.format({
				pathname: path.join(__dirname, "dist/image-id/index.html"),
				protocol: "file:",
				slashes: true,
			})
		);
	});
}

app.whenReady().then(() => {
	createWindow();
});
