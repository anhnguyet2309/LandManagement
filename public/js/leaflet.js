//11.182051, 107.153778
var defaultCoord = [11.057105548585342, 107.06200361251832]; // xác định vị trí trung tâm của bản đồ là đồng nai 
var zoomLevel = 15; // Mức phóng to bản đồ
var map = L.map('map').setView(defaultCoord, zoomLevel); 
var streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { //đường dẫn bản đồ của leaftlet
        maxZoom: 40,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

var mapConfig = {
    attributionControl: true, 
    center: defaultCoord, // vị trí map mặc định hiện tại
    zoom: zoomLevel
};


map.on("click", addMarker);

//map.addEventListener('mousemove',changePosition);


////////////////////////////////////////////////////////////////
// function
////////////////////////////////////////////////////////////////
const buttonRemove =  '<button type="button" class="cal_distance" id="cal_distance">Tính khoảng cách </button><button type="button" class="remove">Xóa</button>';
const buttonSelect = `<div><br><input id="value_find" /><br>
                    <button type="button" class="find_trangtrai" id="find_trangtrai">Tìm </button></div>
                        `;
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

// draged
function dragedMaker() {
    const markerPlace = document.querySelector(".marker-position");
    markerPlace.textContent = `change position: ${this.getLatLng().lat}, ${this.getLatLng().lng}`;
}



function addMarker(e) {
        
    // Add marker to map at click location
    const markerPlace = document.querySelector(".marker-address");
    markerPlace.textContent = `new marker: ${e.latlng.lat}, ${e.latlng.lng}`;
    x_new = e.latlng.lat, y_new = e.latlng.lng;
    const markerClick = new L.marker(e.latlng, {
        draggable: true
    })
        .addTo(map)
        .bindPopup( buttonRemove + buttonSelect);

    // event remove  and add marker
    markerClick.on("popupopen", ClickMarker);

    // event draged marker
    markerClick.on("", dragedMaker);
}
function changePosition(e){
    const markerPlace = document.querySelector(".marker-address");
    markerPlace.textContent = `position: ${e.latlng.lat}, ${e.latlng.lng}`;
}