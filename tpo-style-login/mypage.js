//サインアウトの関数
function signOut_mypage() {
    firebase.auth().onAuthStateChanged(user => {
    firebase
        .auth()
        .signOut()
        .then(() => {
        console.log('ログアウトしました');
        location='login.html';
        })
        .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    });
}

//入力フォームに入れた内容を反映する
function redata(){
    let user=firebase.auth().currentUser;
    if(user){
        let gen=document.getElementById("gend");
        let toshi=document.getElementById("toshi");
        let com=document.getElementById("comm");
        let nam=document.getElementById("name");
        let db=firebase.database();
        
        db.ref("users/"+user.uid).update({
            gender: gen.value,
            age: toshi.value,
            comment: com.value,
            displayName: nam.value
        });

    }else{
        console.log("おかしい");
        location="mypage.html";
    }


    console.log("更新したよ");
    location='mypage.html';
}





//プロフィール更新の画面
function btnPush(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){

        var btnpushMessage =`
            <h2>プロフィール登録<\/h2>
            <img src="${user.photoURL}" alt="画像"　title="ユーザー画像" align="left">　ユーザー名：<input id="name" placeholder="${user.displayName}">　<br>　
            性別：<select id="gend"> <option value="未設定">未設定<\/option> <option value="男性">男性<\/option> <option value="女性">女性<\/option> <option value="その他">その他<\/option><\/select><br>　
            年齢：<span id="toshi"><input type="number" id="toshi" required ><\/input><\/span> <br clear="all"> <\/img>
            <form action="comm"><textarea id="comm" rows="4" cols="40" wrap="hard">${user.comment}<\/textarea><\/form>
            <button class="btn btn-primary" type="submit"  onClick="redata() ;document.location='mypage.html'">入力内容の更新<\/button>
            `;
        document.getElementById('message').innerHTML =  btnpushMessage;
        }else{
            console.log("わーい");
        }
    });
}



//本編

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("current user: " + user.displayName);
        //マイページ表紙
        
        const ProfileMessage = `
            <h2>マイページ<\/h2>
            <img src="${user.photoURL}" alt="画像"　title="ユーザー画像" align="left">　ユーザー名：<span id="name"><\/span> <br>　性別：<span id="gend"> <\/span>　<br>　年齢：<span id="age"><\/span> <br clear="all"> <\/img>       
            メッセージ：
            <span id="comm"><\/span>
            <br>
            <button class="btn btn-primary" type="submit"  onClick="signOut_mypage()">サインアウト<\/button>
            <button class="btn btn-primary" type="submit"  onClick="document.location='post.html';">投稿ページへ<\/button>
            <button class="btn btn-primary" type="submit"  onClick="btnPush()">プロフィール登録<\/button>
            `;
        
        //databaseから取得
        //ユーザー名が登録されていない場合に登録画面へ飛ぶ    
        let gendata = firebase.database().ref('users/'+user.uid+'/gender')
        gendata.on('value', function(snapshot) {
            document.getElementById('gend').innerHTML = snapshot.val() ; // 取得した際の処理
        });
        let agedata = firebase.database().ref('users/'+user.uid+'/age')
        agedata.on('value', function(snapshot) {
            document.getElementById('age').innerHTML = snapshot.val() ;  //取得した際の処理
        });
        let commdata = firebase.database().ref('users/'+user.uid+'/comment')
        commdata.on('value', function(snapshot) {
            document.getElementById('comm').innerHTML = snapshot.val() ; // 取得した際の処理
        });
        let namdata = firebase.database().ref('users/'+user.uid+'/displayName')
        namdata.on('value', function(snapshot) {
            document.getElementById('name').innerHTML = snapshot.val() ; // 取得した際の処理
            if(!snapshot.val()){
                btnPush();
                alert("プロフィールを登録して下さい");
                console.log("チェック済み");
            }

        });    

        document.getElementById('message').innerHTML =  ProfileMessage;
        console.log('ログインしています');
        console.log("current user: " + user.uid);
    
    }
  });


