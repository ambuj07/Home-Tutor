import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-update-education-qualification',
  templateUrl: './update-education-qualification.component.html',
  styleUrls: ['./../update-tutor-profile.component.css']
})
export class UpdateEducationQualificationComponent implements OnInit {

  constructor( private route: ActivatedRoute) {}

  ngOnInit() {
      const baseUrl = environment.baseUrl;
      var id;
      this.route.params.subscribe(params => {
        id = params["id"];
      });
      $("#viewTabName").text("Update Profile");
      $(".sidenav a").removeClass("active");
      $("#editProfile").addClass("active");
      $(document).ready(function() {
        //toggle the component with class accordion_body
        // $(".accordion_head").click(function() {
        //   if ($('.accordion_body').is(':visible')) {
        //     $(".accordion_body").slideUp(300);
        //     $(".plusminus").text('+');
        //   }
        //   if ($(this).next(".accordion_body").is(':visible')) {
        //     $(this).next(".accordion_body").slideUp(300);
        //     $(this).children(".plusminus").text('+');
        //   } else {
        //     $(this).next(".accordion_body").slideDown(300);
        //     $(this).children(".plusminus").text('-');
        //   }
        // });
        $('.selectpicker').selectpicker();
      });
      // Function for update qualification
        //states and city
        var states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];
        var statesHtml = '<option value="" selected disabled>Select</option>';
        for(var i = 0; i< states.length; i++){
          statesHtml += '<option value="'+states[i]+'">'+states[i]+'</option>';
        }
        $(".states").html(statesHtml).selectpicker();

