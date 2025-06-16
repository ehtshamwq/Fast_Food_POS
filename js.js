document.addEventListener("DOMContentLoaded", function () {
  // Show today's date
  const date = document.getElementById("date");
  function showDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    date.innerHTML = `${day}/${month}/${year}`;
  }
  showDate();

  const menuDiv = document.getElementById("menu-item");
  const items = document.querySelectorAll(".category div");
  const cart = [];
  let appliedDiscount = 0;
  let totalWithTax = 0;

  items.forEach(button => {
    button.addEventListener("click", () => {
      items.forEach(el => el.classList.remove("selected"));
      button.classList.add("selected");

      const category = button.getAttribute("data-category");
      const menuItems = menuData[category];
      menuDiv.innerHTML = "";

      if (menuItems && menuItems.length > 0) {
        menuItems.forEach(item => {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("menu-item_a");
          itemDiv.innerHTML = `
            <div class="menu-item">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <span>$${item.price.toFixed(2)}</span>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          `;
          itemDiv.querySelector(".add-to-cart").addEventListener("click", () => {
            cart.push(item);
            updateCartDisplay();
          });
          menuDiv.appendChild(itemDiv);
        });
      } else {
        menuDiv.innerHTML = "<p>No items available in this category.</p>";
      }
    });
  });

  function updateCartDisplay() {
    const cartDiv = document.querySelector(".show_itmes");
    if (!cartDiv) return;

    const itemCounts = {};
    cart.forEach(item => {
      itemCounts[item.name] = itemCounts[item.name] || { ...item, count: 0 };
      itemCounts[item.name].count += 1;
    });

    cartDiv.innerHTML = Object.values(itemCounts).map(i => `
      <div class="cart-item">
        <span>${i.name} <button class="cart-plus" data-name="${i.name}">+</button> 
        $${i.price.toFixed(2)} x ${i.count}</span>
        <button class="cart-minus" data-name="${i.name}">-</button>
      </div>
    `).join("");

    // Plus button
    cartDiv.querySelectorAll(".cart-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = cart.find(it => it.name === btn.dataset.name);
        if (item) {
          cart.push(item);
          updateCartDisplay();
        }
      });
    });

    // Minus button
    cartDiv.querySelectorAll(".cart-minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = cart.findIndex(it => it.name === btn.dataset.name);
        if (idx !== -1) {
          cart.splice(idx, 1);
          updateCartDisplay();
        }
      });
    });

    // Subtotal and discount
    const subtotalEl = document.querySelector(".sub_total");
    let total = cart.reduce((acc, item) => acc + item.price, 0);
    let discountAmount = 0;
    if (appliedDiscount > 0) {
      discountAmount = total * (appliedDiscount / 100);
      total -= discountAmount;
    }

    if (subtotalEl) {
      subtotalEl.innerHTML = `Sub Total: $${total.toFixed(2)}` +
        (appliedDiscount > 0 ? ` <span style="color:green;">(Discount: ${appliedDiscount}% -$${discountAmount.toFixed(2)})</span>` : "");
    }

    addTax(total);
  }

  function addTax(subtotalValue) {
    const taxRate = 0.085;
    const taxAmount = subtotalValue * taxRate;
    totalWithTax = subtotalValue + taxAmount;

    const taxEl = document.querySelector(".tax");
    if (taxEl) {
      taxEl.innerHTML = `Total (with tax): $${totalWithTax.toFixed(2)}`;
    } else {
      const newTax = document.createElement("div");
      newTax.className = "tax";
      newTax.innerHTML = `Total (with tax): $${totalWithTax.toFixed(2)}`;
      document.body.appendChild(newTax);
    }

    const allTotal = document.querySelector(".All_total");
    if (allTotal) {
      allTotal.innerHTML = `Total: $${totalWithTax.toFixed(2)}`;
    } else {
      const newTotal = document.createElement("div");
      newTotal.className = "All_total";
      newTotal.innerHTML = `Total: $${totalWithTax.toFixed(2)}`;
      document.body.appendChild(newTotal);
    }
  }

  // Discount
  const discountBtn = document.getElementById("discount");
  if (discountBtn) {
    discountBtn.addEventListener("click", () => {
      let discountInput = prompt("Enter discount (%):");
      let discountValue = parseFloat(discountInput);
      if (!isNaN(discountValue) && discountValue > 0 && discountValue < 100) {
        appliedDiscount = discountValue;
        updateCartDisplay();
      } else {
        alert("Invalid discount value.");
      }
    });
  }

  // Custom Item
  const customitem = document.getElementsByClassName("cu_item")[0];
  if (customitem) {
    customitem.addEventListener("click", () => {
      let customitemname = prompt("Enter custom item name:");
      let customitemprice = prompt("Enter custom item price:");
      if (customitemname && !isNaN(parseFloat(customitemprice))) {
        const customItem = {
          name: customitemname,
          price: parseFloat(customitemprice),
          description: "Custom item added by user"
        };
        cart.push(customItem);
        updateCartDisplay();
      } else {
        alert("Invalid custom item details.");
      }
    });
  }

  // Clear Cart
  const cleanBtn = document.querySelector(".order");
  if (cleanBtn) {
    cleanBtn.addEventListener("click", () => {
      cart.length = 0;
      updateCartDisplay();

      const showc = document.querySelector(".show_itmes");
      if (showc) {
        showc.innerHTML = `
          <div class="show_itmes">
            <i class="fa-solid fa-credit-card"></i>
            <div><h5>No items in order</h5></div>
          </div>
        `;
      }

      const subtotal = document.querySelector(".sub_total");
      if (subtotal) subtotal.innerHTML = `Sub Total: $0.00`;

      const tax = document.querySelector(".tax");
      if (tax) tax.innerHTML = `Total (with tax): $0.00`;

      const allTotal = document.querySelector(".All_total");
      if (allTotal) allTotal.innerHTML = `Total: $0.00`;
    });
  }

  // Payment popup logic
  const pay_btn = document.getElementsByClassName("pay")[0];
  const pay_box = document.getElementsByClassName("pay_box")[0];
  const close_btn = document.getElementsByClassName("close")[0];
  const span_pay = document.getElementsByClassName("span_pay")[0];

  if (pay_btn) {
    pay_btn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Please select items before paying.");
        return;
      }
      if (pay_box) {
        pay_box.style.display = "flex";
      }
      if (span_pay) {
        span_pay.innerHTML = totalWithTax.toFixed(2);
      }
    });
  }

  if (close_btn) {
    close_btn.addEventListener("click", () => {
      if (pay_box) {
        pay_box.style.display = "none";
      }
    });
  }

  // Close pay box on outside click
  document.addEventListener("click", function (event) {
    if (pay_box && pay_btn) {
      const isInside = pay_box.contains(event.target);
      const isPayButton = pay_btn.contains(event.target);
      if (pay_box.style.display === "flex" && !isInside && !isPayButton) {
        pay_box.style.display = "none";
      }
    }
  });
  // Close pay box on escape key
  let payoption = document.getElementsByClassName("pay_method");
  let shopay = document.getElementById("show_method");
  var show_pay='';
  var change='';
  var cashReceived='';

  
  Array.from(payoption).forEach((option, idx) => {
    option.addEventListener("click", () => {
      if(idx==0){
        show_pay="this is card pay method"
        alert(show_pay)
       
        shopay.innerHTML = `<i class="fa-solid fa-credit-card"></i><h3>  Insert or swipe card when ready</h3>
        <p>Accepted: Visa, MasterCard, American Express</p>`;
      }
      if (idx === 1) {
         show_pay="this is mobile pay method"
        shopay.innerHTML = `<i class="fa-solid fa-mobile-screen-button"></i> <h3>  Customer will tap their phone when ready</h3>
        <p>Accepted: Apple Pay, Google Pay, Samsung Pay</p>`;
      } if(idx==2 ){
         show_pay="this is cash pay method"
       shopay.innerHTML = `<i class="fa-solid fa-money-bill-wave"></i><h3>  Cash Received:</h3>
       <input type="number" id="cash_received" placeholder="Enter cash received amount">`;
       let cashInput = document.getElementById("cash_received");
       
       cashInput.addEventListener("change",()=>{
          // Remove previous messages

          const prevMsgs = shopay.querySelectorAll('.cash-msg');
          prevMsgs.forEach(msg => msg.remove());
           

           cashReceived = parseFloat(cashInput.value);
           
          if (!isNaN(cashReceived) && cashReceived >= totalWithTax) {
             
             change = cashReceived - totalWithTax;
                      shopay.innerHTML += `<p class="cash-msg">Change to return: $${change.toFixed(2)}</p>`;
          } 
          else if (!isNaN(cashReceived)) {
             change = cashReceived - totalWithTax;
            
            shopay.innerHTML += `<p class="cash-msg">Please enter an amount greater than or equal to total.</p>`;
          }
       });
      }
    });
  });
  // pay done done
