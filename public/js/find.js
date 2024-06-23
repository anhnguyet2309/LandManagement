
var polyline=[];
// zoom the map to the polyline
var numberLine = 0;
function ClickMarker() {
  const marker = this;
  const btn = document.querySelector(".remove");
  btn.addEventListener("click", function () {
      const markerPlace = document.querySelector(".marker-position");
      markerPlace.textContent = "Goodbye marker 🌱";
      map.removeLayer(marker);
      for(i=0;i<numberLine;i++){
        map.removeLayer(polyline[i]);
      }
  });
  const btn_distance = document.querySelector('.cal_distance');
  btn_distance.addEventListener("click",function(e){ 
      var latlngs = null;
      $.ajax({
        type:'POST',
        datatype:'JSON',
        sync:false,
        data:{
            x_new: x_new,
            y_new: y_new
        },
        crossDomain: true,
        url:'/khoang_cach',
        success: function (result) {
            console.log(result);
            var x = result[0].Poly.points[0].x;
            var y = result[0].Poly.points[0].y;
            var KC = result[0].KC;
            var latlngs = [
              [x_new, y_new],
              [x, y],
            ];
            var bindPopup_line='Khoảng cách:'+KC+' km';
            polyline.push(L.polyline(latlngs, {color: 'red', weight: 10}).bindPopup(bindPopup_line).addTo(map)) ;
            numberLine+=1;
            map.fitBounds(polyline[numberLine-1].getBounds());
        },
        error: function(result){
            console.log(result);
            console.log("Sai roi");
        }
    });
  });
  const btn_find = document.querySelector('.find_trangtrai');
  btn_find.addEventListener("click",function(e){ 
    var selected = document.getElementById("value_find").value;
    var latlngs = null;
    $.ajax({
      type:'POST',
      datatype:'JSON',
      sync:false,
      data:{
          x_new: x_new,
          y_new: y_new,
          name: selected,
      },
      crossDomain: true,
      url:'/find_trangtrai',
      success: function (result) {
          var x = result[0].Poly.points[0].x;
          var y = result[0].Poly.points[0].y;
          var KC = result[0].KC;
          var latlngs = [
            [x_new, y_new],
            [x, y],
          ];
          var bindPopup_line='Khoảng cách:'+KC+' km';
          polyline.push(L.polyline(latlngs, {color: 'red', weight: 10}).bindPopup(bindPopup_line).addTo(map));
          numberLine+=1;
          map.fitBounds(polyline[numberLine-1].getBounds());
      },
      error: function(result){
          console.log(result);
          console.log("Sai roi");
      }
  });
});

}