        var cities = ["Adilabad", "Agra", "Ahmedabad", "Ahmednagar", "Aizawl", "Ajitgarh (Mohali)", "Ajmer", "Akola", "Alappuzha", "Aligarh", "Alirajpur", "Allahabad", "Almora", "Alwar", "Ambala", "Ambedkar Nagar", "Amravati", "Amreli district", "Amritsar", "Anand", "Anantapur", "Anantnag", "Angul", "Anjaw", "Anuppur", "Araria", "Ariyalur", "Arwal", "Ashok Nagar", "Auraiya", "Aurangabad", "Aurangabad", "Azamgarh", "Badgam", "Bagalkot", "Bageshwar", "Bagpat", "Bahraich", "Baksa", "Balaghat", "Balangir", "Balasore", "Ballia", "Balrampur", "Banaskantha", "Banda", "Bandipora", "Bangalore Rural", "Bangalore Urban", "Banka", "Bankura", "Banswara", "Barabanki", "Baramulla", "Baran", "Bardhaman", "Bareilly", "Bargarh (Baragarh)", "Barmer", "Barnala", "Barpeta", "Barwani", "Bastar", "Basti", "Bathinda", "Beed", "Begusarai", "Belgaum", "Bellary", "Betul", "Bhadrak", "Bhagalpur", "Bhandara", "Bharatpur", "Bharuch", "Bhavnagar", "Bhilwara", "Bhind", "Bhiwani", "Bhojpur", "Bhopal", "Bidar", "Bijapur", "Bijapur", "Bijnor", "Bikaner", "Bilaspur", "Bilaspur", "Birbhum", "Bishnupur", "Bokaro", "Bongaigaon", "Boudh (Bauda)", "Budaun", "Bulandshahr", "Buldhana", "Bundi", "Burhanpur", "Buxar", "Cachar", "Central Delhi", "Chamarajnagar", "Chamba", "Chamoli", "Champawat", "Champhai", "Chandauli", "Chandel", "Chandigarh", "Chandrapur", "Changlang", "Chatra", "Chennai", "Chhatarpur", "Chhatrapati Shahuji Maharaj Nagar", "Chhindwara", "Chikkaballapur", "Chikkamagaluru", "Chirang", "Chitradurga", "Chitrakoot", "Chittoor", "Chittorgarh", "Churachandpur", "Churu", "Coimbatore", "Cooch Behar", "Cuddalore", "Cuttack", "Dadra and Nagar Haveli", "Dahod", "Dakshin Dinajpur", "Dakshina Kannada", "Daman", "Damoh", "Dantewada", "Darbhanga", "Darjeeling", "Darrang", "Datia", "Dausa", "Davanagere", "Debagarh (Deogarh)", "Dehradun", "Deoghar", "Deoria", "Dewas", "Dhalai", "Dhamtari", "Dhanbad", "Dhar", "Dharmapuri", "Dharwad", "Dhemaji", "Dhenkanal", "Dholpur", "Dhubri", "Dhule", "Dibang Valley", "Dibrugarh", "Dima Hasao", "Dimapur", "Dindigul", "Dindori", "Diu", "Doda", "Dumka", "Dungapur", "Durg", "East Champaran", "East Delhi", "East Garo Hills", "East Khasi Hills", "East Siang", "East Sikkim", "East Singhbhum", "Eluru", "Ernakulam", "Erode", "Etah", "Etawah", "Faizabad", "Faridabad", "Faridkot", "Farrukhabad", "Fatehabad", "Fatehgarh Sahib", "Fatehpur", "Fazilka", "Firozabad", "Firozpur", "Gadag", "Gadchiroli", "Gajapati", "Ganderbal", "Gandhinagar", "Ganganagar", "Ganjam", "Garhwa", "Gautam Buddh Nagar", "Gaya", "Ghaziabad", "Ghazipur", "Giridih", "Goalpara", "Godda", "Golaghat", "Gonda", "Gondia", "Gopalganj", "Gorakhpur", "Gulbarga", "Gumla", "Guna", "Guntur", "Gurdaspur", "Gurgaon", "Gwalior", "Hailakandi", "Hamirpur", "Hamirpur", "Hanumangarh", "Harda", "Hardoi", "Haridwar", "Hassan", "Haveri district", "Hazaribag", "Hingoli", "Hissar", "Hooghly", "Hoshangabad", "Hoshiarpur", "Howrah", "Hyderabad", "Hyderabad", "Idukki", "Imphal East", "Imphal West", "Indore", "Jabalpur", "Jagatsinghpur", "Jaintia Hills", "Jaipur", "Jaisalmer", "Jajpur", "Jalandhar", "Jalaun", "Jalgaon", "Jalna", "Jalore", "Jalpaiguri", "Jammu", "Jamnagar", "Jamtara", "Jamui", "Janjgir-Champa", "Jashpur", "Jaunpur district", "Jehanabad", "Jhabua", "Jhajjar", "Jhalawar", "Jhansi", "Jharsuguda", "Jhunjhunu", "Jind", "Jodhpur", "Jorhat", "Junagadh", "Jyotiba Phule Nagar", "Kabirdham (formerly Kawardha)", "Kadapa", "Kaimur", "Kaithal", "Kakinada", "Kalahandi", "Kamrup", "Kamrup Metropolitan", "Kanchipuram", "Kandhamal", "Kangra", "Kanker", "Kannauj", "Kannur", "Kanpur", "Kanshi Ram Nagar", "Kanyakumari", "Kapurthala", "Karaikal", "Karauli", "Karbi Anglong", "Kargil", "Karimganj", "Karimnagar", "Karnal", "Karur", "Kasaragod", "Kathua", "Katihar", "Katni", "Kaushambi", "Kendrapara", "Kendujhar (Keonjhar)", "Khagaria", "Khammam", "Khandwa (East Nimar)", "Khargone (West Nimar)", "Kheda", "Khordha", "Khowai", "Khunti", "Kinnaur", "Kishanganj", "Kishtwar", "Kodagu", "Koderma", "Kohima", "Kokrajhar", "Kolar", "Kolasib", "Kolhapur", "Kolkata", "Kollam", "Koppal", "Koraput", "Korba", "Koriya", "Kota", "Kottayam", "Kozhikode", "Krishna", "Kulgam", "Kullu", "Kupwara", "Kurnool", "Kurukshetra", "Kurung Kumey", "Kushinagar", "Kutch", "Lahaul and Spiti", "Lakhimpur", "Lakhimpur Kheri", "Lakhisarai", "Lalitpur", "Latehar", "Latur", "Lawngtlai", "Leh", "Lohardaga", "Lohit", "Lower Dibang Valley", "Lower Subansiri", "Lucknow", "Ludhiana", "Lunglei", "Madhepura", "Madhubani", "Madurai", "Mahamaya Nagar", "Maharajganj", "Mahasamund", "Mahbubnagar", "Mahe", "Mahendragarh", "Mahoba", "Mainpuri", "Malappuram", "Maldah", "Malkangiri", "Mamit", "Mandi", "Mandla", "Mandsaur", "Mandya", "Mansa", "Marigaon", "Mathura", "Mau", "Mayurbhanj", "Medak", "Meerut", "Mehsana", "Mewat", "Mirzapur", "Moga", "Mokokchung", "Mon", "Moradabad", "Morena", "Mumbai City", "Mumbai suburban", "Munger", "Murshidabad", "Muzaffarnagar", "Muzaffarpur", "Mysore", "Nabarangpur", "Nadia", "Nagaon", "Nagapattinam", "Nagaur", "Nagpur", "Nainital", "Nalanda", "Nalbari", "Nalgonda", "Namakkal", "Nanded", "Nandurbar", "Narayanpur", "Narmada", "Narsinghpur", "Nashik", "Navsari", "Nawada", "Nawanshahr", "Nayagarh", "Neemuch", "Nellore", "New Delhi", "Nilgiris", "Nizamabad", "North 24 Parganas", "North Delhi", "North East Delhi", "North Goa", "North Sikkim", "North Tripura", "North West Delhi", "Nuapada", "Ongole", "Osmanabad", "Pakur", "Palakkad", "Palamu", "Pali", "Palwal", "Panchkula", "Panchmahal", "Panchsheel Nagar district (Hapur)", "Panipat", "Panna", "Papum Pare", "Parbhani", "Paschim Medinipur", "Patan", "Pathanamthitta", "Pathankot", "Patiala", "Patna", "Pauri Garhwal", "Perambalur", "Phek", "Pilibhit", "Pithoragarh", "Pondicherry", "Poonch", "Porbandar", "Pratapgarh", "Pratapgarh", "Pudukkottai", "Pulwama", "Pune", "Purba Medinipur", "Puri", "Purnia", "Purulia", "Raebareli", "Raichur", "Raigad", "Raigarh", "Raipur", "Raisen", "Rajauri", "Rajgarh", "Rajkot", "Rajnandgaon", "Rajsamand", "Ramabai Nagar (Kanpur Dehat)", "Ramanagara", "Ramanathapuram", "Ramban", "Ramgarh", "Rampur", "Ranchi", "Ratlam", "Ratnagiri", "Rayagada", "Reasi", "Rewa", "Rewari", "Ri Bhoi", "Rohtak", "Rohtas", "Rudraprayag", "Rupnagar", "Sabarkantha", "Sagar", "Saharanpur", "Saharsa", "Sahibganj", "Saiha", "Salem", "Samastipur", "Samba", "Sambalpur", "Sangli", "Sangrur", "Sant Kabir Nagar", "Sant Ravidas Nagar", "Saran", "Satara", "Satna", "Sawai Madhopur", "Sehore", "Senapati", "Seoni", "Seraikela Kharsawan", "Serchhip", "Shahdol", "Shahjahanpur", "Shajapur", "Shamli", "Sheikhpura", "Sheohar", "Sheopur", "Shimla", "Shimoga", "Shivpuri", "Shopian", "Shravasti", "Sibsagar", "Siddharthnagar", "Sidhi", "Sikar", "Simdega", "Sindhudurg", "Singrauli", "Sirmaur", "Sirohi", "Sirsa", "Sitamarhi", "Sitapur", "Sivaganga", "Siwan", "Solan", "Solapur", "Sonbhadra", "Sonipat", "Sonitpur", "South 24 Parganas", "South Delhi", "South Garo Hills", "South Goa", "South Sikkim", "South Tripura", "South West Delhi", "Sri Muktsar Sahib", "Srikakulam", "Srinagar", "Subarnapur (Sonepur)", "Sultanpur", "Sundergarh", "Supaul", "Surat", "Surendranagar", "Surguja", "Tamenglong", "Tarn Taran", "Tawang", "Tehri Garhwal", "Thane", "Thanjavur", "The Dangs", "Theni", "Thiruvananthapuram", "Thoothukudi", "Thoubal", "Thrissur", "Tikamgarh", "Tinsukia", "Tirap", "Tiruchirappalli", "Tirunelveli", "Tirupur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Tonk", "Tuensang", "Tumkur", "Udaipur", "Udalguri", "Udham Singh Nagar", "Udhampur", "Udupi", "Ujjain", "Ukhrul", "Umaria", "Una", "Unnao", "Upper Siang", "Upper Subansiri", "Uttar Dinajpur", "Uttara Kannada", "Uttarkashi", "Vadodara", "Vaishali", "Valsad", "Varanasi", "Vellore", "Vidisha", "Viluppuram", "Virudhunagar", "Visakhapatnam", "Vizianagaram", "Vyara", "Warangal", "Wardha", "Washim", "Wayanad", "West Champaran", "West Delhi", "West Garo Hills", "West Kameng", "West Khasi Hills", "West Siang", "West Sikkim", "West Singhbhum", "West Tripura", "Wokha", "Yadgir", "Yamuna Nagar", "Yanam", "Yavatmal", "Zunheboto"];
        var cityHtml = '<option value="" selected disabled>Select Your City</option>';
        for(var i = 0; i<= cities.length; i++){
          cityHtml += '<option value="'+cities[i]+'">'+cities[i]+'</option>';
        }
        $(".city").html(cityHtml).selectpicker();