let printBtn = document.getElementById("print_order");

if (printBtn) {
  printBtn.addEventListener("click", () => {
    const taxAmount = totalWithTax * 0.085;
    const discountAmount = appliedDiscount > 0 ? totalWithTax * (appliedDiscount / 100) : 0
    let itemsHtml = cart.map(item => `<p>${item.name} - $${item.price.toFixed(2)}</p>`).join("");
    let discountHtml = appliedDiscount > 0 ? `<h2>Discount Amount: $${discountAmount.toFixed(2)}</h2>` : "";

    let receiptHtml = `
      <html>
      <head>
      <title>Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
        h1, h2, h3, p { margin: 5px 0; }
        .btn-group { margin-top: 20px; }
        button { margin: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer; }
        @media print { .btn-group { display: none; } }
      </style>
      </head>
      <body>
      <h1>Order Receipt</h1>
      <h1>FastBite Restaurant</h1>
      <h2>Phone: 0316-0143685</h2>
      <h3>Order Number: ${Math.floor(Math.random() * 10000)}</h3>
      <h3>Date: ${date.innerHTML}</h3>
      <hr />
      <h2>Items Ordered:</h2>
      ${itemsHtml}
      <hr />
      <h2>Subtotal: $${(totalWithTax / 1.085).toFixed(2)}</h2>
      <h2>Tax: $${(totalWithTax - (totalWithTax / 1.085)).toFixed(2)}</h2>
      <h2>Total: $${totalWithTax.toFixed(2)}</h2>
      <h2>Discount: ${appliedDiscount}%</h2>
      ${discountHtml}
      <h2>Payment Method:</h2>
      <p>${show_pay}</p>
      ${show_pay.includes('cash') ? `<h2>Cash Received: $${cashReceived ? cashReceived.toFixed(2) : '0.00'}</h2>
      <h2>Change: $${change ? change.toFixed(2) : '0.00'}</h2>` : ''}
      <hr />
      <p>Thank you for your order!</p>
      <h1>Have a great day!</h1>

      <div class="btn-group">
        <button onclick="window.print()">🖨️ Print Receipt</button>
        <button onclick="window.close()">❌ Cancel</button>
      </div>
      </body>
      </html>
    `;

    let printWindow = window.open('', '_blank', 'width=600,height=800');
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  printWindow.addEventListener("afterprint" ,()=>{
      let cancle = document.getElementById("cancle");
    if (cancle) {
        cancle.disabled = false;
        cancle.style.backgroundColor = "green";
        cancle.style.cursor = "pointer";
    }

    printWindow.close();
  })
  });
  
}


