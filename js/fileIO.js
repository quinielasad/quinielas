 var FILENAME = 'database.db',
           
failCB = function (msg) {
    return function () {
        alert('[FAIL] ' + msg);
    }
},
file = {
    writer: { available: false },
    reader: { available: false }
},
dbEntries = [];
        
function gotFS(fs) {
    var fail = failCB('getFile');
    fs.root.getFile(FILENAME, {create: true, exclusive: false},
                            gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    var fail = failCB('createWriter');
    file.entry = fileEntry;

    fileEntry.createWriter(gotFileWriter, fail);
    readText();
}

function gotFileWriter(fileWriter) {
    file.writer.available = true;
    file.writer.object = fileWriter;
}

function saveText(e) {
    var  fail;

    dbEntries.push(e);
    
    $('#login_errors').innerHTML = dbEntries.join('');

    if (file.writer.available) {
        file.writer.available = false;
        file.writer.object.onwriteend = function (evt) {
            file.writer.available = true;
            file.writer.object.seek(0);
        }
        file.writer.object.write(dbEntries.join("\n"));
    }

    return false;
}

function readText() {
    if (file.entry) {
        file.entry.file(function (dbFile) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                var textArray = evt.target.result.split("\n");

                dbEntries = textArray.concat(dbEntries);

                $('#login_errors').innerHTML = dbEntries.join('');
            }
            reader.readAsText(dbFile);
        }, failCB("FileReader"));
    }

    return false;
}