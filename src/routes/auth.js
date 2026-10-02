const router=require('express').Router(),{createUser,getByLogin,verifyPassword}=require('../services/users'),{createSession,setSessionCookie,clearSession}=require('../middleware/auth'),{isEmail,isUsername,isPassword}=require('../utils/validation');

router.post('/register',(req,res,next)=>{
  try{
    const username=(req.body.username||'').trim(),email=(req.body.email||'').trim().toLowerCase(),password=req.body.password||'';
    if(!isUsername(username))return res.status(400).json({error:'Username must be 3-24 characters using letters, numbers, or underscores'});
    if(!isEmail(email))return res.status(400).json({error:'Please enter a valid email address'});
    if(!isPassword(password))return res.status(400).json({error:'Password must be 8-128 characters'});
    const user=createUser(username,email,password),token=createSession(user.id);
    setSessionCookie(res,token);
    res.status(201).json({user});
  }catch(e){
    if(String(e.message).includes('UNIQUE'))return res.status(409).json({error:'Username or email already exists'});
    next(e);
  }
});

router.post('/login',(req,res)=>{
  const login=(req.body.login||'').trim(),password=req.body.password||'',user=getByLogin(login);
  if(!user||!verifyPassword(user.password_hash,password))return res.status(401).json({error:'Invalid username/email or password'});
  const token=createSession(user.id);
  setSessionCookie(res,token);
  res.json({user:{id:user.id,username:user.username,email:user.email,role:user.role,created_at:user.created_at}});
});

router.post('/logout',(req,res)=>{clearSession(req,res);res.json({ok:true})});
router.get('/me',(req,res)=>res.json({user:req.user||null}));
module.exports=router;
