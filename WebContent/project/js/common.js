$(function(){
/*
 주제 : Show & Hide 로그인폼 만들기
 
 - 화면상단에 [로그인]버튼을 눌렀을때, 화면 상단 바깥에 숨겨져 있던
      로그인 폼이 위에서 내려와 화면에 나타나도록 만들자.

 - 그리고 로그인 폼에 [close(닫기)]버튼을 눌렀을때는 
      폼이 다시 화면 상단 바깥으로 이동되어 숨겨지도록 만들자.
 
 - 또한 로그인 폼의 아이디 및 비밀번호 입력 요소에 안내가이드도 만들자
*/ 

//class="login_wrap"인 <li>부모요소의 직전 자식 <a>요소를 선택해서 click이벤트 등록
//직전자식선택자 >, " "은 하위요소 전체 데려옴
$(".login_wrap>a").on("click", () => {
	
	//로그인시 아이디와 비밀번호를 입력할 수 있는 <form>요소 영역 전체를 선택해서
	//id=login_f인 <form></form>요소 영역 전체 한쌍을 선택해서
	$("#login_f").animate({top:"20px"}, 500);
	
	return false; //<a>태그의 href속성의 주소로 이동되는 기본이벤트 차단
	
});


//로그인버튼, close버튼 클릭시 이벤트 등록
$(".login_wrap .login_close_btn>a,input[alt='로그인버튼']").on("click", () => {
	
	//버튼 클릭시 <form>요소가 위로 올라가도록 설정
	$("#login_f").animate({top:"-500px"}, 500);
	
	return false; //<a>태그인 로그인 버튼의 href 기본이벤트 차단
	
});


/*
//아이디, 비밀번호를 입력할 수 있는 <input>요소 2개를 다중 선택해서 focus이벤트 등록
$("#user_id,#user_pw").on("focus", function(){
	
	//focus이벤트가 발생한 두 input요소 중 하나의 요소 선택
	//$(this).prev() -> focus가 발생한 input요소의 이전에 작성된 <label>요소 최종 선택
	//css("left", "-9999px") -> 홈페이지 영역에서 안 보이도록 설정
	$(this).prev().css("left", "-9999px");
	
});


//아이디, 비밀번호를 입력할 수 있는 <input>요소 2개를 다중 선택해서 blur이벤트 등록
$("#user_id,#user_pw").on("blur", function(){
	
	//두 요소 중 포커스를 잃은 이벤트가 발생한 <input>요소를 선택해서
	//만약 입력한 값이 없다면?
	if( $(this).val() === "" ){
		
		//힌트이미지영역이 다시 보이도록 설정
		$(this).prev().css("left", "2px");
		
	}	
	
});
*/

//위 주석 이벤트를 한번에 등록
$("#user_id,#user_pw").on({
	
	focus : function(){
		$(this).prev().css("left", "-9999px"); },
		
	blur : function(){
		if( $(this).val() === "" )
			$(this).prev().css("left", "2px"); }
		
});
	
//-----------------------------------------------------------------------------------------------------

/*
 주제 :  ZOOM 버튼 만들기
 [+]를 클릭하면 화면이 확대 되고,
 [-]를 클릭하면 화면이 축소 됩니다.
  그리고 [100]을 눌렀을때는 원래 100%사이즈로 되돌리도록 만들기
 
 참고 : zoom 버튼을 클릭 했을때 화면 확대/축소를 적용하기 위해서는 
 	  CSS속성중에 zoom속성과 transform의 scale속성 사용법을 잘 알고 있어야 합니다.
 		
 		이때 웹브라우저 마다 CSS속성이 모두 정상적으로 작동하지 않으므로 구분해서 사용 해야 하는데,
 		zoom속성의 경우에는 현재 파이어폭스를 제외한 모든 브라우저에서 지원하고 있습니다.
 		
 		그리고 transform의 scale속성은 현재 IE8 이하를 제외한 모든 브라우저에서 지원 하고 있습니다.
 
 		1.제이쿼리의 zoom속성 사용법
 			문법-> $(요소선택).css("zoom", "확대비율%");
 			
 			예-> $("body").css("zoom","200%");
 			 	//<body>영역의 모든 태그요소가 2배로 확대 됩니다.
 		
 		2.제이쿼리의 transform의 scale함수 사용법	 	
 			문법-> $(요소선택).css("transform","scale(확대비율)")
 			
 			예-> $("body").css("transform","scale(2)")
 				//화면에서 <body>영역의 모든 태그요소가 2배로 확대 됩니다.
 				
 			참고 : transform의 scale함수를 이용해 보면 확대 기준점이 가운데로 지정되어 있어 사방으로 퍼져 확대됨.
 			           확대 기준점을 바꾸고 싶으면 CSS에 transform-origin속성을 사용 하면됨.
 		
 		3.제이쿼리의 transform-origin속성 사용법
 			문법-> $(요소선택).css("transform-origin","x축 위칫값 y축 위칫값")
 			
 			예-> $("body").css("transform-origin","0 0");
 				//<body>영역의 확대 기준점이 "0 0" 으로 설정되어  
 				//(0,0)위치에서 x축 과 y축 방향으로 확대됨
 
 */  
  
/* zoom 버튼 */

//확대 비율 초기값 변수에 저장
let base = 100;

//<body>전체 요소 영역을 선택해서 변수에 저장해놓고 재활용 하자
let mybody = $("body");

//id="zoom"인 부모 <ul>요소 내부에 만들어져 있는 하위 <a>모두를 선택해서 배열로 가져와 클릭이벤트 등록
$("#zoom a").on("click", function(){
	
	// + 100 - <a>태그들 중에서 click이벤트가 발생한 <a>의 index위치번호를 얻자
	let zNum = $("#zoom a").index(this);
	
	if(zNum === 0){ //index 위치번호가 0일 때 + <a>를 클릭했다면?
				
		base += 10; //확대값 10을 누적해서 증가시키자
		
	}else if(zNum === 1){ //index 위치번호가 1일 때 100 <a>를 클릭했다면?
		
		base = 100; //정사이즈로 재설정
		
	}else{//index 위치번호가 2일 때 - <a>를 클릭했다면?
		
		base -= 10; //축소값 10을 누적해서 감소시키자
		
	}
	
	//body태그 전체화면 영역을 저장한 mybody 변수를 불러와서
	mybody
	//overflow-x속성을 적용하면 IE 8버전 이하에서 정상적으로 작동되도록 설정
	.css("overflow-x", "auto")
	//확대 기준점을 x축과 y축의 좌표를 0, 0으로 설정하여 해당 축 방향으로 확대되도록 설정
	.css("transform-origin", "0 0")
	//전체 body태그 영역화면에 포함된 자식요소들 영역들이 base/100의 값만큼 확대되도록 설정
	.css("transform", "scale("+ base/100 +")")
	//전체 body태그 영역의 모든 태그가 base의 값 % 만큼 확대/축소됩니다.
	.css("zoom", base+"%");
	
	return false; //<a>태그의 기본이벤트 차단
	
});

 
//-----------------------------------------------------------------------------------------------------

  
  /*
   	주제 : 인쇄 버튼 만들기 
   	인쇄 버튼 웹사이트에서 인쇄 버튼을 방문자가 클릭했을때.. 
        인쇄창을 뛰우는 방법을 알아 봅시다.
   */
	//인쇄버튼 <img>영역을 감싸고 있는 <a>를 선택해서 click이벤트 등록
	$(".print_btn").click(function(event){
		
		event.preventDefault(); //<a>태그의 기본이벤트 차단. <- 이 구문은 첫번째 줄에 적어주어야 함
		
		window.print();
		
	});
 
	
//-----------------------------------------------------------------------------------------------------

  /*
   주제 : 검색 창 안내 가이드 만들기
   검색 입력 요소에 마우스로 클릭해 포커스가 이동되면 
   안내 가이드 변경 이미지가 사라지고,
   포커스가 다른 요소로 이동되었을때 검색 입력 요소에 아무 내용이 없으면
   다시 안내가이드 배경 이미지가 다시 나타나게 하기 
   */

  /*검색 창 안내 가이드*/
	$("#keyword").on({
		
		focus : function(){
			$(this).css("background-position", "0 -500px");},
			
		blur : function(){
			if( $(this).val() === "" ) //검색창에 입력하지않았다면?
				$(this).css("background-position", "0 0");}
		
	});
 
  
//-----------------------------------------------------------------------------------------------------
  
 /*
  주제 : GNB(글로벌 네비게이션 바) 메뉴 만들기
  사이트의 모든 페이지에 노출되는 메뉴를 가리키며,
  보통 사이트 상단에 위치합니다.
  GNB상위 메뉴에 마우스가 올라갔을때, 
  해당 상위 메뉴 이미지는 활성화(컬러)된 이미지로 바뀌게 됨.
  이어서 마우스를 다른 상위메뉴로 이동하면,
  앞서 활성화된 상위 메뉴 이미지는 다시 비활성화(무채도)된 이미지로 바뀌고,
  현재 마우스가 올라간 상위 메뉴의 이미지는 활성화된 이미지로 바뀌도록 만들자 
  */ 
  /*GNB 메뉴*/

//마우스 포인터가 올라가는 상위 메뉴 <a>를 저장시킬 전역 변수 만들기
var beforeEl;


//네비게이션바에 마우스를 올리거나 포커스가 가해졌을 때 서브메뉴 펼치기
$("#gnb>li>a").on("mouseover focus", function(){
	
	//만일 펼쳐져있는(visible) 서브 메뉴 영역이 있으면 선택해서 가져와
	//위로 접으면서 숨기는 효과를 주기위해 slideUp()메소드 사용
	$("#gnb ul:visible").slideUp("fast");
	
	//상위 메뉴 영역<a>들 중에서
	//하나의 <a>메뉴 영역에 마우스 포인터를 올리거나 포커스가 생성되면
	//1. 상위 메뉴 <a>영역에 작성된 <img>태그를 선택해 src속성에 설정된 이미지 경로 주소값을 노란색 이미지가 되도록 변경
	//마우스포인터가 올라간 <a>내부에 만들어진 <img>태그의 src속성의 주소를 얻어 낸다.
	var imgSrc = $("img", this).attr("src");
	
	var newSrc = imgSrc.replace("out.gif", "over.gif"); //데이터 치환
	$("img", this).attr("src", newSrc); //글씨가 노란색인 이미지로 변경
	
	//2. 마우스 포인터를 올리거나 포커스가 생성된 <a>요소의 서브메뉴영역 <ul>영역을 
	//1초만에 아래로 펼쳐지며 노출되게 효과 메소드 중에서 slidDown()메소드 사용
	$(this).next().stop().slideDown("nomal"); //사용자가 이벤트 남발을 할 수 있기때문에, 한번 멈추게 적용(stop)
	
	//상위 <a>메뉴들 중에서 현재 마우스 포인터를 올라가 있거나 포커스가 생성된 <a>요소를 선택해서
	//beforeEl변수에 저장
	beforeEl = $(this);
	
});


//마우스 포인터가 완전히 벗어났을 때의 mouseleave이벤트 등록
$("#gnb>li").on("mouseleave", function(){
	
	//만일 펼쳐져 있는 서브메뉴영역 안쪽<li>4쌍 중 하나가 있으면? slideUp()효과 메소드로
	//1초만에 위로 접으면서 숨기는 효과를 주자
	$("#gnb ul:visible").slideUp("fast");
	
	//만일 마우스포인트가 올라가 있거나 포커스가 생성되어 있었던 <a>요소가 존재하면?
	if(beforeEl){
		
		//글자가 노란 이미지를 하얀색 이미지로 변경
		beforeEl.children("img").attr("src", beforeEl
											.children("img")
											.attr("src")
											.replace("over.gif", "out.gif") );
		
	}
	
});

//-----------------------------------------------------------------------------------------------------
  /*
   주제: 슬라이드 전체 메뉴 만들기
   - 전체 메뉴를 클릭 했을 때 전체메뉴가 slide효과로 펼쳐지고
          전체 메뉴 버튼 이미지도 바뀌도록 만들어 보자
   - [전체메뉴]버튼을 다시 클릭 했을때 전체 메뉴가 위로 접히면서 숨겨지게 할 수도 있고,
     [CLOSE]버튼을 클릭했을때는 다시 전체메뉴가 위로 접히면서 사라지게도 할 수 있다. 
   */

//전체 메뉴 이미지 링크에 click이벤트 등록
$("#total_btn>a").click(function(){
	
	//서브메뉴영역 요소 전체를 가져와 
	//숨겨져 있으면 아래로 펼쳐지며 노출되게 하고
	//노출되어 있으면 위로 접으면서 숨겨지게 하기위해 slideToogle메소드 사용
	$("#total_menu").slideToggle("nomal");
	
	//만약 클릭이벤트가 발생한 <a>의 하위 자식<img>선택해	
	if( $("img", this).attr("src") == "images/allmenu_btn_out.gif" ){//<img>가 '전체메뉴▼' 라면?
		
		$("img", this).attr("src", "images/allmenu_btn_over.gif");//<img>를 '전체메뉴▲'로 바꾸자
		
	}else{ //'전체메뉴▲' 이미지이면?
		
		$("img", this).attr("src", "images/allmenu_btn_out.gif"); //'전체메뉴▼'로 바꾸자
		
	}
	
	return false; //<a>태그 기본이벤트 차단
	
});
   

//전체메뉴 닫기 CLOSE 버튼 처리
//CLOSE <a>요소를 선택해 click이벤트 등록
$("#total_close>a").click(function(event){
	
	//<a>태그 기본이벤트 차단
	event.preventDefault(); //첫 줄 작성
	
	//서브메뉴영역을 노출되어있으면 위로 접으면서 0.5초만에 숨기자.
	$("#total_menu").slideUp(500);
	
	//화살표 방향이 전체메뉴 ▼  이미지 경로로 변경
    $("#total_btn>a>img").attr("src","images/allmenu_btn_out.gif"); 
	
});



//-----------------------------------------------------------------------------------------------------

  /*
    주제 :  현재 날짜 표기 하기
    사이트 헤더 영역에  현재 연도, 월, 일을 표기 합니다.
  Date객체를 사용하여 오늘의 날짜 정보를 구해 올것입니다.
  */

//날짜표기
let date = new Date(); //Javascript의 Date객체는 현재 날짜와 시간을 기준으로하는 정보를 제공하는 객체
 
//초 단위로 Date객체의 시간값을 밀리초 값으로 구해서 변수에 저장
let initalTime = date.getTime(); //현재 시간을 기준으로 한 타임스탬프를 저장

//경과된 시간을 밀리초 단위로 저장할 변수
let elapsedTime = 0;

window.setInterval(function(){
	
	//매 1초마다 elapsedTime변수에 1000을 더하여 경과시간을 누적
	elapsedTime += 1000; //1초 결과 시간을 변수에 누적
	
	//setTime()메소드를 사용해 date객체의 시간을 업데이트합니다.
	//초기시간(initalTime)에 경과 시간을 더해 새로운 시간을 설정합니다.
	//이렇게 하면 항상 현재 시간에 맞춰 업데이트됩니다.
	date.setTime( initalTime + elapsedTime );
	
	$("#date_wrap .year").text( date.getFullYear() ); //현재 년도 정보 넣기
	$("#date_wrap .month").text( date.getMonth() + 1 ); //현재 월 정보 넣기
	$("#date_wrap .date").text( date.getDate() ); //현재 일 정보 넣기
	$("#date_wrap .hour").text( date.getHours() ); //현재 시 정보 넣기
	$("#date_wrap .minute").text( date.getMinutes() ); //현재 분 정보 넣기
	$("#date_wrap .second").text( date.getSeconds() ); //현재 초 정보 넣기
	
}, 1000); //window생략가능
 

//-----------------------------------------------------------------------------------------------------

/*
   주제 : 관련 사이트 이동 선택 상자 만들기
   - 푸터 영역에는 관련 사이트 이동 선택 상자가 있습니다.
  	  사이트에 방문객체 관련 사이트를 선택한 후 
     [이동]버튼을 클릭하였을 때 새창으로 선택한 사이트가 열리도록 할것입니다.
   	  여기서는 [이동] 버튼을 클릭했을때 
     <form>태그에서 전송이 일어나므로 submit 이벤트를 적용 하겠습니다.
  	  이벤트가 발생 했을 때 이벤트 핸들러에 
     window.open(사이트 경로)메서드를 이용해 새창 으로 
          지정한 사이트가 열리도록 만들것입니다.  
  */

$("form[name=rel_f]").submit(function(){
	
	//전송이벤트가 발생당한 <form>요소의 하위 <select>요소를 선택해서
	//선택한 <option>태그의 value값을 얻는다.
	let url = $("select", this).val();
	
	//새로운 웹브라우저 창을 띄워 변수 url에 저장된 option태그의 주소값으로 요청하여 보여주게 하자.
	window.open(url);
	
	return false; //기본이벤트 차단
	
});


 //-----------------------------------------------------------------------------------------------------

  /*옆쪽 퀵 메뉴*/
  /*
  	클라이언트가 index.html사이트를 웹브라우저로 처음 요청했을떄
  	퀵 메뉴 영역인 <div id="quick_menu"></div>요소영역의 
    CSS설정 top속성의 위치 이동값 100을 구하기 위해
  	퀵 메뉴 영역을  선택해서 가져와  css("top")메소드를 호출하면
  	미리 설정되어 있는 top 속성값 "100px" 문자열을 얻는다.
  	"100px" top속성의 값을 나중에 스크롤막대바가 세로로 이동한 거릿값과 + 계산하기 위해 
  	100정수만 추출해서 얻어낸다.
    
    요약 : div에 css문법으로 설정된 기본전체 문서 상단에서 퀵 메뉴영역(div)이 위치한 top속성값 !
    	  퀵 메뉴가 아래로 위치한 top속성값 얻기 
  */
	
	
	//퀵메뉴의 top값을 얻어 숫자로 변환해 변수에 저장
	let defaultTop = parseInt( $("#quick_menu").css("top") ); //100
	
	//웹브라우저 윈도우창 객체에 scroll이벤트 등록
	$(window).on("scroll", function(){
		
		//스크롤이벤트가 발생한 윈도우 창을 다시 선택하여
		//스크롤 막대바가 세로 아래 방향으로 이동된 높이값(거리값)을 반환하여
		let scv = $(this).scrollTop();
		
		$("#quick_menu").stop().animate({ top : scv + defaultTop + "px" }); //사용자가 이벤트를 남발하면 오류가 생길 수 있으므로 .stop()을 사용해야함
		
	});
  




});
















