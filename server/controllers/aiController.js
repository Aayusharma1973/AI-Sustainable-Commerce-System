import Product from "../models/Product.js";
import { generateAIResponse } from "../services/openaiService.js";
import { calculateImpact } from "../services/impactService.js"



export const generateCategory = async (req, res) => {

  try {

    if (!req.body) {
      return res.status(400).json({ error: "Request body missing" });
    }

    const { product_name, description } = req.body;

    const prompt = `
Product Name: ${product_name}
Description: ${description}

Generate:
- 1 product category
- 1 sub category
- 5 SEO tags
- 5 sustainability filters

Return JSON format only:

{
 "category":"",
 "sub_category":"",
 "seo_tags":[],
 "sustainability_filters":[]
}
`;

    const aiResponse = await generateAIResponse(prompt);

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    if (
      data.sustainability_filters &&
      Array.isArray(data.sustainability_filters) &&
      typeof data.sustainability_filters[0] === "object"
    ) {
      data.sustainability_filters = data.sustainability_filters.map(
        (f) => f.filter || f.name || "eco-friendly"
      );
    }

    const product = new Product({
      product_name,
      description,
      category: data.category || "",
      sub_category: data.sub_category || "",
      seo_tags: data.seo_tags || [],
      sustainability_filters: data.sustainability_filters || []
    });

    await product.save();

    res.json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI category generation failed"
    });

  }

};




export const generateProposal = async (req, res) => {

  try {

    const { budget, purpose } = req.body;

    const prompt = `
Budget: ${budget}
Purpose: ${purpose}

Generate a sustainable product bundle proposal.

The products should match the purpose and stay within the given budget.

Rules:
- Suggest 3 to 5 sustainable products
- Each product must include quantity and unit price
- Total cost MUST equal the given budget

Return JSON only:

{
 "products":[
  {
   "name":"",
   "quantity":0,
   "price":0
  }
 ],
 "total_cost": ${budget},
 "impact_summary":""
}
`;

    const aiResponse = await generateAIResponse(prompt);

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    data.total_cost = budget;

    res.json({
      products: data.products || [],
      total_cost: data.total_cost,
      impact_summary: data.impact_summary || ""
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Proposal generation failed"
    });

  }

};
export const generateImpactReport = async (req,res)=>{

 try{

 const {products} = req.body

 const impact = calculateImpact(products)

 res.json(impact)

 }catch(error){

 console.error(error)

 res.status(500).json({
  error:"Impact report generation failed"
 })

 }

}