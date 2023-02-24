var app = angular.module("myApp", []);
app.directive('validateEmail', function () {
    var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return {
        link: function (scope, elm) {
            elm.on("keyup", function () {
                var isMatchRegex = EMAIL_REGEXP.test(elm.val());
                if (isMatchRegex && elm.hasClass('warning') || elm.val() === '') {
                    elm.removeClass('warning');
                } else if (isMatchRegex === false && !elm.hasClass('warning')) {
                    elm.addClass('warning');
                }
            });
        }
    }
});

app.directive('validatePassword', function () {
    var PASS_REGEXP = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    return {
        link: function (scope, elm) {
            elm.on("keyup", function () {
                var isMatchRegex = PASS_REGEXP.test(elm.val());
                if (isMatchRegex && elm.hasClass('warning') || elm.val() === '') {
                    elm.removeClass('warning');
                } else if (isMatchRegex === false && !elm.hasClass('warning')) {
                    elm.addClass('warning');
                }
            });
        }
    }
});


app.service('register', function () {
    this.inregistreaza = function (lista, emaill, passwordd) {
        var newUser = {email: emaill, pass: passwordd}
        var gasit = false
        if (!lista) {
            return newUser
        }
        lista.forEach((item, index) => {
            if (item.email === newUser.email) {
                gasit = true
            }
        });
        if (!gasit) {
            return newUser
        } else {
            return null
        }
    }

});

app.service('login', function () {
    this.logare = function (lista, email, pass) {
        return "";
    }
});

app.service('localData', function () {
    this.getEsteLogat = function () {
        return window.localStorage.getItem('esteLogat');
    }
    this.getUtilizatorCurrent = function () {
        return window.localStorage.getItem('utilizatorulCurrent');
    }
    this.getRegistered = function () {
        var reg = localStorage.getItem("getRegistered");
        if (!reg) {
            return null
        } else {
            return JSON.parse(reg);
        }
    }

    this.setEsteLogat = function (x) {
        window.localStorage.setItem('esteLogat', x);
    }

    this.setUtilizatorCurrent = function (x) {
        if (!x) {
            window.localStorage.removeItem('utilizatorulCurrent');
        } else {
            window.localStorage.setItem('utilizatorulCurrent', x);
        }
    }

    this.addNewRegisteredUser = function (x) {
        var currentUsers = this.getRegistered();
        if (!currentUsers) {
            currentUsers = new Array()
        }
        currentUsers.push(x);
        window.localStorage.setItem('getRegistered', JSON.stringify(currentUsers));

    }
});

app.service('rutare', function () {
    this.goToPage = function (x) {
        window.location.href = x;
   
    }
});


app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});


app.service('cart', function () {
    this.myitems = [];
    this.getValue = function () {
        return this.myitems
    }; 

    this.addToCart = function (x) {
        this.myitems.push(x);
        var suma = 0
        this.myitems.forEach((item, index) => {
            suma += item.pret
        });
        console.log(this.myitems)
        console.log(suma)
        return suma;
    
    }

    this.removeFromCart = function (x) {
        this.myitems.splice(x, 1);
        var suma = 0
        this.myitems.forEach((item, index) => {
            suma += item.pret
        });
        return suma
    }
});

app.controller("headerCtrl", function ($scope, register, login, localData, rutare, cart) {
    $scope.updateData = function () {
        $scope.esteLogat = localData.getEsteLogat();
        $scope.utilizatorulCurrent = localData.getUtilizatorCurrent();
        $scope.registered = localData.getRegistered()
    }
    $scope.updateData();
    console.log($scope);
    $scope.go = function (page) {
        rutare.goToPage(page);
    }

    $scope.logout = function () {
        localData.setUtilizatorCurrent(null);
        $scope.go('index.html')
    }

    $scope.showModal = false;
    $scope.toggleModal = function () {
        $scope.showModal = !$scope.showModal;
    };

    $scope.submitLogout = function () {
        console.log("submitLogout")
    }

});

