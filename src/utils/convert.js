export function covertLyrics(lyrics) {
    var newLyrics = []
    for(var i = 0; i < lyrics.length; i ++) {
        newLyrics.push({
            time: lyrics[i].time,
            text: convert(lyrics[i].text)
        })
    }
    return newLyrics;
}

function convert(row) {
    var arr = []
    for (var i = 0; i < row.length; i ++) {
        arr.push(row[i]);
    }
    var state = 0
    var iter = []
    for (i = 0; i < arr.length; i ++) {
        if (arr[i] == '｜' && state == 0) {
            iter.push(i)
            state = 1
        }
        else if (arr[i] == '《' && state == 1) {
            iter.push(i)
            state = 2
        }
        else if (arr[i] == '》' && state == 2) {
            iter.push(i)
            arr[iter[0]] = '<ruby>'
            arr[iter[1]] = '<rp>(</rp><rt>'
            arr[iter[2]] = '</rt><rp>)</rp></ruby>'
            iter = []
            state = 0
        }
    }
    var re = ''
    for (i = 0; i < arr.length; i ++) {
        re += arr[i]
    }
    return re;
}