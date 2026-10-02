const router=require('express').Router(),{requireAuth}=require('../middleware/auth'),c=require('../services/community'),{clean}=require('../utils/validation');

router.use(requireAuth);

router.get('/',(req,res)=>{
  res.json({requests:c.mine('requests',req.user.id)});
});

router.post('/',(req,res)=>{
  const t=clean(req.body.title,2,120),d=clean(req.body.description,2,4000);
  if(!t||!d)return res.status(400).json({error:'Title and description are required'});
  res.status(201).json({request:c.create('requests',req.user.id,t,d)});
});

module.exports=router;
