export function covertLyrics(lyrics) {
    for(var i = 0; i < lyrics.length; i ++) {
        lyrics[i].text = convert(lyrics[i].text);
    }
    return lyrics;
}

function convert(row) {
    return row
}