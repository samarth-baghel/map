import { MapsAPILoader } from '@agm/core';
import {  AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { MapComponent } from '../map/map.component';
// import { PlaceholderDirective } from '../placeholder.directive';
import { CountryDetailsService } from '../service/country-details.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit  {
  country: any;
  isShown: boolean = true;
  searchDropdown: any;
  dataOfCountry: any[] = [];
  isCheck: boolean = true;
  isTrue: boolean = true;
  addres: any;
  lat: any;
  isClose:boolean=true;
  errorMsg: any = "";
  lng: any;
  latitude: any = '';
  longitude: any = '';
  isOptions: boolean = true
  // getAddress:any;
  assgin: any;
  currentLocation: any
  // @ViewChild(PlaceholderDirective) mapHost!: PlaceholderDirective;
  countryName: any;
  geoCoder: any;
  address: string | undefined;
  constructor(
    // private componentFactory: ComponentFactoryResolver, 
    private countryDetails: CountryDetailsService,
    private cdr : ChangeDetectorRef,
    private mapsAPILoader: MapsAPILoader) { }
   
  ngAfterViewInit(){
    // if (this.countryName !== undefined) {
    //   console.log(this.countryName)
    //   this.errorMsg = "There is no data in dropdown list";
    //   this.cdr.detectChanges();
    // }

  }

  ngOnInit(): void {
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
    // });
    // this.get()
    if (!navigator.geolocation) {
      console.log("loaction is not find")
    }
    navigator.geolocation.getCurrentPosition((postion: any) => {
      this.lat = postion.coords.latitude;
      this.lng = postion.coords.longitude;
      console.log(postion.coords.latitude, postion.coords.longitude)
      // this.getReverseGeocodingData(postion.coords.latitude,postion.coords.longitude)
    })
    this.countryDetails.getDetailsOfCountry().subscribe((res) => {

      this.countryName = res;
      console.log(this.countryName)
      for (let val of this.countryName) {
        this.dataOfCountry.push(val.name.common);
      }
      this.dataOfCountry.sort();
      let indexOfIndia = this.dataOfCountry.findIndex((value: any) => {
        return value == "India";
      })
      this.dataOfCountry.splice(indexOfIndia, 1);
      this.dataOfCountry.unshift("India");
      console.log(indexOfIndia);
      console.log(this.countryName.length == 0)
      console.log(this.dataOfCountry.length)
    },(error)=> {
      this.errorMsg = "There is no data in dropdown list";
      this.isClose=false;
    })

  }
  enabled() {
    this.isCheck = false;
    this.isTrue = false;
  }
  submit(formValue: NgForm) {
    this.isCheck = true

    console.log(this.country)
    // this.showMapComponent(this.country);
    for (let val of this.countryName) {
      if (this.country == "India" || this.searchDropdown == "India") {
        this.latitude = this.lat;
        this.longitude = this.lng;
        if(this.latitude==undefined||this.longitude==undefined){
          console.log(this.longitude)
          this.errorMsg="There is some problem in api so plzs retry after sometime"
          this.isClose=true;
        }
      }
      else if (val.name.common == this.country || val.name.common == this.searchDropdown) {
        console.log(val.latlng)
        this.latitude = val.latlng[0];
        this.longitude = val.latlng[1]
        console.log(this.latitude)
        console.log(this.longitude)
        if(this.latitude==undefined||this.longitude==undefined){
          this.errorMsg="There is some problem in api so plzs retry after sometime"
          this.isClose=true;
        }
      }
     
    }
    this.countryName
  }
  close(){
    this.isClose=true;
  }
  move(event: any,val:any) {
    console.log(event.keyCode);
    if(event.keyCode==13){
      this.submit(val);
    }
console.log(val)
  }
  resetFormValue(formValue: NgForm) {
    formValue.resetForm();
    this.isCheck = true
    this.isTrue = true
    this.latitude = ''
    this.longitude = ''
    // this.mapHost.viewRefer.clear()
  }
  toShowDropdown() {
    this.isShown = false
  }
  filtering(e:any) {
    console.log(e.keyCode)
    let textValue: any;
    console.log(this.searchDropdown)
    let options = document.querySelectorAll('option');
    let optionCrt = document.createElement('option');
    // optionCrt.value=""
    let textNode = document.createTextNode("There is no country exits in dropdown");
    optionCrt.appendChild(textNode);


    let divCont: any = document.querySelector('.dropdown-content');
    for (let i = 0; i < options.length; i++) {
      textValue = options[i].value;
      // textValue=options[i].innerText || options[i].textContent;
      if (textValue.toUpperCase().indexOf(this.searchDropdown.toUpperCase()) == 0) {
        // if(textValue.toUpperCase().indexOf(this.searchDropdown.toUpperCase()) == 1)
        console.log(textValue.toUpperCase().indexOf(this.searchDropdown.toUpperCase()));
        options[i].style.display = "";
        divCont.style.left = "481"
        divCont.style.height = "20vh";
        divCont.style.width = "302px"
        // divCont.style.overflow="auto"
      }
      else {

        // options[i].innerText="There is no country exits in dropdown"
        options[i].style.display = "none";
        divCont.appendChild(optionCrt);
        // optionCrt.innerText="";
      }
    }
  }
  // private showMapComponent(urlOMap: any) {
  //   const mapComp = this.componentFactory.resolveComponentFactory(MapComponent);
  //   const placeHold = this.mapHost.viewRefer;
  //   placeHold.clear();
  //   const copmrefer = placeHold.createComponent(mapComp);
  //   copmrefer.instance.urlOfMap = urlOMap;

  // }

  setValue(val: any) {
    this.isCheck = false;
    this.isTrue = false;
    this.isShown = true
    console.log(val)
    this.searchDropdown = val;

  }
  //   getReverseGeocodingData(lat:any, lng:any) {
  //     let latlng = {
  //       lat:lat,
  //       lng:lng
  //     }
  //     // let latlng = new google.maps.LatLng(lat, lng);
  //     let obj:any={ 'latLng': latlng };
  //     // This is making the Geocode request
  //     let geocoder = new google.maps.Geocoder();
  //     geocoder.geocode(obj, function (results, status) {
  //         if (status !== google.maps.GeocoderStatus.OK) {
  //             alert(status);
  //         }
  //         // This is checking to see if the Geoeode Status is OK before proceeding
  //         if (status == google.maps.GeocoderStatus.OK) {
  //             console.log(results);
  //             var address = (results[0].formatted_address);
  //         }
  //     });
  // }
  // get() {  
  //   if (navigator.geolocation) {  
  //       navigator.geolocation.getCurrentPosition((position) => {  
  //           if (position) {  
  //               this.lat = position.coords.latitude;  
  //               this.lng = position.coords.longitude;  
  //               this.getAddress = (this.lat, this.lng)  
  //               console.log(position)  
  //               this.apiloader.load().then(() => {  
  //                   let geocoder = new google.maps.Geocoder;  
  //                   let latlng = {  
  //                       lat: this.lat,  
  //                       lng: this.lng  
  //                   };  
  //                   geocoder.geocode({  
  //                       'location': latlng  
  //                   }, (results) => {  
  //                       if (results[0]) {  
  //                           this.currentLocation = results[0].formatted_address;  
  //                           console.log(this.assgin);  
  //                       } else {  
  //                           console.log('Not found');  
  //                       }  
  //                   });  
  //               });  
  //           }  
  //       })  
  //   }  
  // }  
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;

  //       this.getAddress(this.lat, this.lng);
  //     });
  //   }
  // }

  // getAddress(latitude: any, longitude: any) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string | undefined; }[], status: string) => {
  //     if (status === 'OK') {
  //       if (results[0]) {

  //         this.address = results[0].formatted_address;
  //         console.log(this.addres);
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }

}
