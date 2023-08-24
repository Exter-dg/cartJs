const readline = require("readline")

const fabrics = {
	"fabric1": {
		"name": "fabric 1",
		"cost": 400,
		"description": "..."
	},
	"fabric2": {
		"name": "fabric 2",
		"cost": 100,
		"description": "..."
	},
}

const measurements = {
	"user1": {
		"shoulder": 40,
		"chest": 40,
		"waist": 40
	}
}

const measurementsNeeded = [
	"shoulder",
	"chest",
	"waist"
]

const products = [
	"tshirt",
	"shirt"
]

const styles = {
	"tshirt": {
		"fit": ["regular", "slim"],
		"collar": ["round", "mandarin"]
	},
	"shirt": {
		"fit": ["regular", "slim"],
		"collar": ["round", "mandarin"]
	}
}

const userId = "user1";

// Reading inputs in nodejs
// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

// User's cart
/*
	[
		{
			"id": 1
			"product": "tshirt",
			"fabric": "fabricid",
			"styles": {
				"fit": ,
				"collar"
			},
			"measurement": {
				"shoulder",
				"chest": ,
				"waist"
			}
		}
	]
*/
const cart = [

]

const calculateCharges = () => {
	let shipping = 50;
	let cartValue = 0;
	let taxes = 0;
	let totalItems = 0
	
	cart.forEach((product) => {
		cartValue += product["fabric"]["cost"] * parseInt(product["quantity"]);
		totalItems += parseInt(product["quantity"]);
	});

	if(cartValue > 500) {
		shipping = 0;
	}

	taxes = 0.18 * cartValue;

	return {
		totalItems, shipping, taxes, cartValue, finalAmount: shipping+taxes+cartValue
	};
}

const viewCart = () => {
	console.log(cart);
	console.log("Your charges are: ", calculateCharges());
}

const addToCart = async (product) => {
	const productDetails = await chooseProduct();
	cart.push(productDetails);
}

// Simulate choosing a product
// Choose a product category -> choose fabric -> choose styles -> measurements -> add to cart
const chooseProduct = async () => {
	// Select Product
	console.log("Press the appropriate index number to choose an item - starting 0");
	console.log("List of products - ", products);
	const productIndex = await askQuestion("Please select a product: ");

	// TODO Add a check if it is a number and if the index is valid
	console.log(products[productIndex]);
	const selectedProduct = products[productIndex];


	// Selecting a Fabric
	// TODO Functionality to filter fabric based on costs

	console.log("List of products - ", fabrics);
	const fabricId = await askQuestion("Please select a fabric: ");

	// TODO Check whether fabricId is valid
	const selectedFabric = fabrics[fabricId];

	console.log("Selected Fabric: ", selectedFabric);

	// Selecting a style
	const selectedStyles = {

	};
	// Iterate over styles object
	for(const key in styles[selectedProduct]) {
		console.log(`${key}: `, styles[selectedProduct][key])
		const choice = await askQuestion(`Please select ${key}: `);
		selectedStyles[key] = styles[selectedProduct][key][choice];
	}

	console.log("Selected Styles is", selectedStyles);


	let selectedMeasurements = {}
	// Measurements
	if(measurements[userId] !== undefined) {
		// TODO If they want to change the default measurements
		selectedMeasurements = measurements[userId];
	} else {
			// selectedMeasurements = await selectMeasurements();
			selectedMeasurements = {

			}
		
	}

	console.log("Selected Measurements are: ", selectedMeasurements);

	const quantity = await askQuestion("Please select Product Quantity: ");

	const productDetails = {
		"id": cart.length,
		"product": selectedProduct,
		"fabric": selectedFabric,
		"measurements": selectedMeasurements,
		"quantity" : quantity
	}

	return productDetails;

}

const mainFunc = async () => {
	const toContinue = true;
	while(toContinue) {
		// console.log("running a loop");
		const choice = await askQuestion(`Do you want to add a product to the cart, press 1 for yes: `);
		if(choice != "1") {
			break;
		} 

		// Call a function to add to cart 
		await addToCart();
		
	}
	viewCart();
}

mainFunc();
