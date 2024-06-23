//11.182051, 107.153778
var defaultCoord = [11.057105548585342, 107.06200361251832]; // coord mặc định, UIT
var zoomLevel = 15; // Mức phóng to bản đồ
var map = L.map('map').setView(defaultCoord, zoomLevel);
var streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 40,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
var mapConfig = {
    attributionControl: true, // để ko hiện watermark nữa, nếu bị liên hệ đòi thì nhớ open nha
    center: defaultCoord, // vị trí map mặc định hiện tại
    zoom: zoomLevel
};


map.on("click", addMarker);


function ClickMarker() {
    const marker = this;
    const btn = document.querySelector(".remove");
    btn.addEventListener("click", function () {
        const markerPlace = document.querySelector(".marker-position");
        markerPlace.textContent = "Goodbye marker 🌱";
        map.removeLayer(marker);
    });
    const btn_distance = document.getElementById('cal_distance');

}
const buttonRemove =  '<button type="button" class="cal_distance" id="cal_distance">Tính khoảng cách </button><button type="button" class="remove">Xóa</button>';
var string_arr_point = "";
function addMarker(e) {
    
    // Add marker to map at click location
    const markerPlace = document.querySelector(".marker-address");
    markerPlace.textContent = `new marker: ${e.latlng.lat}, ${e.latlng.lng}`;
    x_new = e.latlng.lat, y_new = e.latlng.lng;
    string_arr_point = string_arr_point + ', '+e.latlng.lng+ ' '+e.latlng.lat;

    const markerClick = new L.marker(e.latlng, {
        draggable: true
    })
        .addTo(map)
        .bindPopup( buttonRemove );

    const btn_add = document.querySelector(".add_farm");
    btn_add.addEventListener("click",function(){
        console.log(string_arr_point);
    });

    // event remove  and add marker
    markerClick.on("popupopen", ClickMarker);

    // event draged marker
    
}

// view ra 11 huyện 
DatabaseState = Object.values(data);
array_freature = [];
// Lưu lại các điểm của từng huyện 
for (var i = 0; i < DatabaseState.length; i++) {
    const element = DatabaseState[i];
    var array_point = [];
    for (var j = 0; j < element.Poly.points.length; j++) {
        const point = element.Poly.points[j];
        var GetPoint = [point.y, point.x];
        array_point.push(GetPoint);
    }
// Lưu các thuộc tính của huyện 
    var create_json = { "type": "Feature", "id": element.ID, "properties": {   "tenHuyen": element.tenHuyen,"dientich":element.DienTich,"SoTrangTrai":element.SoTrangTrai}, "geometry": { "type": "Polygon", "coordinates": [array_point]} }

    array_freature.push(create_json);
}

var uitData = { "type": "FeatureCollection", "features": array_freature };

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); 
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4> Huyện ở Đồng Nai </h4>' + (props ?
        '<b> Vùng:' + props.tenHuyen + '</b><br><b>Diện Tích: '+ props.dientich +' km<sup>2</sup></b><br><b>Số trang trại: '+ props.SoTrangTrai +'</b>'
        : 'Đưa chuột lên vùng để xem thêm thông tin');
};

info.addTo(map);


function getColor(d) {
    return  d == 1 ? '#66CCFF' :
            d == 2 ? '#FF3300' :
            d == 3 ? '#FFCC00' :
            d == 4 ? '#00FF66' :
            d == 5 ? '#FF6699' :
            d == 6 ? '#3300FF' :
            d == 7 ? '#FF9900' :
            d == 8 ? '#CC0099' :
            d == 9 ? '#66CCCC' :
            d == 10 ? '#00FF99' :
            d == 11 ? '#FF3333' :
                     '#0066CC';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.id)
    };
}
//Kẻ viền ngoài của từng feature
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


geojson = L.geoJson(uitData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);