function clean(v,min=1,max=2000){if(typeof v!=='string')return '';const s=v.trim().slice(0,max);return s.length>=min?s:''}
function isEmail(v){return typeof v==='string'&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)}
function isUsername(v){return typeof v==='string'&&/^[A-Za-z0-9_]{3,24}$/.test(v)}
function isPassword(v){return typeof v==='string'&&v.length>=8&&v.length<=128}
module.exports={clean,isEmail,isUsername,isPassword};
