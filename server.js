require('dotenv').config();
const path=require('path'),express=require('express'),cookieParser=require('cookie-parser');
const {initDb}=require('./src/database'),{attachUser}=require('./src/middleware/auth'),{notFound,errorHandler}=require('./src/middleware/errors');

if(process.env.NODE_ENV==='production'&&(!process.env.SESSION_SECRET||process.env.SESSION_SECRET.length<32))throw new Error('SESSION_SECRET must be set to at least 32 characters in production.');

const app=express();
const PORT=Number(process.env.PORT||3000);

app.set('trust proxy',1);
initDb();
app.disable('x-powered-by');
app.use(express.json({limit:'100kb'}));
app.use(express.urlencoded({extended:false,limit:'100kb'}));
app.use(cookieParser(process.env.SESSION_SECRET||'dev-secret'));
app.use(attachUser);

app.use('/api',require('./src/routes/health'));
app.use('/api/site',require('./src/routes/site'));
app.use('/api/auth',require('./src/routes/auth'));
app.use('/api/announcements',require('./src/routes/announcements'));
app.use('/api/reports',require('./src/routes/reports'));
app.use('/api/requests',require('./src/routes/requests'));
app.use('/api/support',require('./src/routes/support'));
app.use('/api/admin',require('./src/routes/admin'));

app.use(express.static(path.join(__dirname,'public'),{extensions:['html']}));
app.use('/api',(req,res)=>res.status(404).json({error:'Not found'}));
app.use(notFound);
app.use(errorHandler);

if(!process.env.VERCEL){
  app.listen(PORT,'0.0.0.0',()=>console.log(`Xychen OS listening on http://localhost:${PORT}`));
}

module.exports=app;
