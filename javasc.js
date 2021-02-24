alert('You are most welcome') 
 
if (document.readyState == 'loading') { 

    document.addEventListener('DOMContentLoaded', ready) 
} 
    else { 
    ready() 
} 


 //remove item from cart function
 

function ready() { 
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartItemButtons.length; i++){ 
  var button = removeCartItemButtons[i]  
  button.addEventListener('click', removeCartItem) 
}

// this var is for the quantity amount of items custmer wants to add//    

     var quantityInputs = document.getElementsByClassName('cart-quantity-input')      
     for (var i = 0; i < quantityInputs.length; i++) {     
     var input = quantityInputs[i] 
     input.addEventListener('change', quantityChanged)
     
  

     }
     
     


// this var hyperlinks to add to cart function//     

     var addToCartButtons = document.getElementsByClassName('shop-item-button') 
     for(var i = 0; i < addToCartButtons.length; i++) { 
     var button = addToCartButtons[i]
     button.addEventListener('click', addToCartClicked) 
     }// end forloop

//this is the event listner that add items to the cart when the end user clicks on the add to cart//         

     document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked) 
}
 
 
//this is the final alert function which sends the thank you for purchas alert//
       
function purchaseClicked() { alert('Thank you for your purchase')         
        var cartItems = document.getElementsByClassName('cart-items')[0] 
        while (cartItems.hasChildNodes()) { cartItems.removeChild(cartItems.firstChild) 
        }
        
         
// end alert this while loop removes all the cart itmes 1 by 1 till there are no more cart items left. removes the first child//


        updateCartTotal() 
}


 

 
 
// remove cart items function the global variables are at the beggining of the code//
       
function removeCartItem(event) { 
    var buttonClicked = event.target    
    buttonClicked.parentElement.parentElement.remove() 
    updateCartTotal() 
}


 
// quantity add or remove amounts //

         
function quantityChanged(event) {         
     var input = event.target          
     if (isNaN(input.value) || input.value <= 0) { input.value = 1 } updateCartTotal() 
}


//when user clicks on the add to cart button fucntion  this places the item in a row adding to the items in the cart//


function addToCartClicked(event) { 
    var button = event.target
    var shopItem = button.parentElement.parentElement 
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText 
    
  
    
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src 
    
//this adds the picture to the cart row and retrieves the pictures from the source code //   
       addItemToCart(title, price, imageSrc)
        updateCartTotal() 
} 
  
//  this adds the items to the cart array//
       
function addItemToCart(title, price, imageSrc) { 
    var cartRow = document.createElement('div') 
    cartRow.classList.add('cart-row') 
    var cartItems = document.getElementsByClassName('cart-items')[0] 
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title') 
    for (var i = 0; i < cartItemNames.length; i++){ 
    if (cartItemNames[i].innerText == title) { 
    alert('This item is already added to the cart')
return 


}

 
}


var cartRowContents =
    ` <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span> 
      </div>        
      <span class="cart-price cart-column">${price}</span>        
      <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">               
      <button class="btn btn-danger" type="button">REMOVE</button>            
      </div>`
                                                 
cartRow.innerHTML = cartRowContents 
     cartItems.append(cartRow)
     cartRow.getElementsByClassName('btn-danger')[0]
     .addEventListener('click', removeCartItem) 
     cartRow.getElementsByClassName('cart-quantity-input')[0]
     .addEventListener('change', quantityChanged) 
} 




 //Cart Row Total Code //                 

function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0] 
        var cartRows = cartItemContainer
        .getElementsByClassName('cart-row')
        var total = 0 
        for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i] 
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] 
        var quantityElement = cartRow
        .getElementsByClassName('cart-quantity-input')[0] 
        var price = parseFloat(priceElement.innerText.replace('TND', '')) 
        
        
        var quantity = quantityElement.value 
        total = total + (price * quantity) 
        }
//this rounds the integer amount to two decimels //                         
    
    total = Math.round(total * 100) / 100 
           document.getElementsByClassName('cart-total-price')[0].innerText = 'TND' + total 
}
