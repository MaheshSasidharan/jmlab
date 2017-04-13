JM.controller('mainController', ['$scope', '$timeout', '$interval', 'Factory_CommonRoutines', 'Factory_DataService', MainController]);

function MainController($scope, $timeout, $interval, CR, DS) {
    var ma = this;
    ma.oContent = null;
    ma.sThemeClass = null; //  'nightTheme' || 'dayTheme'






    var startIndex = -1;
    var arrContent = [];
    var nSwitchContentDelay = 5000;
    //var nSwitchContentDelay = 2000000;

    ma.oService = {
        GetPubs: function() {
            return DS.GetPubs().then(function(data) {
                return data;
            });
        },
        GetBarCode: function(data) {
            return DS.GetBarCode(data).then(function(data) {
                return data;
            });
        }
    }

    ma.Helper = {
        MakeTitleArray: function() {
            var arrChar = ma.oContent.title.split("");
            var arrAnimatedChar = [];
            arrChar.forEach(function(sChar) {
                var animatedChar = {
                    sClass: CR.GetRandomClass(),
                    sChar: sChar
                }
                arrAnimatedChar.push(animatedChar);
            });
            ma.oContent.arrAnimatedChar = arrAnimatedChar;
        },
        GetPubs: function() {
            ma.oService.GetPubs().then(function(data) {
                console.log(data);
                if (data.status) {
                    var arrPubs = [];
                    for (var i = 1; i < data.pubs.length; i++) {
                        if (data.pubs[i].trim() === "") {
                            continue;
                        } else {
                            arrContent.push(CR.FormatPubs(data.pubs[i]));
                        }
                    }
                    if (arrContent.length) {
                        ma.Helper.InitContent();
                    }
                } else {
                    alert("Failed to load file");
                }
            });
        },
        InitContent: function() {
            startIndex = 0;
            this.PrepareFinalContent(startIndex);
            $interval(function() {
                ma.Helper.ChangeTheme();
                ma.Helper.Next();
            }, nSwitchContentDelay);
        },
        Next: function() {
            //if(startIndex === 1) return;
            if (startIndex === arrContent.length - 1) {
                startIndex = 0;
            } else {
                startIndex++;
            }
            this.PrepareFinalContent(startIndex);
        },
        PrepareFinalContent: function(num) {
            ma.oContent = null;
            var that = this;
            $timeout(function() {
                ma.oContent = arrContent[num];
                $timeout(ma.Helper.Resize, 0);
            }, 0);
        },
        Resize: function() {
            // $('.autoResize').textfill();
            $('.autoResize').textfill({
                changeLineHeight: true
            });
        },
        ChangeTheme: function() {
            var today = new Date();
            var dStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0); // 6am
            var dEndTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0, 0); // 6pm


            // if (day) {
            //     today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0, 0); // 6am
            // } else {
            //     today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0, 0); // 6am
            // }

            if (today >= dStartTime && today <= dEndTime) {
                ma.sThemeClass = 'dayTheme';
            } else {
                ma.sThemeClass = 'nightTheme';
            }
        },
        ToggleTheme: function() {
            day = !day;
            this.ChangeTheme();
        },
        Init: function() {
            ma.Helper.ChangeTheme();
            ma.Helper.GetPubs();
        }
    }
    ma.Helper.Init();
    var day = true;
}
