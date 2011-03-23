var data = {};
var rmap = {};
rmap.render = function(data) {
    for (i in rmap.markers) {
               rmap.markers[i].setMap(null);
             }
    if (data){
        $.each(data, rmap.setMarker);
        
    }    
};

function init() {
    var imgPath = 'css/img/'
    rmap.icon = [];
    rmap.icon[0] = new google.maps.MarkerImage(imgPath+'0.png');
    rmap.icon[1] = new google.maps.MarkerImage(imgPath+'1.png');
    rmap.icon[2] = new google.maps.MarkerImage(imgPath+'2.png');
    rmap.icon[3] = new google.maps.MarkerImage(imgPath+'3.png');
    rmap.icon[4] = new google.maps.MarkerImage(imgPath+'4.png');
    rmap.icon[5] = new google.maps.MarkerImage(imgPath+'5.png');        
    rmap.redIcon = new google.maps.MarkerImage(imgPath+'icon.png');        
    rmap.markers = [];
    
    rmap.map = new google.maps.Map(document.getElementById("map_canvas"),{
                    zoom: 8,
                    mapTypeControl: false,
                    center: new google.maps.LatLng(37.517,138.601),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    rmap.setMarker = function(i,e) {
        console.log(i,e.value, e);    
        var ngy = e.value;    
        
        if(ngy == -999){
            icon = rmap.icon[0];
        } else if (ngy < 100) {
            icon = rmap.icon[2];
        } else if (ngy < 200) {
            icon = rmap.icon[2];
        } else if (ngy < 300) {
            icon = rmap.icon[3];
        } else if (ngy < 400) {
            icon = rmap.icon[4];
        } else if (ngy < 500) {
            icon = rmap.icon[5];
        }
        
        var m = new google.maps.Marker({
                                     position: new google.maps.LatLng(e.pos[0],e.pos[1]),
                                     map: rmap.map,
                                     icon: icon
                                 });
                                 
        
        rmap.markers.push(m);
    }
    
    
    // $('#201103182100_btn').click(function(event){
    //      for (i in rmap.markers) {
    //           rmap.markers[i].setMap(null);
    //         }
    //      rmap.render(data[201103182100]);
    //  });
    
    console.log('asd');
        //   
        // $.getJSON('201103191000').success(function(d){
        //     console.log('201103191000 loaded');
        //     data[201103191000] = d;
        //     rmap.render(data[201103191000]);
        // 
        // });

}; 






$(function() {
		$( "#slider" ).slider({
			value: new Date(2011, 2, 22).getTime()+ 1000*60*60*12,
			min: new Date(2011, 2, 22).getTime(),
			max: new Date(2011, 2, 23).getTime(),
			step: 1000*60*10,
			slide: function( event, ui ) {
			    console.log('x'+ui.value+'x' );
			    var date = new Date( ui.value );
			    var newVal = date.format('yyyymmddHHMM');
			    if (!data[newVal]) {
			        $.getJSON('staticdata/'+newVal)
			            .success(function(d){
                            console.log(newVal+' loaded');
                            data[newVal] = d;
                            rmap.render(data[newVal]);
        			         }
                            
                            )
                        .error(function(){
                            console.log(' not found');
                            rmap.render(data[newVal]);
                        });
			    } else {
			        
			        rmap.render(data[newVal]);
                    
			    }
			    
			    console.log(date);
                $( "#time" ).empty().append( date.format('hh:MM') + '<span>'+date.format('dddd')+'</span>');
			}
		});
		//$( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
});
    
    // var iconLatLng = new google.maps.LatLng(37.417,138.601);
    // var beachMarker = new google.maps.Marker({
    //        position: iconLatLng,
    //        map: map,
    //        icon: redIcon
    //    });
   
    // var markers = [];
    //     for(i=0;i<10;i++){
    //         markers[i]=[];
    //         for(j=0;j<20;j++){
    //             markers[i][j] = new google.maps.Marker({
    //                              position: new google.maps.LatLng(37.517+(i/10),138.601+(j/10)),
    //                              map: map,
    //                              icon: redIcon
    //                          });
    //         }
    //     }
    //   
    //     //   
    //     var state = 0;
    //     setInterval( function(){
    //         
    //        for (i=0;i<markers.length;i++) {
    // //           setNewColor();
    //            if (state-1>=0) {
    //                markers[i][state-1].setIcon(redIcon);
    //            } else {
    //                markers[i][19].setIcon(redIcon);
    //            }
    //            markers[i][state].setIcon(yellowIcon); 
    // //           markers[0][0].setIcon(yellowIcon);   
    //        }
    //        state++;
    //        if (state ==20 ){
    //            state=0;
    //            
    //        }
    //     }, 2000);
    // }
    // 
    // function setNewColor(marker) {
    //      if (Math.random() < 0.5) {
    //             marker.setIcon(yellowIcon);   
    //         } else {
    //             marker.setIcon(redIcon)
    //         }
    // }
$(document).ready(function () {
       init();
      
});

