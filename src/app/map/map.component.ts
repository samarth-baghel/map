import { Component, Input, OnInit } from '@angular/core';
// import { CountryDetailsService } from '../service/country-details.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
@Input() urlOfMap: any
details:any;
url:any;
addres:any;
lat:any;
long:any
googleMapType = 'satellite';
  constructor(
    // private ser:CountryDetailsService
    ) { }

  ngOnInit(): void {
//     this.ser.getDetailsOfCountry().subscribe((res)=>{
//       this.details=res;
//       this.details.forEach((value:any)=>{
// if(value.name.common===this.urlOfMap){
//   this.url=value.maps.googleMaps;
//   console.log(value.latlng[1])
//   this.lat=value.latlng[0];
//   this.long=value.latlng[1];
//   this.addres=`https://maps.google.com/maps?q='${this.lat}','${this.long}'&hl=es;z=14&amp;output=embed`;
//   console.log(this.addres)
//   console.log(this.lat);
//   console.log(this.long)
// }
//       })
 
//     })
    
 
//     console.log(this.urlOfMap)
    
   
  }

}
