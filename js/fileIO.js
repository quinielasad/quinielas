var FILENAME = 'database.db',

file = {
    writer: { available: false },
    reader: { available: false }
};
        
function gotFS(fs) {
    fs.root.getFile(FILENAME, {create: true, exclusive: false},
                            gotFileEntry, null);
}

function gotFileEntry(fileEntry) {
    file.entry = fileEntry;
    fileEntry.createWriter(gotFileWriter, null);
    readText();
}

function gotFileWriter(fileWriter) {
    file.writer.available = true;
    file.writer.object = fileWriter;
}

function saveText(e) {
    var  fail;

    dbEntries.push(e);
    
    $('#login_errors').innerHTML = e;

    if (file.writer.available) {
        file.writer.available = false;
        file.writer.object.onwriteend = function (evt) {
            file.writer.available = true;
            file.writer.object.seek(0);
        }
        file.writer.object.write(e);
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
        }, null);
    }

    return false;
}