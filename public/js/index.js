DatabaseState = Object.values(data);
array_freature = [];
for (var i = 0; i < DatabaseState.length; i++) {

    const element = DatabaseState[i];
    var array_point = [];
    for (var j = 0; j < element.Poly.points.length; j++) {
        const point = element.Poly.points[j];
        var GetPoint = [point.y, point.x];
        array_point.push(GetPoint);
    }

    var create_json = { "type": "Feature", "id": element.ID, "properties": { "LoaiCay": element.LoaiCay, "TenChu": element.TenChu , "dientich": element.dientich,"nameVung": element.nameVung}, "geometry": { "type": "Polygon", "coordinates": [array_point]} }

    array_freature.push(create_json);
}

var uitData = { "type": "FeatureCollection", "features": array_freature };

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); 
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4> Vùng nông trại </h4>' + (props ?
        '<b> Vùng:' + props.nameVung + '</b><br><b>Diện Tích: '+ props.dientich +' km<sup>2</sup></b><br><b><br>Tên chủ: ' + props.TenChu + '</b>'+ '</b><br><b><br>Loài cây: ' + props.LoaiCay + '</b>'
        : 'Đưa chuột lên vùng để xem thêm thông tin');
};

info.addTo(map);


function getColor(d) {
    return  d > 40000 ? '#FF0000' :
            d > 30000 ? '#FF3300' :
            d > 20000 ? '#FFCC00' :
                     '#00FF00';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.dientich)
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