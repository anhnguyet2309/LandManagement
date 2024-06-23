
const db = require('../config/database.js');

class HomeController {

  //Route địa chỉ chính
  home(req, res) {
    res.render('home');
  }
  index(req, res) {
    db.Runquery(`SELECT * FROM VungTrangTrai`,function(err, dataNongTrai){
      res.render('index',{dataNongTrai:JSON.stringify(dataNongTrai)});
    });
  }
  //Tng k Huyen
  nongtrai(req, res) {
    db.Runquery(`select  maintoa.ID,maintoa.tenHuyen,maintoa.Poly,ROUND(maintoa.Poly.STArea() / 1000000, 5) As DienTich, temp.SoTrangTrai
    from Huyen  maintoa  join (select dt.ID,SUM(CAST(dt.Poly.STContains(pt.Poly.STPointN(pt.Poly.STNumPoints() / 2)) AS INT)) as SoTrangTrai 
    from VungTrangTrai pt, Huyen dt group by dt.ID) temp on maintoa.ID= temp.ID ;
      `,function(err, datahuyen){
      res.render('nongtrai',{datahuyen:JSON.stringify(datahuyen)});
    });
  }
  find(req, res) {
    db.Runquery(`SELECT * FROM VungTrangTrai`,function(err, dataNongTrai){
      res.render('find',{dataNongTrai:JSON.stringify(dataNongTrai)});
    });
  } 
  // khoang cach gan nhat 
  khoang_cach(req,res){
    var x = req.body.x_new;
    var y = req.body.y_new;

    db.Runquery(`
    DECLARE @g geography; 
    SET @g = geography::Point(${x},${y}, 4326);
    SELECT TOP (1) H.ID,H.Poly, ROUND((@g.STDistance(trongtam.Centroid) / 1000), 5) as KC
    FROM [VungTrangTrai] H, (SELECT  ID,Poly.STPointN(Poly.STNumPoints() / 2) AS Centroid FROM VungTrangTrai) trongtam 
    where trongtam.ID = H.ID
    ORDER BY KC
    `,function(err, nearst_distance_point){
      res.json(nearst_distance_point);  
    });
  }
  // Khoang cach den trang trai bat ky 
  find_trangtrai(req,res){
    console.log("dang find controller");
    var x = req.body.x_new;
    var y = req.body.y_new;
    var name = req.body.name;
    db.Runquery(`
    DECLARE @g geography; 
    SET @g = geography::Point(${x},${y}, 4326);
    SELECT TOP (1) H.nameVung, H.ID,H.Poly, ROUND((@g.STDistance(trongtam.Centroid) / 1000), 5) as KC
    FROM [VungTrangTrai] H, (SELECT  ID,nameVung,Poly.STPointN(Poly.STNumPoints() / 2) AS Centroid FROM VungTrangTrai where nameVung LIKE N'${name}' ) trongtam 
    where trongtam.ID = H.ID and H.nameVung LIKE N'${name}' and trongtam.nameVung LIKE N'${name}'
    ORDER BY KC;
    `,function(err, nearst_distance_point){
      console.log(nearst_distance_point);
      res.json(nearst_distance_point);
    });
  }
}

module.exports = new HomeController();
