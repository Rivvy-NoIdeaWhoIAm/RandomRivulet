/*var upage = 0;
var ppage = 0;

var mp = 1;

var nextButton = document.getElementById("nextButton");
var prevButton = document.getElementById("prevButton");

nextButton.addEventListener("click", () => {
    if (upage < mp - 1){
        upage += 1
    }
    nextButton.style.visibility = upage == mp - 1 ? "hidden" : "visible";
    prevButton.style.visibility = upage == 0 ? "hidden" : "visible";
    readTextFile("./stuffforsite/info.json", update_uses);
});

prevButton.addEventListener("click", () => {
    if (upage > 0) {
        upage -= 1
    };
    prevButton.style.visibility = upage == 0 ? "hidden" : "visible";
    nextButton.style.visibility = upage == mp - 1 ? "hidden" : "visible";
    readTextFile("./stuffforsite/info.json", update_uses);
});

var nextButtonP = document.getElementById("nextButtonP");
var prevButtonP = document.getElementById("prevButtonP");

nextButtonP.addEventListener("click", () => {
    if (ppage < mp - 1) {
        ppage += 1
    }
    nextButtonP.style.visibility = ppage == mp - 1 ? "hidden" : "visible";
    prevButtonP.style.visibility = ppage == 0 ? "hidden" : "visible";
    readTextFile("/stuffforsite/info.json", update_uses);
});

prevButtonP.addEventListener("click", () => {
    if (ppage > 0) {
        ppage -= 1
    };
    prevButtonP.style.visibility = ppage == 0 ? "hidden" : "visible";
    nextButtonP.style.visibility = ppage == mp - 1 ? "hidden" : "visible";
    readTextFile("./stuffforsite/info.json", update_uses);
});

var icons = {}
var elements_ = {
    "usel": {
        "name": [],
        "useplace": [],
        "uses": [],
        "icon": [],
        "nameholder": []
    },
    "progl": {
        "name": [],
        "progplace": [],
        "total": [],
        "percentparent": [],
        "percent1": [],
        "percent2": [],
        "icon": [],
        "nameholder": []
    }
}

for (var y = 0; y < 8; y++) {
    elements_["usel"]["name"].push(document.getElementById((y + 1).toString() + "n"));
    elements_["usel"]["useplace"].push(document.getElementById((y + 1).toString()));
    elements_["usel"]["uses"].push(document.getElementById((y + 1).toString() + "u"));
    elements_["usel"]["icon"].push(document.getElementById((y + 1).toString() + "i"));
    elements_["usel"]["nameholder"].push(document.getElementById((y + 1).toString() + "h"));

    elements_["progl"]["name"].push(document.getElementById((y + 1).toString() + "np"));
    elements_["progl"]["progplace"].push(document.getElementById((y + 1).toString() + "p"));
    elements_["progl"]["total"].push(document.getElementById((y + 1).toString() + "up"));
    elements_["progl"]["percentparent"].push(document.getElementById((y + 1).toString() + "pp"));
    elements_["progl"]["percent1"].push(document.getElementById((y + 1).toString() + "pp1"));
    elements_["progl"]["percent2"].push(document.getElementById((y + 1).toString() + "pp2"));
    elements_["progl"]["icon"].push(document.getElementById((y + 1).toString() + "ip"));
    elements_["progl"]["nameholder"].push(document.getElementById((y + 1).toString() + "hp"));
}

function set_visibility(element, visible){
    element.style.visibility = visible ? "visible" : "hidden";
}

function update_uses(dict) {
    var jsn = JSON.parse(dict);
    var t = [[], [], []];
    for (var key in jsn) {
        t[0].push(jsn[key]);
        t[0][t[0].length - 1]['id'] = key;
        t[1].push(jsn[key]["uorder"]);
        t[2].push(jsn[key]["porder"]);
        if (key in icons){
            if (icons[key] !== jsn[key]['icon']){
                icons[key] = [jsn[key]['icon'], true];
            }
            else{
                icons[key] = [jsn[key]['icon'], false];
            }
        }
        else{
            icons[key] = [jsn[key]['icon'], false];
        }
    };
    mp = Math.ceil(Object.keys(jsn).length / 8);
    sortWithIndices_(t[1]);
    sortWithIndices_(t[2]);
    for (var y = 0; y < 8; y++){
        var n = y + 1 + upage * 8
        var p = y + 1 + ppage * 8
        try{
            var d = t[0][t[1].sortIndices[n - 1]]
            elements_["usel"]["name"][y].textContent = d["name"];
            elements_["usel"]["useplace"][y].textContent = d["useplace"];
            elements_["usel"]["uses"][y].textContent = d["uses"].toString();

            for (var key in elements_["usel"]) {
                elements_["usel"][key][y].style.visibility = "visible";
            }
            if (icons[d['id']][1]) {
                elements_["usel"]["icon"][y].src = '/icons/' + d['icon'];
                elements_["usel"]["icon"][y].alt = d['name'];
            }
        }
        catch {
            for (var key in elements_["usel"]) {
                elements_["usel"][key][y].style.visibility = "hidden";
            }
        }
        try{
            var dp = t[0][t[2].sortIndices[p - 1]]
            elements_["progl"]["name"][y].textContent = dp["name"];
            elements_["progl"]["progplace"][y].textContent = dp["progplace"];
            elements_["progl"]["total"][y].textContent = dp["fishtotal"].toString();

            var usertotalfish = dp["fishtotal"];
            elements_["progl"]["percent1"][y].textContent = `${usertotalfish}/${totalfish__}`;
            elements_["progl"]["percent2"][y].textContent = `${(usertotalfish / totalfish__ * 100).toFixed(2)}%`;
            for (var key in elements_["progl"]) {
                elements_["progl"][key][y].style.visibility = "visible";
            }
            if (icons[dp['id']][1]) {
                elements_["progl"]["icon"][y].src = '/icons/' + dp['icon'];
                elements_["progl"]["icon"][y].alt = dp['name'];
            }
        }
        catch {
            for (var key in elements_["progl"]) {
                elements_["progl"][key][y].style.visibility = "hidden";
            }
        }
    }
    prevButton.style.visibility = upage == 0 ? "hidden" : "visible";
    nextButton.style.visibility = upage == mp - 1 ? "hidden" : "visible";
    prevButtonP.style.visibility = ppage == 0 ? "hidden" : "visible";
    nextButtonP.style.visibility = ppage == mp - 1 ? "hidden" : "visible";
}

function sortWithIndices_(toSort) {
    for (var i = 0; i < toSort.length; i++) {
        toSort[i] = [toSort[i], i];
    }
    toSort.sort(function (left, right) {
        return left[0] < right[0] ? -1 : (left[0] > left[1] ? 1 : 0);
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
        toSort.sortIndices.push(toSort[j][1]);
        toSort[j] = toSort[j][0];
    }
    return toSort;
} // https://stackoverflow.com/a/3730579/27512145 tysm ^^

function compareFn(a, b) {
    //a = parseInt(a.toString().substring(0, a.toString().length - 2));
    //b = parseInt(b.toString().substring(0, b.toString().length - 2));
    if (a < b){
        return -1;
    }
    if (a > b){
        return 1;
    }
    return 0;
}

readTextFile("./stuffforsite/info.json", update_uses); // call it immediately upon site load

setInterval(readTextFile, 1000, "./stuffforsite/info.json", update_uses); // somehow figured out how to do the argument part on my own?? yippie

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var last = "0";
var td = 0;
var online = true;
var statusinfo = document.getElementById("onlinestatusinfo")
var statusimg = document.getElementById("onlinestatusimg")

function update_status(info){
    if (last.toString() !== info) {
        td = 0;
    }
    else {
        td += 1;
    }
    last = info;
    online = td < 4 || last.toString() !== info // should take ~2 seconds to update when going offline

    statusimg.src = online ? "/siteicons/online.png" : "/siteicons/offline.png";
    statusimg.alt = online ? "Online." : "Offline.";
    statusinfo.textContent = online ? "RandomRivulet is currently online." : "RandomRivulet is currently offline.";
}

readTextFile("./stuffforsite/updater.txt", update_status);

setInterval(readTextFile, 495, "./stuffforsite/updater.txt", update_status); // i know i know but still don't do exactly 500ms since idk might cause things

var usetext = document.getElementById("uses");

function update_tuses(info){
    usetext.textContent = info + " fish reeled in";
}

readTextFile("./stuffforsite/uses.txt", update_tuses);

setInterval(readTextFile, 200, "./stuffforsite/uses.txt", update_tuses);

var totaltext = document.getElementById("collected");
var totalfish__ = 1;

function update_tot(info) {
    totalfish__ = parseInt(info);
    totaltext.textContent = info + " fish discovered";
}

readTextFile("/stuffforsite/found.txt", update_tot);

setInterval(readTextFile, 2000, "./stuffforsite/found.txt", update_tot);*/

async function test(){
    document.writeln((await fetch("https://www.wikipedia.org/")).json());
}

await test();
