describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://elaine-ch.github.io/Lab6_Part1_Starter/');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });
    
    // Make sure the title, price, and image are populated in the JSON

    firstValue = prodItemsData[0];
    for (let i = 0; i < prodItemsData.length; i++)
      {
        console.log(`Checking product number ${i + 1}/${prodItemsData.length}`);

        if (prodItemsData[i].title.length == 0)
          allArePopulated = false;

        if (prodItemsData[i].price.length == 0)
        allArePopulated = false;

        if (prodItemsData[i].image.length == 0)
        allArePopulated = false;
      }
    
    // Expect allArePopulated to still be true

    expect(allArePopulated).toBe(true);

    // TODO - Step 1 COMPLETE

  }, 10000);

  it('Make sure <product-item> elements are populated', async () => {
    const allArePopulated = await page.$$eval('product-item', prodItems => {
      return prodItems.every(item => {
        const data = item.data;
        return data && data.title && data.title.length > 0 && 
               data.price && data.price > 0 && 
               data.image && data.image.length > 0;
      });
    });
    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    const item = await page.$('product-item');

    let innerText = await page.evaluate(item => {
      let shadow = item.shadowRoot;
      let button = shadow.querySelector('button');
      button.click();

      let innerText = button.innerText;

      return innerText;
    }, item);


    await page.evaluate(item => {
        
      let shadow = item.shadowRoot;
      let button = shadow.querySelector('button');
      button.click();

    }, item);

    expect(innerText).toBe("Remove from Cart");
    

    // TODO - Step 2 (COMPLETE?)

  }, 2500);



  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');


    const productItems = await page.$$('product-item');

    for (let item of productItems){

        await page.evaluate(item => {
        
        let shadow = item.shadowRoot;
        let button = shadow.querySelector('button');
        button.click();

      }, item);

    }

    let counter = await page.$eval('#cart-count', el => el.innerText);

    expect(counter).toBe('20');



    // TODO - Step 3 (COMPLETE)
  }, 10000);


  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();
    
    const productItems = await page.$$('product-item');

    let buttonAndNumCheck = true;


    for (let item of productItems){

      await page.evaluate(item => {
      
      let shadow = item.shadowRoot;
      let button = shadow.querySelector('button');
      
      if (button.innerText != "Remove from Cart")
        buttonAndNumCheck = false;
      
      }, item);

    } 

    let counter = await page.$eval('#cart-count', el => el.innerText);

    if (counter != 20)
      buttonAndNumCheck = false;

    expect(buttonAndNumCheck).toBe(true);

    // TODO - Step 4 (COMPLETE)

  }, 10000);





  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {


    // TODO - Step 5 (COMPLETEÅ)Å

    const answer = "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]";

    const cart = await page.evaluate(() => {
      return (localStorage.cart);
    });


    expect(cart).toBe(answer);

  });






  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');


    const productItems = await page.$$('product-item');

    for (let item of productItems){

        await page.evaluate(item => {
        
        let shadow = item.shadowRoot;
        let button = shadow.querySelector('button');
        button.click();

      }, item);

    }

    let counter = await page.$eval('#cart-count', el => el.innerText);

    expect(counter).toBe('0');


    // TODO - Step 6 (COMPLETE)

  }, 10000);




  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');


    // TODO - Step 7 (COMPLETE)



    await page.reload();
    
    const productItems = await page.$$('product-item');

    let buttonAndNumCheck = true;


    for (let item of productItems){

      await page.evaluate(item => {
      
      let shadow = item.shadowRoot;
      let button = shadow.querySelector('button');
      
      if (button.innerText != "Add to Cart")
        buttonAndNumCheck = false;
      
      }, item);

    } 

    let counter = await page.$eval('#cart-count', el => el.innerText);

    if (counter != 0)
      buttonAndNumCheck = false;

    expect(buttonAndNumCheck).toBe(true);


  }, 10000);


  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

  const answer = "[]";

  const cart = await page.evaluate(() => {
    return (localStorage.cart);
  });


  expect(cart).toBe(answer);


    // TODO - Step 8 (COMPLETE)

  });
});
