const fs=require('fs'),path=require('path'),Database=require('better-sqlite3');
let db=null,dbPath=null;

function initDb(){
  if(db)return db;
  const dataDir=process.env.VERCEL?'/tmp/xychen-os':'./data';
  fs.mkdirSync(dataDir,{recursive:true});
  dbPath=process.env.DB_PATH||path.join(dataDir,'xychen.db');
  db=new Database(dbPath);
  db.pragma('journal_mode=WAL');
  db.pragma('foreign_keys=ON');
  require('./schema')(db);
  return db;
}

function get(){return db||initDb()}
function getPath(){return dbPath}
module.exports={initDb,get,getPath};