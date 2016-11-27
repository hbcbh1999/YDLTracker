var self = require("sdk/self");
var notifications = require("sdk/notifications");
var { ToggleButton } = require("sdk/ui/button/toggle");
var tabs = require("sdk/tabs");
var sdkPanels = require("sdk/panel");
var ss = require("sdk/simple-storage");
var data = require("sdk/self").data;
var clipboard = require("sdk/clipboard");


// If our persistent storage isn't initialized, create it
if (!ss.storage.tracker) {
    ss.storage.tracker = [];
}

// Create the toggle button, this will open the ui panel
var button = ToggleButton({
    id: "ydl-menu",
    label: "Open the YDLTracker menu",
    icon: {
        "24": "./icons/Inconsistency_24.png",
        "48": "./icons/Inconsistency_48.png",
        "64": "./icons/Inconsistency_64.png"
    },
    onChange: handleChange
});

// Create the panel for the ui
var YDLTrackerPanel = sdkPanels.Panel({
    contentURL: self.data.url("html/panel.html"),
    contentScriptFile: data.url("js/panel-functions.js"),
    onHide: handleHide,
    width: 240,
    height: 180,
});

// Handle show
function handleChange(state) {
    if (state.checked) {
        YDLTrackerPanel.show({
            position: button
        });
    }
}

// Handle hide 
function handleHide() {
    button.state('window', {checked: false});
}

YDLTrackerPanel.port.on("add", function() {
    ss.storage.tracker.push(tabs.activeTab.url);
    notifications.notify({
        title: "Added URL",
    });
    console.log("Added url");
});

YDLTrackerPanel.port.on("clip_cpy", function() {
    var clipString = "";
    for(i = 0; i < ss.storage.tracker.length; i++) {
        clipString += ss.storage.tracker[i];
        clipString += "\n";
    }
    clipboard.set(clipString);
    notifications.notify({
        title: "URLS Copied",
        text: ("" + ss.storage.tracker.length + " urls copied to clipboard"),
    });
    console.log("Clip cpy");
});

YDLTrackerPanel.port.on("clear", function() {
    ss.storage.tracker = [];
    notifications.notify({
        title: "URLS Cleared",
    });
});
