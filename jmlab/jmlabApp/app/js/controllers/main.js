JM.controller('mainController', ['$scope', '$timeout', '$interval', 'Factory_CommonRoutines', 'Factory_DataService', MainController]);

function MainController($scope, $timeout, $interval, CR, DS) {
    var ma = this;
    var startIndex = -1;
    ma.oContent = null;
    var nSwitchContentDelay = 5000;

    ma.oService = {
        GetBarCode: function(data) {
            return DS.GetBarCode(data).then(function(data) {
                return data;
            });
            $http('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=convertUrlToQRCodeApi')
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
        Init: function() {
            startIndex = 0;
            this.PrepareFinalContent(startIndex);
            $interval(function(){
                ma.Helper.Next();
            }, nSwitchContentDelay);
        },
        Next: function() {
            startIndex = startIndex === -1 ? startIndex++ : startIndex++;
            startIndex
            if (startIndex < arrContent.length - 1) {
                startIndex++;
            } else {
                startIndex = 0;
            }
            this.PrepareFinalContent(startIndex);
        },
        PrepareFinalContent: function(num) {
            ma.oContent = null;
            var that = this;
            $timeout(function() {
                that.ShowFinalContent(num);
            }, 0);
        },
        ShowFinalContent(num) {
            ma.oContent = arrContent[num];
            if (!ma.oContent.BarCode && false) {
                ma.oService.GetBarCode(ma.oContent.URL).then(function(data) {

                });
            }
            $timeout(this.Resize, 0);
        },
        Resize: function() {
            $('.autoResize').textfill();
        }
    }

    ma.Helper.Init();
}

var arrContent = [{
    title: "Genome-wide inference of natural selection on human transcription factor binding sites.",
    authors: ["Arbiza, Leonardo", " Gronau, Ilan", " Aksoy, Bulent A", " Hubisz, Melissa J", " Gulko, Brad", " Keinan, Alon", " Siepel, Adam"],
    journal: "Nat Genet",
    abstract: "For decades, it has been hypothesized that gene regulation has had a central role in human evolution, yet much remains unknown about the genome-wide impact of regulatory mutations. Here we use whole-genome sequences and genome-wide chromatin immunoprecipitation and sequencing data to demonstrate that natural selection has profoundly in?luenced human transcription factor binding sites since the divergence of humans from chimpanzees 4-6 million years ago. Our analysis uses a new probabilistic method, called INSIGHT, for measuring the in?luence of selection on collections of short, interspersed noncoding elements. We ?ind that, on average, transcription factor binding sites have experienced somewhat weaker selection than protein-coding genes. However, the binding sites of several transcription factors show clear evidence of adaptation. Several measures of selection are strongly correlated with predicted binding af?inity. Overall, regulatory elements seem to contribute substantially to both adaptive substitutions and deleterious polymorphisms with key implications for human evolution and disease.",
    tags: ["gene regulation", "author", "top journal"],
    URL: "https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=convert+url+to+qr+code+api"
}, {
    title: "Title 1",
    authors: ["ABC", "DEF", "GHI"],
    journal: "ABC journal",
    abstract: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tags: ["sdfg df", "dfgdfg", "dfgdfg"],
    URL: "THIS is a test message"
}, {
    title: "Some other title Some other title Some other title Some other title Some other title Some other title Some other title Some other title Some other title Some other title Some other title Some other title",
    authors: ["sdsdfABC", "DdfsEF", "GsdfsdHI"],
    journal: "journal is lkjsdf",
    abstract: "dlsihfldsf kj kJHKjhksjdf klj Ip",
    tags: ["sdDFDF", "KDHFJA", "DAFKH", "DFSKG"],
    URL: "AAAAAAAA BBBBBBBBB CCCCCCCC"
}];
