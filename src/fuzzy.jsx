// Inside BloodInput component

// Define fuzzy sets for stock and demand (dummy example)
const stockFuzzySets = {
    low: (stock) => Math.max(0, 1 - stock / 50),
    medium: (stock) => (stock > 25 && stock < 75) ? 1 : 0,
    high: (stock) => Math.min(1, stock / 50),
};

const demandFuzzySets = {
    low: (demand) => Math.max(0, 1 - demand / 50),
    medium: (demand) => (demand > 25 && demand < 75) ? 1 : 0,
    high: (demand) => Math.min(1, demand / 50),
};

// Define fuzzy rules (dummy example)
const rules = [
    {
        antecedent: "stock is low AND demand is low",
        consequent: "shortage is 0",
    },
    {
        antecedent: "stock is low AND demand is medium",
        consequent: "shortage is 20",
    },
    {
        antecedent: "stock is medium AND demand is high",
        consequent: "surplus is 10",
    },
    // Add more rules for different combinations
];

// Calculate fuzzy output (shortage or surplus)
const calculateFuzzyOutput = () => {
    let shortage = 0;
    let surplus = 0;

    // Loop through rules and calculate activation levels
    for (const rule of rules) {
        const stockActivation = stockFuzzySets[rule.antecedent.split(" ")[2]](stock);
        const demandActivation = demandFuzzySets[rule.antecedent.split(" ")[4]](demand);
        const activation = Math.min(stockActivation, demandActivation);

        // Calculate weighted contribution of each rule
        if (rule.consequent.includes("shortage")) {
            shortage += parseFloat(rule.consequent.split(" ")[2]) * activation;
        } else {
            surplus += parseFloat(rule.consequent.split(" ")[1]) * activation;
        }
    }

    // Normalize shortage and surplus values
    const totalActivation = shortage + surplus;
    shortage = totalActivation > 0 ? shortage / totalActivation : 0;
    surplus = totalActivation > 0 ? surplus / totalActivation : 0;

    return { shortage, surplus };
};

// Call the fuzzy output calculation function and display the result
const { shortage, surplus } = calculateFuzzyOutput();

// Display the calculated shortage/surplus
return (
    // ... rest of the component code
    <div><p>Shortage: {shortage * 100}%</p> 
    <p>Surplus: {surplus * 100}%</p></div>
);