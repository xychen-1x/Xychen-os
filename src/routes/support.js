const router=require('express').Router(),{requireAuth}=require('../middleware/auth'),c=require('../services/community'),{clean}=require('../utils/validation');

router.use(requireAuth);

router.get('/',(req,res)=>{
  res.json({tickets:c.mine('support',req.user.id)});
});

router.post('/',(req,res)=>{
  const subject=clean(req.body.subject,2,120),message=clean(req.body.message,2,4000);
  if(!subject||!message)return res.status(400).json({error:'Subject and message are required'});
  res.status(201).json({ticket:c.create('support',req.user.id,subject,message)});
});

module.exports=router;