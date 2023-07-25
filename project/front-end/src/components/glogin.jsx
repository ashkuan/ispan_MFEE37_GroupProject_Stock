import {GoogleLogin} from 'react-google-login';


const clientId = "604786847308-qoj7mq9u9j3spdt0kbl0u1flgoe509p6.apps.googleusercontent.com"

function Glogin(){

  const onSuccess = (res) => {
    const { name, email } = res.profileObj;
  
    // 將 name 和 email 資料送到後端
    fetch('http://localhost:3000/api/saveUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => {
      // 在這裡處理後端返回的回應
      console.log('後端返回的回應:', data);
      alert('註冊成功')
      window.location.href = '/loginpage';
    })
    .catch(error => {
      // 處理錯誤
      console.error('請求發送失敗:', error);
    });
  };

  const onFailure = (res) =>{
    console.log("Login Failed! res: ", res)
  };

  return(
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
        
      />
    </div>
  );
}

export default Glogin;