        $("#saveQualification").click(function(){
            var jsonObj = [];
            var interEduId = $("#intermidiate").find(".eduId").val();
            if(interEduId == "" || interEduId == undefined){
              interEduId = null;
            }
            var interExam = $("#intermidiate").find(".examStream").val();
            var interBoard = $("#intermidiate").find(".board").val();
            var interState = $("#intermidiate").find("select.states").val();
            var interYear = $("#intermidiate").find(".passingYear").val();
            var interMode = $("#intermidiate").find(".modeOfStudy ").val();
            var interMarks = $("#intermidiate").find(".markObtained").val();
            var interType = $("#intermidiate").find(".schoolType").val();
            if(checkNullOrUndefined(interBoard) !="" || checkNullOrUndefined(interExam) != "" || checkNullOrUndefined(interMarks) != "" || checkNullOrUndefined(interState) != "" || checkNullOrUndefined(interType) != "" || checkNullOrUndefined(interYear) != "" || checkNullOrUndefined(interMode) != ""){
              var inter = {"id":interEduId,"degree":"intermidiate","stream":interExam,"board" : interBoard,"state":interState,"year":interYear,"mode":interMode,"marksObtained":interMarks,"type":interType};
              jsonObj.push(inter);
              console.log(jsonObj);
            }

            var gradEduId = $("#graduation").find(".eduId").val();
            if(gradEduId == "" || gradEduId == undefined){
              gradEduId = null;
            }
            var gradExam = $("#graduation").find(".examStream").val();
            var gradBoard = $("#graduation").find(".board").val();
            var gradState = $("#graduation").find("select.states").val();
            var gradYear = $("#graduation").find(".passingYear").val();
            var gradMode = $("#graduation").find(".modeOfStudy ").val();
            var gradMarks = $("#graduation").find(".markObtained").val();
            var gradType = $("#graduation").find(".schoolType").val();
            if(checkNullOrUndefined(gradBoard) != "" || checkNullOrUndefined(gradState) != "" || checkNullOrUndefined(gradExam) != "" || checkNullOrUndefined(gradYear) != "" || checkNullOrUndefined(gradMode) != "" || checkNullOrUndefined(gradType) != "" || checkNullOrUndefined(gradMarks) != ""){
              var graduation = {"id":gradEduId,"degree":"graduation","stream":gradExam,"board" : gradBoard,"state":gradState,"year":gradYear,"mode":gradMode,"marksObtained":gradMarks,"type":gradType};
              jsonObj.push(graduation);
              console.log(jsonObj);
            }

            var masterEduId = $("#master").find(".eduId").val();
            if(masterEduId == "" || masterEduId == undefined){
              masterEduId = null;
            }
            var masterExam = $("#master").find(".examStream").val();
            var masterBoard = $("#master").find(".board").val();
            var masterState = $("#master").find("select.states").val();
            var masterYear = $("#master").find(".passingYear").val();
            var masterMode = $("#master").find(".modeOfStudy ").val();
            var masterMarks = $("#master").find(".markObtained").val();
            var masterType = $("#master").find(".schoolType").val();
            if(checkNullOrUndefined(masterBoard) != "" || checkNullOrUndefined(masterState) != "" || checkNullOrUndefined(masterExam) != "" || checkNullOrUndefined(masterYear) != "" || checkNullOrUndefined(masterMode) != "" || checkNullOrUndefined(masterType) != "" || checkNullOrUndefined(masterMarks) != ""){
              var master = {"id":masterEduId,"degree":"master","stream":masterExam,"board" : masterBoard,"state":masterState,"year":masterYear,"mode":masterMode,"marksObtained":masterMarks,"type":masterType};
              jsonObj.push(master);
              console.log(jsonObj);
            }

            var otherEduId = $("#other").find(".eduId").val();
            if(otherEduId == "" || otherEduId == undefined){
              otherEduId = null;
            }
            var otherExam = $("#other").find(".examStream").val();
            var otherBoard = $("#other").find(".board").val();
            var otherState = $("#other").find("select.states").val();
            var otherYear = $("#other").find(".passingYear").val();
            var otherMode = $("#other").find(".modeOfStudy ").val();
            var otherMarks = $("#other").find(".markObtained").val();
            var otherType = $("#other").find(".schoolType").val();
            if(checkNullOrUndefined(otherBoard) != "" || checkNullOrUndefined(otherState) != "" || checkNullOrUndefined(otherExam) != "" || checkNullOrUndefined(otherYear) != "" || checkNullOrUndefined(otherMode) != "" || checkNullOrUndefined(otherType) != "" || checkNullOrUndefined(otherMarks) != ""){
              var other = {"id":otherEduId,"degree":"other","stream":otherExam,"board" : otherBoard,"state":otherState,"year":otherYear,"mode":otherMode,"marksObtained":otherMarks,"type":otherType};
              jsonObj.push(other);
            }
            if(jsonObj.length > 0){
              $.ajax({
                    type: 'POST',
                    url: baseUrl+"/tutor/"+id+"/education",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(jsonObj),
                    success: function(resultData) { 
                      showToast("Educational Qualifications saved successfully.");
                      setTimeout(function(){ 
                        window.location.href = "tutor/education/"+id;
                      }, 3000);
                    },
                    error :function(resultData){
                      console.log(resultData);
                    }
              });
            }else{
              showToast("You can not save an empty table.");
            }
        });

