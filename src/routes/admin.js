const router=require('express').Router(),{requireAdmin}=require('../middleware/auth'),c=require('../services/community'),a=require('../services/announcements'),{clean}=require('../utils/validation');

router.use(requireAdmin);

router.get('/reports',(req,res)=>res.json({reports:c.all('reports')}));
router.get('/requests',(req,res)=>res.json({requests:c.all('requests')}));
router.get('/support',(req,res)=>res.json({tickets:c.all('support')}));
router.get('/announcements',(req,res)=>res.json({announcements:a.all()}));

router.patch('/reports/:id',(req,res)=>{
  const item=c.status('reports',req.params.id,req.body.status);
  if(!item)return res.status(400).json({error:'Invalid report status or ID'});
  res.json({report:item});
});
router.patch('/requests/:id',(req,res)=>{
  const item=c.status('requests',req.params.id,req.body.status);
  if(!item)return res.status(400).json({error:'Invalid request status or ID'});
  res.json({request:item});
});
router.patch('/support/:id',(req,res)=>{
  const item=c.status('support',req.params.id,req.body.status);
  if(!item)return res.status(400).json({error:'Invalid support status or ID'});
  res.json({ticket:item});
});

router.post('/announcements',(req,res)=>{
  const title=clean(req.body.title,2,120),content=clean(req.body.content,2,4000);
  if(!title||!content)return res.status(400).json({error:'Title and content are required'});
  res.status(201).json({announcement:a.create(title,content,req.user.id)});
});

module.exports=router;