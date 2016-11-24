var addButton = document.getElementById("add-button");
var cpyButton = document.getElementById("cpy-button");
var logButton = document.getElementById("log-button");

addButton.addEventListener('click', function () {
    self.port.emit("add");
});

cpyButton.addEventListener('click', function () {
    self.port.emit("clip_cpy");
});

logButton.addEventListener('click', function () {
    self.port.emit("log");
});
