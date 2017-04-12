JM.factory('Factory_CommonRoutines', [CommonRoutines])

function CommonRoutines() {
    var oCommonRoutine = {
        GetRandomClass: function() {
            var possible = ["dP2","dP8","dP6","d1","dP4","d12","d14","dP7","dP1","dP5"];
            return possible[(Math.floor(Math.random() * possible.length))];
        }
    }
    return oCommonRoutine;
}
