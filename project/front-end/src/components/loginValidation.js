function Validation(values){
  let error={}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  if(values.email===''){
    error.email = '信箱不可為空'
  }else if(!email_pattern.test(values.email)){
    error.email = '信箱不匹配'
  }else{
    error.email = ''
  }
  if(values.password===''){
    error.password = '密碼不可為空'
  }else if(!password_pattern.test(values.password)){
    error.password = '密碼不匹配'
  }else{
    error.password = ''
  }
  return error;
}

export default Validation;