app.controller("homeCtrl", function ($scope, register, login, localData, cart) {
    $scope.items = [
        {
            idprodus:"18765",
            nume: "Lenjerie de pat",
            imagineURL: "http://angro.md/image/cache/catalog/products/api/X16JoxMAACMAwzHP/5a1b9395-e25b-4db6-b7d6-2029fc263570_gobilenN404-600x6003-640x640.jpg",
            pret: 780 ,
            enpret:520,
            descriere: "Acest set de lenjerie de pat o să vă ofere un somn liniștit.  "
        },
        {
            idprodus:"18765",
            nume: "Puzzle Copii",
            imagineURL: "http://angro.md/image/cache/catalog/products/api/X4PxyRAAACMAaRTS/0c215e69-b9c1-4c12-8ee5-31bed20a90b0_Dv-101-640x640.jpg",
            pret: 72 ,
            enpret:33,
            descriere: "Puzzle-ul educațional pentru fetițe cu Alba ca Zăpada!  "
        },
        
        {
            idprodus:"18767",
            nume: "Lenjerie de pat",
            imagineURL: "http://angro.md/image/cache/catalog/products/api/YHVowhMAAKHnGY7t/ee7a0ddf-4649-4759-95e8-ca47a2fbd034_vishivkaN25-11-640x640.JPG",
            pret: 332,
            enpret:132,
            descriere: " "
        },
        {
            idprodus:"16354",
            nume: "Vaza pentru fructe",
            imagineURL: "http://angro.md/image/cache/catalog/products/api/X3dt-RAAACMAMmNE/1bb14a70-b3ec-4db8-8597-e4bedfbe7a46_D721N28-600x600-640x640.jpg",
            pret: 756 ,
            enpret:418,
            descriere: "Vază tip bol  pentru fructe este realizată din sticlă. "
        },
        {
            idprodus:"206786",
            nume: "Conteiner pentru congelare 0.65 l",
            imagineURL: " http://angro.md/image/cache/catalog/products/Depozitare%20%C8%99i%20organizare%20%C3%AEn%20cas%C4%83/SA-970_03-640x640.jpg",
            pret: 20,
            enpret:8,
            descriere: "DIMENSIUNI 13 x 14 x 5,5 cm "
        },
        {
            idprodus:"197775",
            nume: "Cană",
            imagineURL: "http://angro.md/image/cache/catalog/products/C%C4%83ni%20/IMG_20220722_095334-640x640.jpg",
            pret: 50,
            enpret:27,
            descriere: " "
        },
     
      
    ]
    
    $scope.elementeCos = 0
    $scope.suma = 0

    $scope.updateData = function () {
        $scope.esteLogat = localData.getEsteLogat();
        $scope.utilizatorulCurrent = localData.getUtilizatorCurrent();
        $scope.registered = localData.getRegistered()
    }
    $scope.updateData();

    $scope.cardItems = cart.getValue();

    $scope.addToCard = function (x) {
        $scope.elementeCos++;
        $scope.suma = cart.addToCart(x);
        $scope.cardItems = cart.getValue();
    }

    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.elementeCos--;
        $scope.suma = cart.removeFromCart(x);
        $scope.cardItems = cart.getValue();
    }
   

    $scope.executeCopy = function () {
        alert("Numele a fost copiat cu success!")
    }

    $scope.executeOnCut = function () {
        alert("Ați făcut 'cut' la textul din input")
    }

    $scope.executeOnPaste = function () {
        alert("Textul a fost introdus cu success")
    }

    $scope.count = 0;

    $scope.getdetails = function () {

        $scope.count = $scope.count + 1;

    }

});


app.controller("myCtrl", function ($scope, register, login, localData, rutare) {
    $scope.emailError = "";

    $scope.go = function (page) {
        rutare.goToPage(page);
    }

    $scope.updateData = function () {
        $scope.esteLogat = localData.getEsteLogat();
        $scope.utilizatorulCurrent = localData.getUtilizatorCurrent();
        $scope.registered = localData.getRegistered()
    }
    $scope.updateData();
    console.log($scope.registered);
    $scope.verificaDate = function () {
        $scope.loginDezactivat = !$scope.email || !$scope.password
    }

    $scope.verificateDateRegister = function () {
        var tempV = !$scope.email || !$scope.password || !$scope.passwordRepeat
        if (!tempV && $scope.passwordRepeat != $scope.password) {
            tempV = true;
        }
        $scope.registerDezactivat = tempV
    }

    $scope.submitLogin = function () {

        var em = document.getElementById('email')
        var pass = document.getElementById('pwd')
        $scope.showPasswordSecret = true;
        $scope.mesajError = ""
        $scope.mesajSuccess = ""
        if (em.classList.contains('warning')) {
            $scope.mesajError = "Introduce un email valid"

        } else if (pass.classList.contains('warning')) {
            $scope.mesajError = "Introduce o parola ce va conține cel puțin 5 caractere și obligatoriu să includă 1 majusculă, 1 minusculă și 1 cifră"

        } else {
            var gasit = false
            $scope.registered.forEach((item, index) => {
                if (item.email === $scope.email && item.pass === $scope.password) {
                    //schimba in serviciu
                    gasit = true;
                    $scope.mesajSuccess = "Autentificarea a fost efectuată cu success!!";
                    localData.setUtilizatorCurrent(item.email)
                    // Simulate an HTTP redirect:
                    $scope.go('index.html')
                }

                console.log(item)
                //Some code...
            });
            if (!gasit) {
                $scope.mesajError = "Nu a fost găsit acest utilizator!!!"
            }
        }
    }

    $scope.submitRegister = function () {
        var em = document.getElementById('email')
        var pass = document.getElementById('psw')
        var pass = document.getElementById('psw2')

        $scope.mesajError = ""
        $scope.mesajSuccess = ""
        if (em.classList.contains('warning')) {
            $scope.mesajError = "Introduce un email valid"
        } else if (pass.classList.contains('warning')) {
            $scope.mesajError = "Introduce o parola ce va conține cel puțin 5 caractere și obligatoriu să includă  1 cifra"
        } else if (pass.classList.contains('warning')) {
            $scope.mesajError = "Introduce o parola ce va conține cel puțin 5 caractere și obligatoriu să includă 1 cifră"
        } else {
            var newUser = register.inregistreaza($scope.registered, $scope.email, $scope.password)
            if (!newUser) {
                $scope.mesajError = "Acest utilizator este deja înregistrat!!!"
            } else {
                localData.addNewRegisteredUser(newUser)
                $scope.updateData();
                console.log($scope.registered);
                $scope.email = "";
                $scope.password = "";
                $scope.passwordRepeat = "";
                $scope.mesajSuccess = "Ați fost înregistrat cu success"
                $scope.go("login.html");
            }
        }
    }

});



