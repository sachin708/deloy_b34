
const express = require("express");
const { NoteModel } = require("../mdules/note.module");
const { auth } = require("../middleware/auth");

const noterouter = express.Router();

noterouter.post("/add", auth, async(req, res)=>{
    try{
      const note = new NoteModel(req.body);
      await note.save();
      res.json({msg:"new note is adding"})
    }catch(err){
       res.json({err})
    }
});

noterouter.get("/", auth, async(req, res)=>{
    try{
      const notes = await NoteModel.find({userID:req.body._id});
      res.json({notes});
    }catch(err){
        res.json({err});
    }
})

noterouter.patch("/:noteID", auth, async(req, res)=>{
    const payload = req.body;
    const{noteID} = req.params
    try{
        const note = await NoteModel.findOne({_id:noteID})
        if(req.body.userID==note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID}, payload);
            res.json({msg:`The note update in ID:${userID} update`})
        } else {
            res.json({msg:"Ypu don't have access to update someone else's note"})
        }
    }catch(err){
        res.json({err})
    }
})

module.exports = {
    noterouter
}