        $.ajax({
          type: 'GET',
          url: baseUrl+"/tutor/"+id+"/education",
          success: function(resultData) { 
            console.log(resultData);    
            var grouped = {};
            resultData.forEach(function (a) {
              if(a.degree == "intermidiate"){
                $("#intermidiate").find(".eduId").val(a.id);
                $("#intermidiate").find(".examStream").val(a.stream);
                $("#intermidiate").find(".board").val(a.board);
                $("#intermidiate").find("select.states").val(a.state);
                $(".states").selectpicker('refresh');
                $("#intermidiate").find(".passingYear").val(a.year);
                $("#intermidiate").find(".modeOfStudy ").val(a.mode);
                $("#intermidiate").find(".markObtained").val(a.marksObtained);
                $("#intermidiate").find(".schoolType").val(a.type);
              }
              if(a.degree == "graduation"){
                $("#graduation").find(".eduId").val(a.id);
                $("#graduation").find(".examStream").val(a.stream);
                $("#graduation").find(".board").val(a.board);
                $("#graduation").find("select.states").val(a.state);
                $(".states").selectpicker('refresh');
                $("#graduation").find(".passingYear").val(a.year);
                $("#graduation").find(".modeOfStudy ").val(a.mode);
                $("#graduation").find(".markObtained").val(a.marksObtained);
                $("#graduation").find(".schoolType").val(a.type);
              }
              if(a.degree == "master"){
                $("#master").find(".eduId").val(a.id);
                $("#master").find(".examStream").val(a.stream);
                $("#master").find(".board").val(a.board);
                $("#master").find("select.states").val(a.state);
                $(".states").selectpicker('refresh');
                $("#master").find(".passingYear").val(a.year);
                $("#master").find(".modeOfStudy ").val(a.mode);
                $("#master").find(".markObtained").val(a.marksObtained);
                $("#master").find(".schoolType").val(a.type);
              }
              if(a.degree == "other"){
                $("#other").find(".eduId").val(a.id);
                $("#other").find(".examStream").val(a.stream);
                $("#other").find(".board").val(a.board);
                $("#other").find("select.states").val(a.state);
                $(".states").selectpicker('refresh');
                $("#other").find(".passingYear").val(a.year);
                $("#other").find(".modeOfStudy ").val(a.mode);
                $("#other").find(".markObtained").val(a.marksObtained);
                $("#other").find(".schoolType").val(a.type);
              }
            });            
          }
        });
         //general functions
         function showToast(data) {
          var x = document.getElementById("snackbar");
          x.className = "show";
          x.innerText = data;
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        function checkNullOrUndefined(str){
          var blank = "";
          if(str == null || str == undefined){
            return blank;
          }else{
            return str
          }
        }
        $(document).on('change','.selectpicker',function() {
          $(this).next().blur();
        });
  }

}
