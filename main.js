var dref = 1425044468643;

module.exports = function(n1,n2,decimals){
	var num;
  
	if(n2 == undefined){
		if(n1 > 0){
			n2 = n1;
			n1 = 0;
		}else n2 = 0;
	}else if(typeof n2 == 'boolean'){
		decimals = n2;
		if(n1 > 0){
			n2 = n1;
			n1 = 0;
		}else n2 = 0;
	}
	
	num = n1 + Math.random() * (n2 - n1);
	
	if(!decimals) num = Math.floor(num);
	
	return num;
}

function getLetter(n){
  if(n < 36) return n.toString(36);
  if(n < 62) return (n - 26).toString(36).toUpperCase();
  
  switch(n){
    case 62: return '_';
    case 63: return '-';
    case 64: return '+';
    case 65: return ',';
    case 66: return '.';
    case 67: return '<';
    case 68: return '>';
    case 69: return '=';
    case 70: return '!';
    case 71: return '#';
    case 72: return '@';
    case 73: return '?';
    case 74: return '/';
    case 75: return '&';
    case 76: return '%';
    case 77: return '$';
    case 78: return '*';
    case 79: return ':';
    case 80: return ';';
    case 81: return '"';
    case 82: return "'";
    case 83: return '(';
    case 84: return ')';
    case 85: return '[';
    case 86: return ']';
    case 87: return '\\';
    case 88: return '^';
    case 89: return '`';
    case 90: return '{';
    case 91: return '}';
    case 92: return '|';
    case 93: return '~';
  }
}

function getRandBase(b,n,max){
  var result,mod;
  
  n = (n != null)?n:Math.floor(Math.random() * 1e15);
  if(!n) return '0';
  
  if(b > 36){
    
    result = '';
    while(n > 0){
      mod = n % b;
      n = Math.floor(n / b);
      result = getLetter(mod) + result;
      if(result.length == max) return result;
    }
    
  }else result = n.toString(b);
  
  if(max) return result.substring(0,max)
  
  return result;
}

module.exports.string = function(n,base,useDate){
	var str = '';
	
  if(n == null) n = 10;
  
  if(typeof base != 'number'){
    useDate = base;
    base = 36;
  }
  
	if(useDate){
		str += getRandBase(base,Date.now() - dref);
		str = str.substring(Math.max(str.length - n,0));
	}
	
	while(str.length < n) str += getRandBase(base,null,n - str.length);
	
	return str;
};

var counter = -1;
module.exports.unique = function(n){
  counter = (counter + 1)%1e15;
  
  return getRandBase(62,counter) + '-' + getRandBase(62,Date.now() - dref) + '-' + module.exports.string(n || 5,62);
};

if(global.Symbol){
  module.exports.Su = function(){ return Symbol(); };
  module.exports.Su.define = function(obj,su,value){ obj[su] = value; };
}else{
  module.exports.Su = function(){ return module.exports.unique(); };
  module.exports.Su.define = function(obj,su,value){
    Object.defineProperty(obj,su,{
      value: value,
      writable: true,
      configurable: true
    });
  };
}
