function convertStyleCss(){
  baseWidth = document.getElementById('baseWidth').value;

  // ??pxを ?? / xx * 100vw に置換する
  str = document.getElementById('styleCssInput').value;

  result = str.match(/\d+px/g);
  resultText = str;

  if(result != null){
    for (var index = 0; index < result.length; index++)
    {
      //console.log("submatch " + index + ": " +  result[index]);
      replaceText = 'calc('+result[index].replace('px','')+' / '+baseWidth+' * 100vw)'
      resultText = resultText.replace(result[index], replaceText);
    }
  }

  // ??pxを xx倍にする
  str = document.getElementById('styleCssInput').value;

  result = str.match(/\d+px/g);
  resultText = str;

  if(result != null){
    for (var index = 0; index < result.length; index++)
    {
      //console.log("submatch " + index + ": " +  result[index]);
      replaceText = 'calc('+result[index].replace('px','')+' / '+baseWidth+' * 100vw)'
      resultText = resultText.replace(result[index], replaceText);
    }
  }

  // テンプレートを追加する
  replaceText  = '  \n'
  replaceText += '  margin-top: 0;\n'
  replaceText += '  margin-bottom: 0;\n'
  replaceText += '  margin-left: 0;\n'
  replaceText += '  margin-right: 0;\n'
  replaceText += '  /*margin: 0 0;*/\n'
  replaceText += '  \n'
  replaceText += '  /*\n'
  replaceText += '  text-align: left;\n'
  replaceText += '  text-align: right;\n'
  replaceText += '  text-align: center;\n'
  replaceText += '  */\n'
  replaceText += '}'
  resultText = resultText.replace('}', replaceText);

  // 変換後のテキストをテキストエリアに表示する
  document.getElementById('styleCssOutput').value = resultText;

}

function copyStyleCss(){
   // コピー対象をJavaScript上で変数として定義する
  copyTarget = document.getElementById('styleCssOutput');
  // コピー対象のテキストを選択する
  copyTarget.select();
  // 選択しているテキストをクリップボードにコピーする
  document.execCommand("Copy");
}

function convertAndCopyStyleCss(){
  convertStyleCss();
  copyStyleCss();
}

function convertImageHtml(){

}
