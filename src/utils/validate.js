
/* 合法电话号码 */
export function isvalidPhone(str) {
  const urlregex = /^1[0-9]{10}$/
  return urlregex.test(str)
}

/* 合法密码 */
export function isvalidPassword(str) {
  const urlregex = /^(\w){6,20}$/
  return urlregex.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function phoneValidator(rule, value, callback) {
  if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

export function nameValidator(rule, value, callback) {
  if (value.length < 2) {
    callback(new Error('用户名至少2个字符'))
  } else {
    callback()
  }
}

export function passwordValidator(rule, value, callback) {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}


export function titleValidator(rule, value, callback) {
  if (value.length < 2 || value.length > 16) {
    callback(new Error('请输入2-16个字'))
  } else {
    callback()
  }
}


export function descriptionValidator(rule, value, callback) {
  if (value.length < 8 || value.length > 255) {
    callback(new Error('请输入8-255个字'))
  } else {
    callback()
  }
}

export function idValidator(rule, value, callback) {
  if (Number.isInteger(value)) {
    callback(new Error('请输入数字ID'))
  } else {
    callback()
  }
}

export function hostnameValidator(rule, value, callback) {
  if (value.length > 0 && value.length < 60) {
    callback()
  } else {
    callback(new Error('服务器地址为必填'))
  }
}
