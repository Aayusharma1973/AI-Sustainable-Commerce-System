import { useState } from "react"
import axios from "axios"

function App(){

const [productName,setProductName] = useState("")
const [description,setDescription] = useState("")
const [categoryResult,setCategoryResult] = useState(null)

const [budget,setBudget] = useState("")
const [purpose,setPurpose] = useState("")
const [proposalResult,setProposalResult] = useState(null)

const [impactInput,setImpactInput] = useState("")
const [impactResult,setImpactResult] = useState(null)

const [loading,setLoading] = useState(false)

const generateCategory = async ()=>{

try{

setLoading(true)

const res = await axios.post(
"http://localhost:5000/api/ai/category",
{
product_name:productName,
description:description
}
)

setCategoryResult(res.data)

}catch(err){

console.error(err)
alert("Error generating category")

}

setLoading(false)

}

const generateProposal = async ()=>{

try{

setLoading(true)

const res = await axios.post(
"http://localhost:5000/api/ai/proposal",
{
budget:budget,
purpose:purpose
}
)

setProposalResult(res.data)

}catch(err){

console.error(err)
alert("Error generating proposal")

}

setLoading(false)

}

const generateImpact = async ()=>{

try{

setLoading(true)

const lines = impactInput.split("\n")

let products = []
let current = {}

lines.forEach(line => {

const [key,value] = line.split("=")

if(!key || !value) return

const k = key.trim()
const v = value.trim()

if(k === "name") current.name = v
if(k === "quantity") current.quantity = Number(v)
if(k === "price") current.price = Number(v)

if(current.name && current.quantity && current.price){
products.push(current)
current = {}
}

})

const res = await axios.post(
"http://localhost:5000/api/ai/impact",
{
products:products
}
)

setImpactResult(res.data)

}catch(err){

console.error(err)
alert("Invalid product format")

}

setLoading(false)

}

return(

<div
style={{
width:"100%",
minHeight:"100vh",
display:"flex",
justifyContent:"center",
padding:"30px",
background:"#f6f7fb"
}}
>

<div
style={{
width:"100%",
maxWidth:"1400px",
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:"25px",
alignItems:"start"
}}
>

<div className="card">

<h2>Product Categorization</h2>

<input
className="input"
placeholder="Product Name"
value={productName}
onChange={(e)=>setProductName(e.target.value)}
/>

<textarea
className="input"
rows="2"
placeholder="Product Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button className="btn-blue" onClick={generateCategory}>
Generate
</button>

{categoryResult && (

<div className="result">

<p><b>Category:</b> {categoryResult.category}</p>

<p><b>Sub Category:</b> {categoryResult.sub_category}</p>

<p><b>SEO Tags</b></p>

<ul>
{categoryResult.seo_tags?.map((tag,i)=>(
<li key={i}>{tag}</li>
))}
</ul>

<p><b>Sustainability Filters</b></p>

<ul>
{categoryResult.sustainability_filters?.map((f,i)=>(
<li key={i}>{f}</li>
))}
</ul>

</div>

)}

</div>

<div className="card">

<h2>B2B Proposal</h2>

<input
className="input"
type="number"
placeholder="Budget"
value={budget}
onChange={(e)=>setBudget(e.target.value)}
/>

<input
className="input"
placeholder="Purpose"
value={purpose}
onChange={(e)=>setPurpose(e.target.value)}
/>

<button className="btn-purple" onClick={generateProposal}>
Generate
</button>

{proposalResult && (

<div className="result">

<p><b>Total Cost:</b> ₹{proposalResult.total_cost}</p>

<p>{proposalResult.impact_summary}</p>

<h4>Suggested Products</h4>

<ul>
{proposalResult.products?.map((p,i)=>(
<li key={i}>
{p.name} | Qty: {p.quantity} | ₹{p.price}
</li>
))}
</ul>

</div>

)}

</div>
<div className="card">

<h2>Impact Report</h2>

<p style={{fontSize:"13px",color:"#666",marginBottom:"8px"}}>
Enter product details like this:
</p>

<textarea
className="input"
rows="4"
value={impactInput}
onChange={(e)=>setImpactInput(e.target.value)}
style={{resize:"none"}}
placeholder={`name= Reusable Water Bottle
quantity=10
price=1200

name= Bamboo Notebook
quantity=20
price=500`}
/>

<button className="btn-blue" onClick={generateImpact}>
Generate Impact
</button>

{impactResult && (

<div className="result">

<p><b>Plastic Saved:</b> {impactResult.plastic_saved_kg} kg</p>

<p><b>Carbon Avoided:</b> {impactResult.carbon_avoided_kg} kg</p>

<p><b>Local Impact</b></p>

<p>{impactResult.local_impact}</p>

<p><b>Impact Statement</b></p>

<p>{impactResult.impact_statement}</p>

</div>

)}

</div>

</div>

{loading && <p style={{marginTop:"20px"}}>Generating AI response...</p>}

</div>

)

}

export default App