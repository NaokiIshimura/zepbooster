var type = "";

function convertStyleCss(){

  type = getConvertType();
  console.log("convert type : " + type);

  var resultText = "";

  // ??pxを ?? / xx * 100vw に置換する
  var str = document.getElementById('styleCssInput').value;
  var result = str.match(/\d+px/g);
  var resultText = str;

  if(result != null){
    for (var index = 0; index < result.length; index++)
    {
      //console.log("submatch " + index + ": " +  result[index]);
      replaceText = getReplaceText(type,result[index])
      resultText = resultText.replace(result[index], replaceText);
    }
  }

  // marginを追加する
  resultText = addMargin(resultText);

  // テンプレートを追加する
  resultText = addTemplate(resultText);

  // 変換後のテキストをテキストエリアに表示する
  document.getElementById('styleCssOutput').value = resultText;

}

function copyStyleCss(){
  // コピー対象をJavaScript上で変数として定義する
  var copyTarget = document.getElementById('styleCssOutput');
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

// 変換タイプを取得する
function getConvertType(){
  var elements = document.getElementsByName("q1");
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].checked){
      return elements[i].value;
    }
  }
  return null;
}

function getReplaceText(type, basePx){

  var replaceText = "";

  switch (type){
    case "absolute":
    var baseWidth = document.getElementById('baseWidth').value;
    replaceText = 'calc( '+basePx.replace('px','')+' / '+baseWidth+' * 100vw )'
    break;
    case "magnification":
    var baseMagnification = document.getElementById('baseMagnification').value;
    replaceText = "calc( " + basePx.replace('px','') + " * " + baseMagnification + " )";
    break;
    case "relative":
    var baseRelativeValue = document.getElementById('baseRelativeValue').value;
    var baseRelativeBase  = document.getElementById('baseRelativeBase').value;
    var replacePx = "( "+baseRelativeValue + " / " + baseRelativeBase +" )";
    replaceText = "calc( " + basePx.replace('px','') + " * " + replacePx + " )";
    break;
  }

  return replaceText;

}

function addMargin(resultText){

  margin = new Array(4);
  margin[0] = document.getElementById('margin1').value;
  margin[1] = document.getElementById('margin2').value;
  margin[2] = document.getElementById('margin3').value;
  margin[3] = document.getElementById('margin4').value;

  replaceText = '';

  for (var i = 0; i < margin.length; i++) {

    if (i != 0 && margin[i] != ""){
      replaceText += " "
    }

    if(margin[i] != ""){
      replaceText += getReplaceText(type, margin[i]);
    }
  }

  // marginの指定値が全てからだった場合は「0px」を挿入する
  if(replaceText == ""){
    replaceText = "0px";
  }

  replaceText = '  \n' + '  margin: ' + replaceText
  replaceText += ";";
  replaceText += '}'

  resultText = resultText.replace('}', replaceText);

  return resultText;
}

function addTemplate(resultText){
  // テンプレートを追加する
  replaceText  = '  \n'
  //replaceText += '  margin-top: 0;\n'
  //replaceText += '  margin-bottom: 0;\n'
  //replaceText += '  margin-left: 0;\n'
  //replaceText += '  margin-right: 0;\n'
  //replaceText += '  /*margin: 0 0;*/\n'
  replaceText += '  \n'
  replaceText += '  /*\n'
  replaceText += '  text-align: left;\n'
  replaceText += '  text-align: right;\n'
  replaceText += '  text-align: center;\n'
  replaceText += '  */\n'
  replaceText += '}'
  resultText = resultText.replace('}', replaceText);

  return resultText;
}
