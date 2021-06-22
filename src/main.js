const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    darkTheme: true,
    fullscreenable: false,
    height: 630,
    maximizable: false,
    resizable: false,
    simpleFullscreen: false,
    title: 'Trade History Analysis',
    width: 800,
  });

  mainWindow.loadFile('build/index.html');
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function() {
  app.quit();
});
