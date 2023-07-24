(function(){
    let elements = document.querySelectorAll('[data-two-way-bind]');
    let scope = {};
    elements.forEach(function(element) {
        if(element.type === 'text' || element.type === 'textarea') {
            let propToBind = element.getAttribute('data-two-way-bind');
            addScopeProp(propToBind);
            element.addEventListener("keyup", function() {
                scope[propToBind] = element.value;
            });
        };
        // bind prop to elements
        function addScopeProp(prop) {
            // add property is needed
            if(!scope.hasOwnProperty(prop)) {
                // value to populate with newvalue
                let value;
                Object.defineProperty(scope, prop, {
                    set: function (newValue) {
                        value =newValue;
                        elements.forEach(function(element) {
                            
                            // change value to bind elements
                            if (element.getAttribute("data-two-way-bind") === prop) {
                                if (element.type && (element.type === 'text' || element.type === 'textarea')) {
                                    element.value= newValue;
                                }
                                else if (!element.type) {
                                    element.innerHTML = newValue;
                                }
                            }
                        });
                    },
                    get: function() {
                        return value;
                    },
                    enumerable: true
                });
            }
        }
    });

    
    log = function () {
        Object.keys(scope).forEach((key) => {
            console.log(`${key} : ${scope[key]}`);
        });
    }
 
    changeNameByCode = function() {
        scope.name = `Name changed by code`;
    }

    changeSurenameByCode = function () {
        scope.surname = `surname Changed by code`;
    }
})();