angular.module('starter')

	.service("UserService", function ($http, $cookieStore) {
        var userObj = {};
        return {
            setUserObj: function (obj) {                  
              $cookieStore.put('user', obj);
              $cookieStore.put('loggedin', 'true');
            },
            getUserObj: function () {
              if($cookieStore.get('loggedin')=='true'){
                return $cookieStore.get('user');
              }
              else{
                return null;
              }
            },
            destroyUserObj: function () {
              $cookieStore.put('user', null);
              $cookieStore.put('loggedin', 'false');                    
            }
        }
    })
    .service("UtilitiesService", function ($http, UserService, $rootScope, $location, $cookieStore) {
        return {
            formatCurrency : function (inputCurrency) {
                if(inputCurrency){                       
                  var neg = false;
                  if(inputCurrency<0){
                    neg = true
                  }           
                  else{
                    neg = false;
                  }  
                  inputCurrency = Math.abs(inputCurrency).toString();
                  var afterPoint = '';
                  if (inputCurrency.indexOf('.') > 0)
                      afterPoint = inputCurrency.substring(inputCurrency.indexOf('.'), inputCurrency.length);
                  inputCurrency = Math.floor(inputCurrency);
                  inputCurrency = inputCurrency.toString();
                  var lastThree = inputCurrency.substring(inputCurrency.length - 3);
                  var otherNumbers = inputCurrency.substring(0, inputCurrency.length - 3);
                  if (otherNumbers != '')
                      lastThree = ',' + lastThree;
                  var res = (neg?"-":"")+otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
                  return res;
                }            
                else{
                  return 0;
                }      
            },
            getAge: function(dateOfBirth){
              var dob = new Date(parseInt(dateOfBirth.replace("/Date(", "").replace(")/",""), 10))
              var today = new Date();
              var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
              return age;
            },
            formatDate : function(inputDate){
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName().substring(0,3) + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName().substring(0,3) + " " + now.getFullYear();
                var dispDate = dtString.split(" ");

                if (dtString == nowString) {
                    return "Today";
                }
                else if (dt.getFullYear() == now.getFullYear()) {
                    return dispDate[1] + " " + dispDate[0];
                }
                else {
                    return dispDate[1] + " " + dispDate[0] + " " + dispDate[2];
                }
            },
            formatDateNumber: function(inputDate){
                inputDate = new Date(parseInt(inputDate.replace("/Date(", "").replace(")/",""), 10))
                var dt = inputDate ? new Date(inputDate) : new Date();
                var mins = dt.getMinutes().length==1?'0'+dt.getMinutes():dt.getMinutes();
                var hrs = dt.getHours()<10?"0"+dt.getHours():dt.getHours();  
                return dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+" "+hrs+":"+mins;                
            },
            formatTime : function(inputDate){
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName() + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName() + " " + now.getFullYear();
                var dispDate = dtString.split(" ");
                var mins = dt.getMinutes().length==1?'0'+dt.getMinutes():dt.getMinutes();
                var hrs = dt.getHours()<10?"0"+dt.getHours():dt.getHours();  
                mins = mins<10?"0"+mins:mins;                 
                var time = hrs + ":" + mins;
                time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
                if (time.length > 1) { // If time format correct
                  time = time.slice (1);  // Remove full string match value
                  time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                  time[0] = +time[0] % 12 || 12; // Adjust hours
                }
                return time.join ('');                  
            },
            getAuditDate : function (inputDate) {                  
                inputDate = new Date(parseInt(inputDate.replace("/Date(", "").replace(")/",""), 10))
                return this.formatDate(inputDate);                  
            },
            getAuditTime: function (inputDate){
                inputDate = new Date(parseInt(inputDate.replace("/Date(", "").replace(")/",""), 10))
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName() + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName() + " " + now.getFullYear();
                var dispDate = dtString.split(" ");
                var mins = dt.getMinutes().length==1?'0'+dt.getMinutes():dt.getMinutes();
                var hrs = dt.getHours()<10?"0"+dt.getHours():dt.getHours();  
                mins = mins<10?"0"+mins:mins;                 
                var time = hrs + ":" + mins;
                time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
                if (time.length > 1) { // If time format correct
                  time = time.slice (1);  // Remove full string match value
                  time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
                  time[0] = +time[0] % 12 || 12; // Adjust hours
                }
                return time.join ('');                  
            },
            compareDate : function (inputDate) {                  
                inputDate = new Date(parseInt(inputDate.replace("/Date(", "").replace(")/",""), 10))
                var dt = inputDate ? new Date(inputDate) : new Date();
                var now = new Date(Date.now());
                var dtString = dt.getDate() + " " + dt.getMonthName() + " " + dt.getFullYear();
                var nowString = now.getDate() + " " + now.getMonthName() + " " + now.getFullYear();
                var dispDate = dtString.split(" ");

                if (dtString == nowString) {
                    var mins = dt.getMinutes()=='0'?'00':dt.getMinutes();
                    var time = dt.getHours() + ":" + mins;
                    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                    if (time.length > 1) { // If time format correct
                      time = time.slice (1);  // Remove full string match value
                      time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
                      time[0] = +time[0] % 12 || 12; // Adjust hours
                    }
                    // var x = time.join ('');
                    // return "Today"+x;
                    return "Today";
                }
                else if (dt.getFullYear() == now.getFullYear()) {
                    return dispDate[1] + " " + dispDate[0];
                }
                else {
                    return dispDate[1] + " " + dispDate[0] + " " + dispDate[2];
                }
            },
            makeAjaxCalls: function(url, data, method, accessToken){
              var promise = $http({
                  method: method,
                  url: url,
                  data: data,
                  headers:{
                    "AccessToken":accessToken
                  }
              });
              promise.catch(function(error){
                //Checking if the accessToken is invalid and signing the user out of the system!
                if(error.status==403 && error.statusText =="Forbidden"){
                  UserService.destroyUserObj();
                  $rootScope.$emit('signout');
                  $location.path("/");
                }              
              }) 
              return promise;
            } 
        }
    })
    