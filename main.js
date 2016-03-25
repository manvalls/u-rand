var counter = -1,
    alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-+,.<>=!#@?/&%$*:;"\'()[]\\^`{}|~',

    seed = Symbol(),
    inc = Symbol();

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

function getNumBase(b,n){
  var result,mod;

  if(!n) return '0';
  if(b > 36){

    result = '';
    while(n > 0){
      mod = n % b;
      n = Math.floor(n / b);
      result = alphabet[mod % alphabet.length] + result;
    }

  }else result = n.toString(b);

  return result;
}

module.exports.string = function(n,base,useDate){
	var str = '';

  if(n == null) n = 10;

  if(typeof base != 'number'){
    useDate = base;
    base = 62;
  }

	if(useDate){
		str += getRandBase(base,Date.now(),5);
		str = str.substring(Math.max(str.length - n,0));
	}

	while(str.length < n) str += alphabet[Math.floor(Math.random() * base) % alphabet.length];
	return str;
};

module.exports.unique = function(n){
  counter = (counter + 1)%1e15;

  return 'u' + getNumBase(62,counter) + '-' + getNumBase(62,Date.now(),5) + '-' + module.exports.string(n || 5,62);
};

module.exports.generator = function(s){
  var ret = {};

  ret[seed] = Math.abs(typeof s == 'number' ? s : Date.now());
  ret[inc] = ((ret[seed] + 1) * 2 + ret[seed]) % 1e3;
  ret.next = next;

  return ret;
};

function next(){
  var x;

  x = Math.sin(this[seed] = (this[seed] + this[inc])%1e15) * 1e6;
  return {value: x - Math.floor(x)};
};
