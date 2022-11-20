//Homepage
->No API required


///////////Listing page
->Watches with respect to watchCollections or watchType
* http://localhost:9800/watches?watchType=2
* http://localhost:9800/watches?collectionId=2

->Filter based on watch brand and collection selected (GET)
* http://localhost:9800/collectionFilter/2?brandId=5

->Filter based on watch price and collection selected(GET)
* http://localhost:9800/collectionFilter/2?lprice=20000&hprice=30000

->Filter based on watch brand and watch type(GET)
* http://localhost:9800/watchTypeFilter/1?brandId=5

->Filter based on watch price and watch type(GET)
* http://localhost:9800/watchTypeFilter/1?lprice=2000&hprice=30000

->Sorting based on the price
* http://localhost:9800/collectionFilter/2?sort=1



/////////Details page
->To show the details of selected watch(GET)
* http://localhost:9800/details?watchId=20


/////////cart page
->To show the items added to cart (POST)
* http://localhost:9800/cart
body:
 { 
    "id":[ 11,34,23,9 ] 
    }

->To place the order (POST)
* http://localhost:9800/placeOrder
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
* http://localhost:9800/orders

-> List of orders wrt to email (GET)
* http://localhost:9800/orders?email=vik@gmail.com

->Update payment details (PUT)
* http://localhost:9800/updateOrder/1
body{
    "status":"Delivered",
    "bank_details":"HDFC Bank",
    "date":"15-11-2022" 
}

->Delete order (DELETE)

* http://localhost:9800/deleteOrder/63727fe4fb4814c2a4b80933
