import './index.css'
import './index1.less'
import icon from '../icon/abc.ico'
import {demo,sub} from './demo'

console.log('index.js被加载了----->');

demo();

const path = require('path');
console.log(path.resolve(__dirname,'./dist'))
console.log(path.resolve(__filename,'dist'))
const add =(a,b)=>a+b

const p = new Promise((resolve)=>{
    setInterval(()=>{
        resolve(44444);
    },1000)
})
p.then((data)=>{
    console.log(data);
})

