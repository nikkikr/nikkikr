var fingerprint;
var hitList = ['449139314','3823592695','3471182975','3404505251'];
var pt=new RegExp('[^a-zA-Z0-9\_\u4e00-\u9fa5\-\路]','i'); 

window.onload=function(){
	fingerprint = new Fingerprint().get();
	$('#finger_sign')[0].value = fingerprint;
	$('#finger_sign2')[0].value = fingerprint;

}

function toValid(){
	var clothname = document.getElementById("clothname").value;
	if(clothname == null || clothname.trim() == ''|| pt.test(clothname)){
	    	alert('Error锛氳緭鍏ヤ笉瑙勮寖锛�');
	    	return false;
	}
	return true;
	 
}

function getClothPic(cloth){
	if(hitList.indexOf(fingerprint)>-1)
		alert('鎶辨瓑锛屾偍宸茶鍔犲叆榛戝悕鍗�');
	else{
	    if(cloth == null || cloth.trim() == ''|| pt.test(cloth))
	    	alert('error');
	    else{
		    $.get('/wardrobe/'+cloth+'/'+fingerprint,function(res,status){
		    	if(res == 'error')
		   		  alert('error');
		   	  	else{
		   		  $("#pic")[0].src = res['pic_url']; 
		   		  $("#icon")[0].src = res['icon_url']==null?'':res['icon_url']; 
		   		  $("#icon")[0].hidden = res['icon_url'] == null;
		   		  $("#iconTip")[0].textContent = res['icon_url'] == null?'鏆傛棤灏忓浘鏁版嵁':'';
		   	  }
		    })
	    }
	}
}   

function uploadPic() {
	if(hitList.indexOf(fingerprint)>-1 )
		alert('鎶辨瓑锛屾偍宸茶鍔犲叆榛戝悕鍗�');
	else{
	  var uploadFormDom = $('#upload-file-form');
	  var uploadInputDom = uploadFormDom.find('input[type=file]');
	  var files = uploadInputDom[0].files;
	  var formData = new FormData(uploadFormDom[0]);
	  formData.append('finger_sign',fingerprint);
	  $.ajax({
	      url: '/imports/pic/',
	      method: 'post',
	      data: formData,
	      processData: false,
	      contentType: false,
	      success:function(res,status){
	    	  alert(status=='success'?'鍥剧墖宸叉彁浜ゆ垚鍔焴鎰熻阿=3=':'鍥剧墖鎻愪氦澶辫触鍟�(锛烇箯锛�)');
	      }
	   });
	}
}



/*style js*/
function showFeedback(fb_flag,pu_flag){	
	$("#feedback")[0].hidden = !(fb_flag&!pu_flag) ;//false,false  false,true
	$("#authorNote")[0].hidden = !(!fb_flag&!pu_flag);//true,false true,true
	$("#picUpload")[0].hidden = !pu_flag;
}

function showPicUpload(){
	$("#feedback")[0].hidden = false;
	$("#authorNote")[0].hidden = false;
	$("#picUpload")[0].hidden = true;
	
}


function changeMode(li) {
	if (li.classList.contains('active'))
        return;
    var parent = li.parentNode, innerTabs = parent.querySelectorAll('li');
    for (var index = 0, iLen = innerTabs.length; index < iLen; index++) {

        innerTabs[index].classList.remove('active');
    }
    li.classList.add('active');
    $("#picMode")[0].hidden = (li.id == 'iconLi');
    $("#iconMode")[0].hidden = !(li.id == 'iconLi');
    
}


