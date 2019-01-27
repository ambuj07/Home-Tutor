import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.css']
})
export class TutorRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const baseUrl = environment.baseUrl;
    $(document).ready(function(){
      $('.registration-form .fieldset:first-child').fadeIn('slow');
  
      $('.registration-form input[type="text"]').on('focus', function () {
          $(this).removeClass('input-error');
      });
  
      // next step
      $('.registration-form .btn-next').on('click', function () {
          var parent_fieldset = $(this).parents('.fieldset');
          var next_step = true;
          var mobileRegex = /^[1-9]\d{9}$/;
          var mobile = $("#mobileNumber").val();
          var whatsapp = $("#whatsappNumber").val();
          var emailRegex = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          var allFilled = true;
  
          $(this).parents('.fieldset').find('select,input').each(function () {
            if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == "")) {
                $(this).addClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#d03e3e");
                next_step = false;
                allFilled = false;
                showToast("All fields are Mandatory");
            } else {
                $(this).removeClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#ccc"); 
            }
          });
          if(allFilled){
            if(!emailRegex.test($("#email").val())){
              next_step = false;
              $("#email").addClass('input-error');
              showToast("Please enter a valid email");
              return false;
            }else{
              $("#email").removeClass('input-error');
            }
            if(!mobileRegex.test(mobile)){
              next_step = false;
              $("#mobileNumber").addClass('input-error');
              showToast("Invalid Mobile Number : Should be only 10 digit");
              return false;
            }else{
              $("#mobileNumber").removeClass('input-error');
            }
            if(!mobileRegex.test(whatsapp)){
              next_step = false;
              $("#whatsappNumber").addClass('input-error');
              showToast("Invalid WhatsApp Number : Should be only 10 digit");
            }else{
              $("#whatsappNumber").removeClass('input-error');
            } 
          }
          if($(".tutorType").is(":visible")){
            var tutorType = [];
              $('.tutorType').each(function(){
                if($(this).is(':checked')){
                tutorType.push($(this).val());
              }
            });
            if(tutorType.length == 0){
              next_step = false;
              showToast("Please atleast one Mode of Teaching");
            }
          }
          if (next_step) {
              parent_fieldset.fadeOut(400, function () {
                  $(this).next().fadeIn();
              });
          }
  
      });

      $("#jobType").on('change',function(){
        if($(this).val() == 'PARTTIME'){
          $(".partTimeReason").prop('hidden',false);
        }else{
          $(".partTimeReason").prop('hidden',true);
        }
      });

      $('.selectpicker').selectpicker();
    });

    //qualification
    $("#qualification").on('change',function(){
        if($(this).val() == 'OTHER'){
          $(".otherQualification").prop('hidden',false);
        }else{
          $(".otherQualification").prop('hidden',true);
        }
    });

    //states and city
    //var states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];
    //var cities = ["Adilabad", "Agra", "Ahmedabad", "Ahmednagar", "Aizawl", "Ajitgarh (Mohali)", "Ajmer", "Akola", "Alappuzha", "Aligarh", "Alirajpur", "Allahabad", "Almora", "Alwar", "Ambala", "Ambedkar Nagar", "Amravati", "Amreli district", "Amritsar", "Anand", "Anantapur", "Anantnag", "Angul", "Anjaw", "Anuppur", "Araria", "Ariyalur", "Arwal", "Ashok Nagar", "Auraiya", "Aurangabad", "Aurangabad", "Azamgarh", "Badgam", "Bagalkot", "Bageshwar", "Bagpat", "Bahraich", "Baksa", "Balaghat", "Balangir", "Balasore", "Ballia", "Balrampur", "Banaskantha", "Banda", "Bandipora", "Bangalore Rural", "Bangalore Urban", "Banka", "Bankura", "Banswara", "Barabanki", "Baramulla", "Baran", "Bardhaman", "Bareilly", "Bargarh (Baragarh)", "Barmer", "Barnala", "Barpeta", "Barwani", "Bastar", "Basti", "Bathinda", "Beed", "Begusarai", "Belgaum", "Bellary", "Betul", "Bhadrak", "Bhagalpur", "Bhandara", "Bharatpur", "Bharuch", "Bhavnagar", "Bhilwara", "Bhind", "Bhiwani", "Bhojpur", "Bhopal", "Bidar", "Bijapur", "Bijapur", "Bijnor", "Bikaner", "Bilaspur", "Bilaspur", "Birbhum", "Bishnupur", "Bokaro", "Bongaigaon", "Boudh (Bauda)", "Budaun", "Bulandshahr", "Buldhana", "Bundi", "Burhanpur", "Buxar", "Cachar", "Central Delhi", "Chamarajnagar", "Chamba", "Chamoli", "Champawat", "Champhai", "Chandauli", "Chandel", "Chandigarh", "Chandrapur", "Changlang", "Chatra", "Chennai", "Chhatarpur", "Chhatrapati Shahuji Maharaj Nagar", "Chhindwara", "Chikkaballapur", "Chikkamagaluru", "Chirang", "Chitradurga", "Chitrakoot", "Chittoor", "Chittorgarh", "Churachandpur", "Churu", "Coimbatore", "Cooch Behar", "Cuddalore", "Cuttack", "Dadra and Nagar Haveli", "Dahod", "Dakshin Dinajpur", "Dakshina Kannada", "Daman", "Damoh", "Dantewada", "Darbhanga", "Darjeeling", "Darrang", "Datia", "Dausa", "Davanagere", "Debagarh (Deogarh)", "Dehradun", "Deoghar", "Deoria", "Dewas", "Dhalai", "Dhamtari", "Dhanbad", "Dhar", "Dharmapuri", "Dharwad", "Dhemaji", "Dhenkanal", "Dholpur", "Dhubri", "Dhule", "Dibang Valley", "Dibrugarh", "Dima Hasao", "Dimapur", "Dindigul", "Dindori", "Diu", "Doda", "Dumka", "Dungapur", "Durg", "East Champaran", "East Delhi", "East Garo Hills", "East Khasi Hills", "East Siang", "East Sikkim", "East Singhbhum", "Eluru", "Ernakulam", "Erode", "Etah", "Etawah", "Faizabad", "Faridabad", "Faridkot", "Farrukhabad", "Fatehabad", "Fatehgarh Sahib", "Fatehpur", "Fazilka", "Firozabad", "Firozpur", "Gadag", "Gadchiroli", "Gajapati", "Ganderbal", "Gandhinagar", "Ganganagar", "Ganjam", "Garhwa", "Gautam Buddh Nagar", "Gaya", "Ghaziabad", "Ghazipur", "Giridih", "Goalpara", "Godda", "Golaghat", "Gonda", "Gondia", "Gopalganj", "Gorakhpur", "Gulbarga", "Gumla", "Guna", "Guntur", "Gurdaspur", "Gurgaon", "Gwalior", "Hailakandi", "Hamirpur", "Hamirpur", "Hanumangarh", "Harda", "Hardoi", "Haridwar", "Hassan", "Haveri district", "Hazaribag", "Hingoli", "Hissar", "Hooghly", "Hoshangabad", "Hoshiarpur", "Howrah", "Hyderabad", "Hyderabad", "Idukki", "Imphal East", "Imphal West", "Indore", "Jabalpur", "Jagatsinghpur", "Jaintia Hills", "Jaipur", "Jaisalmer", "Jajpur", "Jalandhar", "Jalaun", "Jalgaon", "Jalna", "Jalore", "Jalpaiguri", "Jammu", "Jamnagar", "Jamtara", "Jamui", "Janjgir-Champa", "Jashpur", "Jaunpur district", "Jehanabad", "Jhabua", "Jhajjar", "Jhalawar", "Jhansi", "Jharsuguda", "Jhunjhunu", "Jind", "Jodhpur", "Jorhat", "Junagadh", "Jyotiba Phule Nagar", "Kabirdham (formerly Kawardha)", "Kadapa", "Kaimur", "Kaithal", "Kakinada", "Kalahandi", "Kamrup", "Kamrup Metropolitan", "Kanchipuram", "Kandhamal", "Kangra", "Kanker", "Kannauj", "Kannur", "Kanpur", "Kanshi Ram Nagar", "Kanyakumari", "Kapurthala", "Karaikal", "Karauli", "Karbi Anglong", "Kargil", "Karimganj", "Karimnagar", "Karnal", "Karur", "Kasaragod", "Kathua", "Katihar", "Katni", "Kaushambi", "Kendrapara", "Kendujhar (Keonjhar)", "Khagaria", "Khammam", "Khandwa (East Nimar)", "Khargone (West Nimar)", "Kheda", "Khordha", "Khowai", "Khunti", "Kinnaur", "Kishanganj", "Kishtwar", "Kodagu", "Koderma", "Kohima", "Kokrajhar", "Kolar", "Kolasib", "Kolhapur", "Kolkata", "Kollam", "Koppal", "Koraput", "Korba", "Koriya", "Kota", "Kottayam", "Kozhikode", "Krishna", "Kulgam", "Kullu", "Kupwara", "Kurnool", "Kurukshetra", "Kurung Kumey", "Kushinagar", "Kutch", "Lahaul and Spiti", "Lakhimpur", "Lakhimpur Kheri", "Lakhisarai", "Lalitpur", "Latehar", "Latur", "Lawngtlai", "Leh", "Lohardaga", "Lohit", "Lower Dibang Valley", "Lower Subansiri", "Lucknow", "Ludhiana", "Lunglei", "Madhepura", "Madhubani", "Madurai", "Mahamaya Nagar", "Maharajganj", "Mahasamund", "Mahbubnagar", "Mahe", "Mahendragarh", "Mahoba", "Mainpuri", "Malappuram", "Maldah", "Malkangiri", "Mamit", "Mandi", "Mandla", "Mandsaur", "Mandya", "Mansa", "Marigaon", "Mathura", "Mau", "Mayurbhanj", "Medak", "Meerut", "Mehsana", "Mewat", "Mirzapur", "Moga", "Mokokchung", "Mon", "Moradabad", "Morena", "Mumbai City", "Mumbai suburban", "Munger", "Murshidabad", "Muzaffarnagar", "Muzaffarpur", "Mysore", "Nabarangpur", "Nadia", "Nagaon", "Nagapattinam", "Nagaur", "Nagpur", "Nainital", "Nalanda", "Nalbari", "Nalgonda", "Namakkal", "Nanded", "Nandurbar", "Narayanpur", "Narmada", "Narsinghpur", "Nashik", "Navsari", "Nawada", "Nawanshahr", "Nayagarh", "Neemuch", "Nellore", "New Delhi", "Nilgiris", "Nizamabad", "North 24 Parganas", "North Delhi", "North East Delhi", "North Goa", "North Sikkim", "North Tripura", "North West Delhi", "Nuapada", "Ongole", "Osmanabad", "Pakur", "Palakkad", "Palamu", "Pali", "Palwal", "Panchkula", "Panchmahal", "Panchsheel Nagar district (Hapur)", "Panipat", "Panna", "Papum Pare", "Parbhani", "Paschim Medinipur", "Patan", "Pathanamthitta", "Pathankot", "Patiala", "Patna", "Pauri Garhwal", "Perambalur", "Phek", "Pilibhit", "Pithoragarh", "Pondicherry", "Poonch", "Porbandar", "Pratapgarh", "Pratapgarh", "Pudukkottai", "Pulwama", "Pune", "Purba Medinipur", "Puri", "Purnia", "Purulia", "Raebareli", "Raichur", "Raigad", "Raigarh", "Raipur", "Raisen", "Rajauri", "Rajgarh", "Rajkot", "Rajnandgaon", "Rajsamand", "Ramabai Nagar (Kanpur Dehat)", "Ramanagara", "Ramanathapuram", "Ramban", "Ramgarh", "Rampur", "Ranchi", "Ratlam", "Ratnagiri", "Rayagada", "Reasi", "Rewa", "Rewari", "Ri Bhoi", "Rohtak", "Rohtas", "Rudraprayag", "Rupnagar", "Sabarkantha", "Sagar", "Saharanpur", "Saharsa", "Sahibganj", "Saiha", "Salem", "Samastipur", "Samba", "Sambalpur", "Sangli", "Sangrur", "Sant Kabir Nagar", "Sant Ravidas Nagar", "Saran", "Satara", "Satna", "Sawai Madhopur", "Sehore", "Senapati", "Seoni", "Seraikela Kharsawan", "Serchhip", "Shahdol", "Shahjahanpur", "Shajapur", "Shamli", "Sheikhpura", "Sheohar", "Sheopur", "Shimla", "Shimoga", "Shivpuri", "Shopian", "Shravasti", "Sibsagar", "Siddharthnagar", "Sidhi", "Sikar", "Simdega", "Sindhudurg", "Singrauli", "Sirmaur", "Sirohi", "Sirsa", "Sitamarhi", "Sitapur", "Sivaganga", "Siwan", "Solan", "Solapur", "Sonbhadra", "Sonipat", "Sonitpur", "South 24 Parganas", "South Delhi", "South Garo Hills", "South Goa", "South Sikkim", "South Tripura", "South West Delhi", "Sri Muktsar Sahib", "Srikakulam", "Srinagar", "Subarnapur (Sonepur)", "Sultanpur", "Sundergarh", "Supaul", "Surat", "Surendranagar", "Surguja", "Tamenglong", "Tarn Taran", "Tawang", "Tehri Garhwal", "Thane", "Thanjavur", "The Dangs", "Theni", "Thiruvananthapuram", "Thoothukudi", "Thoubal", "Thrissur", "Tikamgarh", "Tinsukia", "Tirap", "Tiruchirappalli", "Tirunelveli", "Tirupur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Tonk", "Tuensang", "Tumkur", "Udaipur", "Udalguri", "Udham Singh Nagar", "Udhampur", "Udupi", "Ujjain", "Ukhrul", "Umaria", "Una", "Unnao", "Upper Siang", "Upper Subansiri", "Uttar Dinajpur", "Uttara Kannada", "Uttarkashi", "Vadodara", "Vaishali", "Valsad", "Varanasi", "Vellore", "Vidisha", "Viluppuram", "Virudhunagar", "Visakhapatnam", "Vizianagaram", "Vyara", "Warangal", "Wardha", "Washim", "Wayanad", "West Champaran", "West Delhi", "West Garo Hills", "West Kameng", "West Khasi Hills", "West Siang", "West Sikkim", "West Singhbhum", "West Tripura", "Wokha", "Yadgir", "Yamuna Nagar", "Yanam", "Yavatmal", "Zunheboto"];
    var statesHtml = '<option value="" selected disabled>Select Your State</option>';
    
    $.ajax({
      type: 'GET',
      url: baseUrl+"/config/state",
      async:false,
      contentType: "application/json;charset=utf-8",
      success: function(resultData) { 
          console.log(resultData);
          resultData.forEach(function (a){
            statesHtml += '<option value="'+a.id+'">'+a.name+'</option>';
          })
        }
    });
    $("#states").html(statesHtml).selectpicker();
    
    $('#states').change(function(){
      var cityHtml = '<option value="" selected disabled>Select Your City</option>';
      $.ajax({
        type: 'GET',
        url: baseUrl+"/config/"+$(this).val()+"/city",
        async:false,
        contentType: "application/json;charset=utf-8",
        success: function(resultData) { 
          resultData.forEach(function (a){
              cityHtml += '<option value="'+a.name+'">'+a.name+'</option>';
            });
          }
        });
        $("#city").html(cityHtml).selectpicker();
        $("#city").selectpicker('refresh');
        $("#cityDiv").prop('hidden',false);
      });

      
    //Subjects and classes
    var classHtml = '<option value="" disabled selected>Select Class</option>';
    var subjectHtml = '';
    $.ajax({
      type: 'GET',
      url: baseUrl+"/config",
      async:false,
      //dataType: "json",
      contentType: "application/json;charset=utf-8",
      success: function(resultData) { 
          console.log(resultData);
          for(var i=0; i<resultData.classes.length; i++){
            classHtml += '<option value="'+resultData.classes[i].id+'">'+resultData.classes[i].name+'</option>';
          }
          for(var i=0; i<resultData.subjects.length; i++){
            subjectHtml += '<option value="'+resultData.subjects[i].id+'">'+resultData.subjects[i].name+'</option>';
          }
        }
      });
      $("#chooseClass").html(classHtml).selectpicker('refresh');
      $("#chooseSubject").html(subjectHtml).selectpicker('refresh');

    //pin code function
    //   function geolocate(pin) {
    //         $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBtGukLEI9n9lX-R2b3_2ARwJq4lA-yR0g&address="+pin+"&sensor=true",function(data){
    //           console.log(data)  
    //           // $("#address").val(data.results[0].formatted_address);
    //           //   console.log(data.results[0].formatted_address+" dsdsdds");
    //         });
    //   }	
    
    // $("#pinCode").on('blur',function(){
    //     var pin = $(this).val();
    //     geolocate(pin);
    // });


      $("#submit").click(function(){
          var error = false;  
          $(this).parents('.fieldset').find('select,input').each(function () {
            if ($(this).is(":visible") && ($(this).val() == null || $(this).val() == "")) {
                $(this).addClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#d03e3e");
                error = true;
                showToast("All fields are Mandatory");
            } else {
                $(this).removeClass('input-error');
                $(this).closest(".bootstrap-select").find(".dropdown-toggle").css("border-color","#ccc");
            }
          });
          if($(".tutorType").is(":visible")){
            var tutorType = [];
              $('.tutorType').each(function(){
                if($(this).is(':checked')){
                  tutorType.push($(this).val());
                }
            });
            if(tutorType.length == 0){
              error = true;
              showToast("Please atleast one Mode of Teaching");
            }
          }
          if(!error){
            var name = $("#name").val();
            var location = $("#location").val(); 
            var mobile = $("#mobileNumber").val(); 
            var email = $("#email").val();   
            var classes = $("#chooseClass").val(); 
            var subjects = $("#chooseSubject").val();
            var mapping = [];
            for(var i=0; i<subjects.length;i++){
              mapping.push({"classGroup": {"id": classes},"subjectMaster": {"id": subjects[i]}})
            }
            var mappingStr = JSON.stringify(mapping);
            var chooseGender = $("#chooseGender").val(); 
            var qualification = $("#qualification").val();
            if(qualification == "OTHER"){
              qualification = $("#otherQualification").val();
            }
            var zipCodeVal = $("#pinCode").val();
            var zipCodeArr = [];
            zipCodeArr.push({"zip":zipCodeVal});           
            var zipCode = JSON.stringify(zipCodeArr);
            var whatsappNumber = $("#whatsappNumber").val();
            var tutorType = [];
            $('.tutorType').each(function(){
              if($(this).is(':checked')){
                tutorType.push({"teacherType" : $(this).val()});
              }
            });
            var tutorTypeStr = JSON.stringify(tutorType);
            var state = $("#states").val();
            var city = $("#city").val();
            var dob = $("#dob").val();
            var jobType = $("#jobType").val();
            var partTimeReason = $("#partTimeReason").val();
            var teachingExperience = $("#teachingExperience").val();
            var fluencyInEnglish = $("#fluencyInEnglish").val();
            var data = '{"id":null,"name":"'+name+'","location":"'+location+'","mobile":"'+mobile+'",';
            data += '"email":"'+email+'","zipCode":'+zipCode+',"city":"'+city+'","state":"'+state+'",';
            data += '"types":'+tutorTypeStr+',"mapping":'+mappingStr+',"gender":"'+chooseGender+'",';
            data += '"qualification":"'+qualification+'","whatsappNumber":"'+whatsappNumber+'","dob":"'+dob+'",';
            data += '"jobType":"'+jobType+'","partTimeReason":"'+partTimeReason+'",';
            data += '"fluencyInEnglish":"'+fluencyInEnglish+'","experience":"'+teachingExperience+'"}';
            console.log(data)
            $.ajax({
                type: 'POST',
                url: baseUrl+"/tutor",
                contentType: "application/json;charset=utf-8",
                data: data,
                success: function(resultData) { 
                    console.log(resultData);
                    localStorage.setItem("userName",resultData.detail.name);
                    localStorage.setItem("type",resultData.type);
                    localStorage.setItem("userId",resultData.refId);
                    localStorage.setItem("from_reg","Yes");
                    window.location.href = '/dashboard/tutor/'+resultData.refId;
                 },
                 error: function(resultData){
                   showToast("Something went wrong at server side, Please try after sometime.")
                 }
            });  
          }
      });
      $('.fieldset').find('select,input').change(function(){
        $(this).removeClass('input-error');
        $(this).closest('.form-group').find('.errorText').remove();
      });

      //general functions
      function showToast(data) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerText = data;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
      $(document).on('change','.selectpicker',function() {
        $(this).next().blur();
      });
  }

}
