const { app, BrowserWindow } = require("electron");
const contextMenu = require("electron-context-menu");

let appWindow;

contextMenu({
	prepend: (defaultActions, parameters, browserWindow) => [
		{
			label: "Rainbow",
			// Only show it when right-clicking images
			visible: parameters.mediaType === "image",
		},
		{
			label: "Search Google for “{selection}”",
			// Only show it when right-clicking text
			visible: parameters.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
			},
		},
	],
});

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
