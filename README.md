# pizzaTracker
Pizzashop dashboard // item tracker.

Got SPA navigation working
Added some CSS stuff, nothing permenant was just testing.


#BIG UPDATE:
## main.js
1. I addded an iffy called myShit, we're gonna rename it but the point is that it's taking care of the behind the scenes calls... 
2. There's a global variable with the URL in it, next we need to start setting headers for individual requests... should probably be using a precontructed object with variables passed in? Not sure... 
3. There's a function to fetch the pizzas, its called in init right now but that needs to change. We need to find a way to make it get called when the list is clicked selected... not just init.
4. There's a funciton that runs a loop over every item the server responds with to build out the text on the list. It also assings `data-id` attributes to the buttons on the document for later use. This function litterally takes care of the entire response.

Let's get it.