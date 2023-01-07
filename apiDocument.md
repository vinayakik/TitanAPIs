//Homepage
->No API required


///////////Listing page
->Watches with respect to watchCollections or watchType
* https://titan-a1eo.onrender.com/watches?watchType=3
* https://titan-a1eo.onrender.com/watches?collectionId=4


->Filter based on watch brand and collection selected (GET)
* https://titan-a1eo.onrender.com/collectionFilter/2?brandId=5

->Filter based on watch price and collection selected(GET)
* https://titan-a1eo.onrender.com/collectionFilter/2?lprice=20000&hprice=30000

->Filter based on watch brand and watch type(GET)
* https://titan-a1eo.onrender.com/watchTypeFilter/1?brandId=5

->Filter based on watch price and watch type(GET)
* https://titan-a1eo.onrender.com/watchTypeFilter/1?lprice=8000&hprice=30000

->Sorting based on the price
* https://titan-a1eo.onrender.com/collectionFilter/2?sort=1



/////////Details page
->To show the details of selected watch(GET)
* https://titan-a1eo.onrender.com/details?watchId=20


/////////cart page
->To show the items added to cart (POST)
* https://titan-a1eo.onrender.com/cart
body:
 { 
    "id":[ 11,34,23,9 ] 
    }

->To place the order (POST)
* https://titan-a1eo.onrender.com/placeOrder
body { 
    "orderId": 3, 
    "name": "Amit", 
    "email": "amit@gmail.com", 
    "address": "Hom 35", 
    "phone": 8934645457, 
    "cost": 833, 
    "cartItem": [ 11,34,23 ] 
}

///Orders

->List of orders (GET)
* https://titan-a1eo.onrender.com/orders

-> List of orders wrt to email (GET)
* https://titan-a1eo.onrender.com/orders?email=vik@gmail.com

->Update payment details (PUT)
* https://titan-a1eo.onrender.com/updateOrder/2
body{
    "status":"Delivered",
    "bank_details":"HDFC Bank",
    "date":"15-11-2022" 
}

->Delete order (DELETE)

* https://titan-a1eo.onrender.com/deleteOrder/6372a91f116bbb14cd7bd024
