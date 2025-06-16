// Menu data structure
const menuData = {
    
burger: [
        {
            id: 1,
            name: "Classic Burger",
            description: "Beef patty, lettuce, tomato, onion, pickle",
            price: 8.99,
            category: "burgers"
        },
        {
            id: 2,
            name: "Cheeseburger",
            description: "Classic burger with melted cheddar cheese",
            price: 9.99,
            category: "burgers"
        },
        {
            id: 3,
            name: "Double Bacon Burger",
            description: "Two beef patties, crispy bacon, cheese",
            price: 12.99,
            category: "burgers"
        },
        {
            id: 4,
            name: "Chicken Burger",
            description: "Grilled chicken breast, lettuce, mayo",
            price: 9.49,
            category: "burgers"
        },
        {
            id: 5,
            name: "Fish Burger",
            description: "Crispy fish fillet, tartar sauce, lettuce",
            price: 8.49,
            category: "burgers"
        },
        {
            id: 6,
            name: "Veggie Burger",
            description: "Plant-based patty, avocado, sprouts",
            price: 9.99,
            category: "burgers"
        }
    ],
   
pizza: [
        {
            id: 11,
            name: "French Fries",
            description: "Crispy golden fries",
            price: 3.99,
            category: "sides"
        },
        {
            id: 12,
            name: "Sweet Potato Fries",
            description: "Sweet and crispy fries",
            price: 4.49,
            category: "sides"
        },
        {
            id: 13,
            name: "Onion Rings",
            description: "Beer-battered onion rings",
            price: 4.99,
            category: "sides"
        },
        {
            id: 14,
            name: "Chicken Wings",
            description: "6 piece buffalo wings",
            price: 7.99,
            category: "sides"
        },
        {
            id: 15,
            name: "Mozzarella Sticks",
            description: "6 breaded mozzarella sticks",
            price: 5.99,
            category: "sides"
        },
        {
            id: 16,
            name: "Nachos",
            description: "Tortilla chips with cheese and jalapeños",
            price: 6.99,
            category: "sides"
        }
    ],
   
drink: [
        {
            id: 21,
            name: "Coca-Cola",
            description: "Classic Coke - Small/Medium/Large",
            price: 2.49,
            category: "drinks"
        },
        {
            id: 22,
            name: "Pepsi",
            description: "Pepsi Cola - Small/Medium/Large",
            price: 2.49,
            category: "drinks"
        },
        {
            id: 23,
            name: "Orange Juice",
            description: "Fresh squeezed orange juice",
            price: 3.49,
            category: "drinks"
        },
        {
            id: 24,
            name: "Coffee",
            description: "Freshly brewed coffee",
            price: 2.99,
            category: "drinks"
        },
        {
            id: 25,
            name: "Milkshake",
            description: "Vanilla, chocolate, or strawberry",
            price: 4.99,
            category: "drinks"
        },
        {
            id: 26,
            name: "Water",
            description: "Bottled spring water",
            price: 1.99,
            category: "drinks"
        }
    ],
  dessert: [
        {
            id: 31,
            name: "Apple Pie",
            description: "Warm apple pie with ice cream",
            price: 4.99,
            category: "desserts"
        },
        {
            id: 32,
            name: "Chocolate Cake",
            description: "Rich chocolate layer cake",
            price: 5.99,
            category: "desserts"
        },
        {
            id: 33,
            name: "Ice Cream Sundae",
            description: "Vanilla ice cream with hot fudge",
            price: 3.99,
            category: "desserts"
        },
        {
            id: 34,
            name: "Cookies",
            description: "Fresh baked chocolate chip cookies (3)",
            price: 2.99,
            category: "desserts"
        },
        {
            id: 35,
            name: "Cheesecake",
            description: "New York style cheesecake",
            price: 5.49,
            category: "desserts"
        },
        {
            id: 36,
            name: "Brownie",
            description: "Fudgy chocolate brownie",
            price: 3.49,
            category: "desserts"
        }
    ],
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = menuData;
}