const socket =io();

if(navigation.geoloction){
    navigation.geoloction.watchPostion((position)=>{
       const {latitude,longitude}=position.coords;
       socket.emit("send-locition", { latitude, longitude });
    },
    (error)=>{
        console.log(error);
    },
    {
        enableHighAccuracy:true
    
                    
    }

);
}

L.map("map").setview([0,0],1);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"OpenStreetMap"}).addTo(map);

const markers={};

socket.on("new-connected",(data)=>{
    const{ id,latitude,longitude}=data;
    map.setview([latitude,longitude],13);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }

})