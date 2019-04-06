const { Router} = require("express")
const app = Router();
const stripe  = require("stripe")('sk_test_FxJnNyZDipeeK2k5J67g3oQC00CMfSiG1I')
app.get("",(req,res)=>{
res.render("index")
});

app.post("/pago", async (req,res)=>{
    console.log(req.body);
    const customer = await stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken
    });

    const change = await stripe.charges.create({
        amount:'3000',
        currency:'usd',
        customer:customer.id,
        description:"Compra del curso de PHP"

    });

    res.render("descargar")
    
});

module.exports = app;