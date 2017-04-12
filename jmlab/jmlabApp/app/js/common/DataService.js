JM.factory('Factory_DataService', ['$http', DataService])

function DataService($http) {
    var Helper = {
        app: "https://128.255.84.48:3000/",
        Research: {
            controller: "research/",
            GetPubs: function() {
                return $http.get(Helper.app + Helper.Research.controller + 'GetPubs')
                    .then(
                        Helper.Miscellaneous.ReturnDataDotData,
                        Helper.Miscellaneous.FailedInService)
            }
        },
        Miscellaneous: {
            GetBarCode: function(data) {
                return $http({
                    method: 'JSONP',
                    url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + data
                }).
                success(function(status) {
                    //your code when success
                }).
                error(function(status) {
                    //your code when fails
                });
            },
            ReturnDataDotData: function(data) {
                return data.data;
            },
            FailedInService: function(err) {
                console.log(err);
                CommonFactory.Notification.error(Constants.Miscellaneous.SomethingWentWrong);
                return { status: false };
            },
            bAssessmentsCompleted: false,
            isMobileDevice: false,
            oSetUpIssues: {
                bHasMicrophoneIssue: false,
                bHasSpeakerIssue: false,
                bHasSetupIssue: function() {
                    return (this.bHasMicrophoneIssue || this.bHasSpeakerIssue);
                }
            },
            oAudioContext: null
        }
    }

    var oService = {
        GetPubs: Helper.Research.GetPubs,
        GetBarCode: Helper.Miscellaneous.GetBarCode
    }
    return oService;
}
