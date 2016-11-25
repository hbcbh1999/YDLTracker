var addButton = document.getElementById("add-button");
var cpyButton = document.getElementById("cpy-button");
var clearButton = document.getElementById("clear-button");

addButton.addEventListener('click', function () {
    self.port.emit("add");
});

cpyButton.addEventListener('click', function () {
    self.port.emit("clip_cpy");
});

clearButton.addEventListener('click', function () {
    self.port.emit("clear");
});
