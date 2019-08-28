const express = require('express');
const router = express.Router();

const Destination = require('../Models/Destinations.js');

 router.get("/", async (req, res)=>{
     try{
        const Destinations = await Destination.find()
        res.render("destination/index.ejs", {
             destinationsOnThePage: Destinations,
             currentUser: req.session.userId
            });
     }catch(err){
         res.send(err);
     }
    })

// ************* NEW *****************
router.get("/new", (req, res)=>{
    if(!req.session.userId){
        currentUser= req.session.userId
        //console.log(currentUser)
        res.redirect("/users/new")
    }else{
    res.render("destination/new.ejs")
}})

//********** CREATE *****************
router.post("/", async (req, res)=>{
    try{
        req.body.user = req.session.userId;
        const newDestination = await Destination.create(req.body)
        //console.log(newDestination)
        res.redirect("/destinations")
    }catch(err){
        res.send(err);
    }  
 })

//************ SHOW ******************
router.get("/:id", async (req, res)=>{
    try{
        // console.log(req.params.id)
        const Destinations = await Destination.findById(req.params.id).populate('user')
        // console.log(Destinations)
        currentUser= req.session.userId
        res.render("./destination/show.ejs", {
            destinationsOnThePage: Destinations
        })
    }catch(err){
        res.send(err);
    }
})

//************* DELETE *****************
router.delete('/:id',(req,res) => {
    Destination.findByIdAndRemove(req.params.id,(err,data) => {
        res.redirect('/destinations')
    })
  })

  //************* EDIT ******************
router.get("/:id/edit", async (req, res)=>{
    try{
        currentUser= req.session.userId
        const Destinations = await Destination.findById(req.params.id)
        res.render("./destination/edit.ejs", {
            destinationsOnThePage : Destinations
        })

}catch(err){
    res.send(err);
}
})

//************** UPDATE *******************
router.put("/:id", async (req, res)=>{
    try{
    const foundDestination = await Destination.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.redirect(`/destinations/${foundDestination._id}`)
    }catch(err){
      res.send(err);
    }
   })

module.exports = router