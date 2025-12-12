// ---------------- Factory Pattern ---------------- //

class Coffee {
  constructor() {
    this.description = "Unknown Coffee";
  }
  getDescription() {
    return this.description;
  }
}

class Espresso extends Coffee {
  constructor() {
    super();
    this.description = "Espresso";
  }
}

class Latte extends Coffee {
  constructor() {
    super();
    this.description = "Latte";
  }
}

class Cappuccino extends Coffee {
  constructor() {
    super();
    this.description = "Cappuccino";
  }
}

class CoffeeFactory {
  static createCoffee(type) {
    switch(type) {
      case 'espresso': return new Espresso();
      case 'latte': return new Latte();
      case 'cappuccino': return new Cappuccino();
      default: return null;
    }
  }
}

// ---------------- Decorator Pattern ---------------- //

class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this.coffee = coffee;
  }
  getDescription() {
    return this.coffee.getDescription();
  }
}

class MilkDecorator extends CoffeeDecorator {
  getDescription() {
    return this.coffee.getDescription() + ", Milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  getDescription() {
    return this.coffee.getDescription() + ", Sugar";
  }
}

class CreamDecorator extends CoffeeDecorator {
  getDescription() {
    return this.coffee.getDescription() + ", Whipped Cream";
  }
}

// ---------------- UI Functionality ---------------- //

document.getElementById("order-btn").addEventListener("click", () => {
  let selectedCoffee = document.getElementById("coffee-select").value;

  // Create base coffee using Factory Pattern
  let coffee = CoffeeFactory.createCoffee(selectedCoffee);

  // Add selected extras using Decorator Pattern
  document.querySelectorAll("input[type='checkbox']:checked").forEach(item => {
    if (item.value === "milk") coffee = new MilkDecorator(coffee);
    if (item.value === "sugar") coffee = new SugarDecorator(coffee);
    if (item.value === "cream") coffee = new CreamDecorator(coffee);
  });

  // Update UI summary
  document.getElementById("summary-text").innerText =
    "🧾 Order: " + coffee.getDescription();
});
