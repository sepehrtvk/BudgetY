// Budget Controller
var budgetController = (function () {
    
})();

// UI Controller
var UIController = (function () {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: '.add__btn'
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },
    getDOMStrings: function () {
        return DOMStrings;
    },
  };
})();

// Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function() {

        var DOMStrings = UICtrl.getDOMStrings();

        document.querySelector(DOMStrings.inputBtn).addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (e) {
          if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
          }
        });
      
    };

  var ctrlAddItem = function () {
    var input = UICtrl.getInput();
    console.log(input);
  };

  return{
      init: function(){
          setupEventListeners();
      }
  };
})(budgetController, UIController);


// init the App.
controller.init();