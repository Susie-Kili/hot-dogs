//googleアカウントでの認証

const provider = new firebase.auth.GoogleAuthProvider();
//サインインの関数
function signIn() {
firebase.auth().signInWithPopup(provider)
    .then((result) => {
        console.log({ result });
        updateUserinfo(result.user);
    }).catch(error => {
        const signinError = `
        サインインエラー
        エラーメッセージ： ${error.message}
        エラーコード: ${error.code}
        `
    　　　console.log(signinError);
    });
}
//サインアウトの関数
function signOut() {
firebase.auth().onAuthStateChanged(user => {
firebase
    .auth()
    .signOut()
    .then(() => {
    console.log('ログアウトしました');
    location.reload();
    })
    .catch((error) => {
    console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
});
}

function updateUserinfo(user) {
    const userDb = firebase.database().ref("users/" + user.uid);

    userDb.update({
        uid: user.uid,
        //displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email/*,
        gender: user.gender,
        age: user.age,
        comment: user.comment*/
    });
}


//ここから本編

firebase.auth().onAuthStateChanged(user => {
  
if (user) {
    const signOutMessage = `
    <h2>ログインページ<\/h2>
    <p>Hello, ${user.displayName}!<\/p>
    <button class="btn btn-primary" type="submit"  onClick="signOut()">サインアウト<\/button>
    <button class="btn btn-primary" type="submit"  onClick="document.location='post.html';">投稿ページへ<\/button>
    <button class="btn btn-primary" type="submit"  onClick="document.location='mypage.html';">マイページへ<\/button>
    `;

    document.getElementById('message').innerHTML =  signOutMessage;
    console.log('ログインしています');

} else {
       
        const signInMessage = `
        <h2>ログインページ<\/h2>
        <button class="btn btn-outline-primary" type="submit"  onClick="signIn()" >googleでサインイン<\/button>
        `;
        document.getElementById('message').innerHTML = signInMessage;   
        
    }
});







//ユーザー情報の永続性
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
.then(function() {
  // In memory persistence will be applied to the signed in Google user
  // even though the persistence was set to 'none' and a page redirect
  // occurred.
  //return firebase.auth().signInWithRedirect(provider);
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});
