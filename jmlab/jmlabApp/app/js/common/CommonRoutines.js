JM.factory('Factory_CommonRoutines', [CommonRoutines])

function CommonRoutines() {
    var oCommonRoutine = {
        GetRandomClass: function() {
            var possible = ["dP2", "dP8", "dP6", "d1", "dP4", "d12", "d14", "dP7", "dP1", "dP5"];
            return possible[(Math.floor(Math.random() * possible.length))];
        },
        FormatPubs: function(oItem) {
            var arrItem = oItem.split("\t");
            if (arrItem) {
                var oReturnItem = {
                    title: arrItem[0],
                    abstract: arrItem[1],
                    URL: arrItem[2],
                    authors: oCommonRoutine.TrimText(arrItem[3].split(";")),
                    journal: arrItem[4],
                    tags: oCommonRoutine.TrimText(arrItem[8].split(";")),
                }
                return oReturnItem;
            } else {
                return null;
            }
        },
        TrimText: function(arrItem) {
            // return arrItem.forEach(function(sItem) {
            //     sItem = sItem.trim();
            // });
            for (var i = 0; i < arrItem.length; i++) {
                arrItem[i] = arrItem[i].trim();
            }
            return arrItem;
        }
    }
    return oCommonRoutine;
}