// print done/

 var cancle = document.getElementById("cancle");

cancle.addEventListener("click", () => {
  let s_boxes = document.getElementsByClassName("s_box");
  let [box_order, box_Revenue] = s_boxes;

  if (box_order) {
    let currentValue = parseInt(box_order.innerHTML) || 0;
    box_order.innerHTML = currentValue + 1;
    box_order.classList.add("s_box");

  }

  if (box_Revenue) {
    let current_reven=parseInt(box_Revenue.innerHTML) || 0;
   box_Revenue.innerHTML = (current_reven + parseFloat(totalWithTax)).toFixed(2);
  };
  let pay_box = document.getElementsByClassName("pay_box")[0];
  if (pay_box) pay_box.style.display = "none";
  shopay.innerHTML='';
  cart.length = 0;
   // Clear the cart
  updateCartDisplay();
   // Update the cart display
  cancle.disabled = true;
  cancle.style.background="red";
  cancle.style.cursor="not-allowed"

});

  //  cancle;e done 
  var adminbnt = document.getElementById("admin_bnt");
  var admin_plan = document.getElementById("admin");
  var close = document.getElementById("close_plan");

  if (adminbnt && admin_plan) {
    adminbnt.addEventListener("click", () => {
      if (admin_plan.style.display === "none") {
        admin_plan.style.display = "flex";
      } else {
        admin_plan.style.display = "none";
      }
    });
  }

  if (close && admin_plan) {
    close.addEventListener("click", () => {
      admin_plan.style.display = "none";
    });
  }
  // add item function 

  document.getElementById('item_add').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('item_name').value;
    const price = parseFloat(document.getElementById('item_price').value);
    const category = document.getElementById('select_category').value;
    const description = document.getElementById('description').value;

    // alert(`Name: ${name}\nPrice: ${price}\nCategory: ${category}\nDescription: ${description}`);
    
    const newItem = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        category: category
    };

    // Ensure menuData exists
    if (!menuData[category]) {
        menuData[category] = [];
    }
    menuData[category].push(newItem);

    // Refresh display if current category matches
    
    let currentCategory = document.querySelector('.category .selected')?.getAttribute('data-category');
  let displayMenuItems = function(category) {
  }
    
   

    // Reset form
    this.reset();
    alert('Menu item added successfully!');
});


});
