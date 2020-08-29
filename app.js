// Budget Controller
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItmes[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItmes: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      //make ID
      if (data.allItmes[type].lenght > 0) {
        ID = data.allItmes[type][data.allItmes[type].lenght - 1].id + 1;
      } else ID = 0;

      //make new item
      type === "inc"
        ? (newItem = new Income(ID, des, val))
        : (newItem = new Expense(ID, des, val));

      //push to array
      data.allItmes[type].push(newItem);
      return newItem;
    },
    calculateBudget: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      data.budget = data.totals.inc - data.totals.exp;

      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },
  };
})();

// UI Controller
var UIController = (function () {
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: '.container'
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;

      if (type === "inc") {
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%descrption%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        element = DOMStrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%descrption%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%descrption%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function () {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMStrings.inputDescription + ", " + DOMStrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function (obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLabel).textContent =
        obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = "---";
      }
    },

    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

// Controller
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOMStrings = UICtrl.getDOMStrings();

    document
      .querySelector(DOMStrings.inputBtn)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOMStrings.container).addEventListener('click',ctrlDeleteItem);
  };
  var updateBudget = function () {
    budgetCtrl.calculateBudget();

    var budget = budgetCtrl.getBudget();

    UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = function () {
    var input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      var newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );

      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();

      updateBudget();
    }
  };
  
  var ctrlDeleteItem = function(e){
      var itemID , ID , type , splitID;

      if(itemID){
        splitID = itemID.split('-');
        type = splitID[0];
        ID = splitID[1];

        

      }
  };
  return {
    init: function () {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

// init the App.
controller.init();
