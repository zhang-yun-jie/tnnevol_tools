!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("path")):"function"==typeof define&&define.amd?define(["path"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).path)}(this,(function(e){"use strict";const{AES_encrypt:t}=require("../utils/aes.crypto"),o={description:"alioss 加密",async apply(){const o=e.resolve(process.cwd(),"alioss.config.js"),i=require(o),n=require("inquirer"),{content:s}=await n.prompt([{type:"input",name:"content",message:"请输入需要加密的字符"}]);console.log("已加密：",t(s,i.key,i.iv))}};module.exports=o}));
