// Budget Controller
var budgetController = (function () {
    var Expense = function(id, description,value){
        this.id=id;
        this.description=description;
        this.value=value
    };
    var Income = function(id, description,value){
        this.id=id;
        this.description=description;
        this.value=value
    };

    var data = {
        allItmes = {
            exp:[],
            inc=[]
        },
        totals = {
            exp:0,
            inc=0
        }
    }

    return{
      addItem: function(type,des,val){
        var newItem , ID;

        //make ID
        if(data.allItmes[type].lenght>0){
        ID = data.allItmes[type][data.allItmes[type].lenght - 1].id + 1;
        }else ID= 0;
        
        //make new item
        type==='inc' ? newItem=new Income(ID,des,val) : newItem = new Expense(ID,des,val);

        //push to array
        data.allItmes[type].push(newItem);
        return newItem;
        
      }

    };

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

    var newItem = budgetCtrl.addItem(input.type,input.description,input.value);

  };

  return{
      init: function(){
          setupEventListeners();
      }
  };
})(budgetController, UIController);


// init the App.
controller.init();