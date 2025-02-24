/*
콘텐츠 영역 개발하기
-콘텐츠 영역은 크게 
  비주얼배너, 
  알림판, 
  최근게시물, 
  알림배너, 
  베스트Book, 
  페이스북,
  마케팅, 
  온라인서점
 으로 나뉩니다.
 
- 레이아웃은 비주얼 배너가 들어가는 visual영역과
    나머지 주제 소스들이 들어가는 content영역으로 나뉘었음.  
*/


//-----------------------------------------------------------
/*
 주제 : 비주얼 배너 터치 슬라이드 만들기
  비주얼 배너 영역은 배너 중 한개만 노출되어 이루어져 있으며,
 [이전/다음]버튼을 누르면 배너가 이동되어 바뀌게 됨.
  스마트폰에서는 손가락으로 터치 했을때 도 배너가 바뀔수 있도록 제작 하자

 //https://github.com/bradbirdsall/Swipe
 */
$(function(){
 
  /* 터치 슬라이드 비주얼 영역  */
  /*
	    <div id="mySwipe" class='swipe'>
				<ul class="touch_banner swipe-wrap">
					<!-- 배너 목록 -->
					<li><a href="#"><img src="images/visual_img_1.jpg" alt="" /></a></li>
					<li><a href="#"><img src="images/visual_img_2.jpg" alt="" /></a></li>
					<li><a href="#"><img src="images/visual_img_3.jpg" alt="" /></a></li>
				</ul>
		</div>
  */
	
	window.mySwipe = $("#mySwipe").Swipe({
			
			//auto 속성 - 자동슬라이드 전환을 위한 시간 간격을 설정하는 속성	
			//설정하지않으면 자동 전환이 비활성화 됨
			auto : 3000,
			
			//continuous 속성 - 반복해서 슬라이드를 보여줄건지 설정하는 속성
			//true 반복, false 반복안함	
			continuous : true,
			
			//callback 속성 - 슬라이드 전환 후 호출되는 함수를 설정하는 속성
			//배너의 하나의 슬라이드 이동이 완료될 때 마다 function(){}이 호출되어 실행문이 실행됩니다.
			//이때 index 매개변수에는 현재 노출된 배너 이미지를 포함한 <li>태그의 index 위치값이 할당됩니다.
			//element 매개변수에는 노출된 <li>요소 자체가 할당됩니다.
			callback : function(index, element){
				
				//슬라이드가 전환이 되면 두번째 슬라이드의 화면이 나올 것이니 첫번째 슬라이드 화면의 동그라미 빨간색 이미지를
				//하얀색 동그라미 이미지로 변경
				$(".touch_bullet .active").attr("src", "images/visual_bullet_off.png");
				
				//<img>태그의 class="active"의 클래스값 삭제
				$(".touch_bullet .active").removeClass("active");
				
				//--------------------------------------------------------------------------
				
				//전환된 슬라이드 화면의 동그라미 버튼이미지가 하얀색 -> 빨간색으로 표시되게 하자.
				//그리고 선택한 <img>태그의 class속성에 "active"값 생성
				$(".touch_bullet img").eq(index).attr("src",
														$(".touch_bullet img")
														.eq(index)
														.attr("src")
														.replace("off.png", "on.png"))
														.addClass("active");
				
			}

	}).data("Swipe");
	/*
	 .data("Swipe");
	 	- Swipe메소드로 생성된 슬라이드 객체를 가져오는데 사용됩니다.
	 	    이 객체는 나중에 다른 곳에서 사용할 수 있도록 저장되며,
	 	    예를 들어, 슬라이드 조작을 위해 필요합니다.
	 	- 즉 .data("Swipe")는 Swipe객체의 메서드로 생성된 객체를 반환하여 이후에 해당 슬라이드를 제어하는데 사용할 수 있게
	 	합니다.
	 	
	
	 */
	
	//이전 < 버튼에 click이벤트 등록
	$(".touch_left_btn a").on("click", function(){
		
		mySwipe.prev(); //이전 배너 사진 화면으로 이동
		
		return false;
		
	});
	
	//다음 > 버튼에 click이벤트 등록
	$(".touch_right_btn a").on("click", function(){
		
		mySwipe.next(); //다음 배너 사진 화면으로 이동
		
		return false;
		
	});
  
    
  //-----------------------------------------------------------

  /*
   주제 : 자동 롤링 배너와 제어 버튼을 활용한 알림판 만들기
  
   알림판은 일정 시간 간격으로 자동으로 배너 이미지가 바뀌면서 해당하는 배너에 버튼이 활성화 됨.
   이때 버튼을 마우스로 클릭하면 버튼에 해당하는 배너로 이동 됨.
   그리고 정지 ■ 버튼을 누르면 자동으로 넘어가던 배너가 정지되고, 
   재생 ▶ 버튼을 누르면 다시 배너가 넘어가게 됨 
  */
  

	$("#roll_banner_wrap dd").not(":first").hide(); //배너이미지숨김
	
	//첫번째 [1]버튼 <img>태그를 감싸고 있는 <a>를 선택해 onBtn변수에 저장
	let onBtn = $("#roll_banner_wrap dt a:first");
	
	
	//2. [1]~[4] <img>태그를 감싸고 있는 모든 <a>들을 선택해서 click이벤트 등록
	 $("#roll_banner_wrap dt a").on("click", function(){
		 		 
		 //현재 화면에 노출되어 활성화되어있는 배너<img>들을 감싸고 있는 <dd>들을 숨김
		 $("#roll_banner_wrap dd:visible").hide(); 
		 
		 //onBtn변수에 저장되어있는 <a>의 하위요소 <img>를 선택해
		 //src속성의 이미지 주소값을 하얀색[1] 이미지 주소로 변경
		 $("img", onBtn).attr("src", 
				 $("img", onBtn).attr("src").replace("over.gif", "out.gif"));
		 
		 //[1]~[4] <a>중 하나를 클릭했을 때
		 //클릭한 <a>태그를 선택해 <a>의 index번호를 구해 변수에 저장
		 let num = $("#roll_banner_wrap dt a").index(this);
		 
		 //클릭한 <a>의 index 위치번호값과 일치하는 <dd>태그영역(배너이미지영역)만 화면에 나타나게 해야합니다.
		 //변수 num에 저장된 클릭한 <a>의 index 위치번호값을 이용해
		 //그에 해당하는 배너를 포함하는 <dd>태그를 선택해서 show()메소드로 보여줌
		 $("#roll_banner_wrap dd").eq(num).show();
		 
		 //클릭한 <a>의 하위 <img>에 "src"속성의 이미지 주소값을 빨간색 이미지 경로로 변경
		 $("img", this).attr("src", 
				 $("img", this).attr("src").replace("out.gif", "over.gif"));
		 
		 //[1]~[4]중 click이벤트가 발생한 <a>요소를 선택해서 onBtn변수에 저장
		 onBtn = $(this);
		 
		 return false;
		 
		  
	 });
	 
	 /*
	  3. autoPlay함수 정의
	  - 4초 간격으로 호출되어 [1]~[4]가 순차적으로 강제로 클릭되어
	        자동으로 배너 이미지 영영 <dd>을 보이도록 하는 기능 정의
	 */
	 
	 //최초 한 번은 3초 쉬었다가 autoPlay함수를 호추랗여 실행문을 실행시키고
	 //그 다음 2번째부터는 4초 간격으로 반보갛여 
	 //자기 자신의 함수 autoPlay함수를 호출(재귀함수 호출)하여 실행문을 반복 실행
	 let btnNum = 0;
	 
	 function autoPlay(){
		 
		 //일정한 시간간격으로 실행문이 실행될 때 마다 변수 btnNum의 값이 1씩 증가되게 하자
		 btnNum++;
		 
		 //이때 btnNum변수의 값이 4이상 되는 순간 0으로 변경해서
		 //[1] <a>를 강제 클릭할 수 있도록 btnNum변수값 0으로 변경
		 if(btnNum >= 4) btnNum = 0;
		 
		 //4초 간격으로 [1] [2] [3] [4]를 순차적으로 강제 클릭되게 하자
		 $("#roll_banner_wrap dt a").eq(btnNum).trigger("click");
		 
		 //4초 간격으로 재귀함수 호출(자기 자신의 함수 재호출)
		 auto1 = setTimeout(autoPlay, 4000);
		 
	 };
	 
	 //최초 한 번은 3초 쉬었다가 단 한번만 autoPlay함수 호출
	 var auto1 = window.setTimeout(autoPlay ,3000);
	 
	 //4. 재생버튼 ▶ <a>또는 정지 버튼 ■ 클릭시 이벤트 처리 
	 
	 //재생버튼 ▶ <a>를 선택해서 가져와 click이벤트 등록
	 $(".playBtn").on("click", function(){
		 
		 //사이트 방문자가 재생버튼을 여러번 클릭하게 되면
		 //auto1 변수 (스택메모리공간)에 있는 setTimeout()메소드들이 쌓여 있어 문제 발생 할 수 있음
		 //setTimeout()메소드를 clearTimeout()메소드로 제거한 후
		 //setTimeout()메소드 호출 구문의 실행을 해야합니다.
		 clearTimeout(auto1); //auto1변수에 저장된 setTimeout()메소드 제거
		 auto1 = setTimeout(autoPlay, 1000); //1초 지연 후 autoPlay함수 호출
		 
		 //클릭한 재생버튼 img태그의 src속성 주소값을 분홍색 이미지 주소로 변경해서 보여줌
		 $("img", this).attr("src", "images/pop_btn_play_on.gif");
		 
		 //클릭하지않은 정지 버튼 img태그의 src속성 주소값을 회색 이미지 주소로 변경해서 보여줌
		 $(".stopBtn img").attr("src", "images/pop_btn_stop_off.gif");
		 
		 return false;
		 
	 });
	 
	 /*
	  5. 정지버튼을 클릭했을 때 일정한 시간 간격으로 함수를 실행하여 버튼을 순차적으로 강제 클릭되게 하는
	  setTimeout()메소드를 제거하고 정지 버튼 이미지를 분홍색 이미지로 변경해서 나타내야 함
	    즉, 자동배너를 정지시킴
	  */
	 $(".stopBtn").on("click", function(){
		 
		 //auto1변수에 할당된 setTimeout메소드를 제거
		 clearTimeout(auto1);
		 
		 //정지버튼의 이미지를 활성화된 분홍색 이미지로 변경하고
		 $("img", this).attr("src", 
				 $("img", this).attr("src").replace("off.gif", "on.gif"));
		 
		 //재생버튼 이미지를 비활성화된 회색 이미지로 변경시킵니다.
		 $(".playBtn img").attr("src", 
				 $(".playBtn img").attr("src").replace("on.gif", "off.gif"));
		 
		 return false;
		 
	 });

	
  
 
 //-----------------------------------------------------------
  /*
   주제 : 탭 메뉴를 이용해 최근 게시물 리스트 만들기
  
  - 탭메뉴의 경우 최초 탭버튼인[공지사항]이 활성화되어 보입니다.
        만일 방문자가 [질문과답변]탭을 클릭했을 때는 [공지사항]은 숨겨져야 하고,
    [질문과 답변]의 내용은 활성화되어 보여야 합니다.
    
  - 먼저 탭버튼에 <a>에 on()메서드를 사용하여 mouseover,focus,click이벤트를 등록하였고,
        이벤트 핸들러에는 이벤트가 발생 했을때 마우스를 올린 탭 버튼과 탭에 해당하는 게시물 목록이 활성화되어 보이도록 만들자. 
  */
	 
	 //[공지사항]탭의 <a>영역을 선택해서 onTap변수에 저장
	 let onTab = $("#tabmenu dt a:first");
	 
	 //탭 버튼의 <a>태그들(공지사항, 질문과답변, 저자문의)을 한번에 모두 선택해서
	 //mouseover, focus, click이벤트 등록
	 $("#tabmenu dt a").on("mouseover focus click", function(){
		 
		 //먼저 현재 노출(:visible)되어 있는 <dd>태그들을 선택하여
		 //게시물 리스트 영역<dd>들을 숨깁니다.
		 $("#tabmenu dd:visible").hide(); //현재 보이고 있는 게시물의 목록 숨기기
		 
		 //onTap변수에 저장된 [공지사항] <a>태그 영역의 하위 <img>를 선택해
		 //빨간색 이미지에서 회색이미지로 변경 
		 $("img", onTab).attr("src", 
				 $("img", onTab).attr("src").replace("over.gif", "out.gif"));
		 
		 //3개의 이벤트중에서 하나의 이벤트가 발생한 <a>를 선택해서 
		 //<a>의 부모요소 <dt>선택하고 <dt>다음에 작성된 
		 //<dd>태그영역을 최종선택하여 show()메소드를 이용해 화면에 보여주자
		 $(this).parent().next().show();
		 
		 //3개의 이벤트중 하나의 이벤트가 발생한 <a>의 하위 <img>선택해서
		 //src속성의 이미지 주소값을 회색이미지에서 빨간색 이미지 경로로 변경
		 $("img", this).attr("src",
				 $("img", this).attr("src").replace("out.gif", "over.gif"));
		 
		 //3개의 이벤트중 하나의 이벤트가 발생한 <a>를 선택해 onTab변수에 다시 저장
		 onTab = $(this);
		 
		 return false;
		  
	 });
  
 //-----------------------------------------------------------
  
/*  
주제 : 자동 슬라이드 배너 를 이용한 베스트 Book영역   
	 https://bxslider.com/ 접속하여 사용법 보기 

  bxSlider 플러그인 이란?
    - 여러개의 배너에 슬라이드 기능을 간편하게 적용할수 있는 플러그인 종류중 하나

  bxSlider 플러그인 사용 문법
    참조변수 = $("슬라이드 기능을 설정할 요소영역 선택").bxSlider({속성명:값, 속성명2:값2});

*/
	//베스트 BOOK목록 태그영역 <ul>태그를 선택하여
	//bxSlider()메소드를 호출하여 적용하고 슬라이드 CSS옵션을 지정하자
	let mySlider = $("#best_bg ul").bxSlider({
		
		mode : "horizontal", //수평 방향으로 이동시키기
		speed : 500, //슬라이드 이동 속도 0.5초로 설정
		pager : false, //페이징 표시를 제어 (false:숨김, true:노출)
		moveSlides : 1, //이동슬라이드 수 설정
		slideWidth : 125, //슬라이드 폭 설정
		minSlides : 1, //최소 노출될 슬라이드 수 설정
		maxSlides : 3, //최대 노출될 슬라이드 수 설정
		slideMargin : 30, //슬라이드 간의 간격 설정
		auto : true, //자동 슬라이드 전환 여부 
		autoHover : true, //마우스 오버시 슬라이드 전환 정지 설정
		controls : false //이전/다음 버튼을 숨김 설정 (true:노출, false:숨김)

	});
	
	// < 이전 버튼 영역에 click이벤트 등록
	$(".prev_btn").on("click", function(){
		
		mySlider.goToPrevSlide(); //슬라이드를 한단계 이전으로 이동되게 설정
		
		return false;
		
	});
	
	// > 다음 버튼 영역에 click이벤트 등록
	$(".next_btn").on("click", function(){
		
		mySlider.goToNextSlide(); //슬라이드를 한단계 이전으로 이동되게 설정
		
		return false;
		
	});
	

  //-----------------------------------------------------------

  /*  
  주제 : 제이쿼리 UI플러그인과 쿠키 플러그인 사용 하기
  - 팝업창을 드래그 하여 이동시키려면, 제이쿼리 UI플러그인을 사용함.
  - [하루동안 이창 열지 않기]버튼 기능을 하용하기 위해서는 쿠키 플러그인을 사용함
  
  참고 : 쿠키 플러그인 사용법
  	       
  	    <쿠키를 생성 하는 기본 사용법>
	  	  	 $.cookie("쿠키명","쿠키값",{expires:만료일});
	  	  	 	- 설명 : 쿠키명은 나중에 저장된 쿠키의 값을 불러올때 구분하기 위한 이름임.
	  	  	                       생성된 쿠키는 현재 부터 며칠동안 
	                                       클라이언트 컴퓨터의 웹브라우저에 보관할건지 만료일(expires)을 지정할수 있음.
	
			   예)$.cookie("pop","no",1);
		 	    - 설명: 브라우저에는 "pop"라는 이름으로 "no"라는 값이 1일 동안 쿠키가 보관 됩니다.
 	         
 	    <쿠키 플러그인을 이용하여  브라우저에 저장된 쿠키를 불러오는 기본 사용법>
 	    	  $.cookie("쿠키명");
 	    
        	    저장된 쿠키값인 "no" 불러오는 방법의 예)
	 	    		$.cookie("pop");
 	    
 	    <쿠키 플러그인을 이용하여 브라우저에 저장된 쿠키를 삭제하는 기본 사용법>
 	    	  $.cookie("쿠키명",null);
 	    
	 	      "pop"에 저장된 쿠키값 삭제의 예)
 	                $.cookie("pop",null);
  	  		
  */
  
  /* 팝업창 연동 */
  //설명 : 저장된 "pop"에 쿠키값을 검사하여  만일 쿠키가 저장되어 있지 않으면
  //       숨겨져 있던 팝업창이 보이도록함.
  //       그리고 사이트 이용자가 [하룻동안 이창 열지 않기] 를 눌렀을때
  //       쿠키가 생성되어 웹브라우저에 보관되  하루동안 팝업창이 열리지 않도록함.

	 //조건
	  //만약 "pop"쿠명과 함께 "no"쿠키값이 웹브라우저에 저장되어 있지 않으면?
	  if( $.cookie("pop") != "no"){
	      $("#pop_wrap").show();
	  }

	  //팝업창 영역 id="pop_wrap"에 마우스 포인터를 올리면 
	  //포인터 모양이 커서(십자가모양)으로 바뀌게 하자
	  //그리고 draggable()메소드를 호출하여 마우스로 드래그를 했을때 자연스럽게 보여줌
	  $("#pop_wrap").css("cursor","move").draggable();


	   //팝업창 영역 id="pop_wrap"의 하위 후손 <area>두쌍을 배열에 담아서 
	   //선택해 오되,  0인덱스 위치에 저장된 첫번째 <area>[창닫기] 요소를 최종 선택해
	   //click이벤트 등록
	   $("#pop_wrap area:eq(0)").on("click",function(){

	      //팝업창 영역을 선택해 fadeOut()메소드를 호출하여 
	      //점점 투명해 지면서 사라지게 함
	      $("#pop_wrap").fadeOut("slow");

	      //링크를 차단 시킵니다.
	      return false;
	   });

	   
	   //팝업창 영역 id="pop_wrap"의 하위 후손 <area>두쌍을 배열에 담아서 
	   //선택해 오되,  1인덱스 위치에 저장된 두번째 <area>[하루동안 이창 열지 않기] 
	   //요소를 최종 선택해  click이벤트 등록
	   $("#pop_wrap area:eq(1)").on("click",function(){

	     //쿠키를 생성 해서 웹브라우저에 보관 해 둡니다.
	     //쿠키명을 "pop" 쿠기값은 "no"가 한쌍으로  오늘로 부터 하루동안 보관함
	     $.cookie("pop","no",{expires:1});

	       //팝업창 영역을 선택해 fadeOut()메소드를 호출하여 
	      //점점 투명해 지면서 사라지게 함
	      $("#pop_wrap").fadeOut("slow");

	     return false;
	   });
	//크롬(Chrome)브라우저로 쿠키를 확인하는 방법을 알아보도록 해요. 
	//- 개발자도구(F12) 를 연후 Appliecation -> Storage -> Cookies 에서 확인 가능하다.




});




