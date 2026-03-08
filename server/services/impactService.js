export const calculateImpact = (products) => {

 let plasticSaved = 0
 let carbonAvoided = 0

 products.forEach(product => {

  const qty = product.quantity

  plasticSaved += qty * 0.05
  carbonAvoided += qty * 0.12

 })

 return {

  plastic_saved_kg: plasticSaved.toFixed(2),

  carbon_avoided_kg: carbonAvoided.toFixed(2),

  local_impact:
   "Promotes sustainable products sourced from eco-friendly materials and responsible supply chains.",

  impact_statement:
   `This purchase prevents approximately ${plasticSaved.toFixed(2)} kg of plastic waste and avoids ${carbonAvoided.toFixed(2)} kg of carbon emissions while promoting sustainable consumption.`

 }

}