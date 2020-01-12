import { Injectable } from '@angular/core';
import  { Subject, from } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
declare var $, moment
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})

export class ServerService {
  auth: boolean
  utilisateur: any
  canBet: Boolean
  public allusers
  server1 = 'http://localhost'
  server2= 'https://kazimo.ga/cashapp'
  url = this.server2+'/phpcashapp/setParis.php';
  url2 = this.server2+'/phpcashapp/setUser.php';
  url3 = this.server2+'/phpcashapp/login.php';
  url4 = this.server2+'/phpcashapp/getallparis.php';
  url5 = this.server2+'/phpcashapp/setParieur.php';
  url6 = this.server2+'/phpcashapp/updatePari.php';
  url7 = this.server2+'/phpcashapp/getNotification.php';
  url8 = this.server2+'/phpcashapp/pusher.php';
  url9 = this.server2+'/phpcashapp/getChat.php';
  url10 = this.server2+'/phpcashapp/setChat.php';
  url11 = this.server2+'/phpcashapp/changeEtatNotification.php';
  url12 = this.server2+'/phpcashapp/getAllUser.php';
  url13 = this.server2+'/phpcashapp/responseParieur.php';
  url14 = this.server2+'/phpcashapp/setFollow.php';
  url15 = this.server2+'/phpcashapp/getSignal.php';
  // option = new RequestOptions();
  header = new HttpHeaders({'Content-Type': 'application/json', "Accept": 'application/json'})
  constructor(public http: HttpClient) {
  }
  // private paris=[]
  public paris = []
  parisSubscription = new Subject();
  canBetSubscription = new Subject();
  badgeSubscription = new Subject();
  notifSubscriber = new Subject();
  notifications: any = []
  chatSubscription = new Subject()
  chat = []
  badgeUser
  allusersubscription = new Subject()
  signal
  countrycode= [{"name":"Afghanistan","flag":"🇦🇫","code":"AF","dial_code":"+93"},{"name":"Åland Islands","flag":"🇦🇽","code":"AX","dial_code":"+358"},{"name":"Albania","flag":"🇦🇱","code":"AL","dial_code":"+355"},{"name":"Algeria","flag":"🇩🇿","code":"DZ","dial_code":"+213"},{"name":"American Samoa","flag":"🇦🇸","code":"AS","dial_code":"+1684"},{"name":"Andorra","flag":"🇦🇩","code":"AD","dial_code":"+376"},{"name":"Angola","flag":"🇦🇴","code":"AO","dial_code":"+244"},{"name":"Anguilla","flag":"🇦🇮","code":"AI","dial_code":"+1264"},{"name":"Antarctica","flag":"🇦🇶","code":"AQ","dial_code":"+672"},{"name":"Antigua and Barbuda","flag":"🇦🇬","code":"AG","dial_code":"+1268"},{"name":"Argentina","flag":"🇦🇷","code":"AR","dial_code":"+54"},{"name":"Armenia","flag":"🇦🇲","code":"AM","dial_code":"+374"},{"name":"Aruba","flag":"🇦🇼","code":"AW","dial_code":"+297"},{"name":"Australia","flag":"🇦🇺","code":"AU","dial_code":"+61"},{"name":"Austria","flag":"🇦🇹","code":"AT","dial_code":"+43"},{"name":"Azerbaijan","flag":"🇦🇿","code":"AZ","dial_code":"+994"},{"name":"Bahamas","flag":"🇧🇸","code":"BS","dial_code":"+1242"},{"name":"Bahrain","flag":"🇧🇭","code":"BH","dial_code":"+973"},{"name":"Bangladesh","flag":"🇧🇩","code":"BD","dial_code":"+880"},{"name":"Barbados","flag":"🇧🇧","code":"BB","dial_code":"+1246"},{"name":"Belarus","flag":"🇧🇾","code":"BY","dial_code":"+375"},{"name":"Belgium","flag":"🇧🇪","code":"BE","dial_code":"+32"},{"name":"Belize","flag":"🇧🇿","code":"BZ","dial_code":"+501"},{"name":"Benin","flag":"🇧🇯","code":"BJ","dial_code":"+229"},{"name":"Bermuda","flag":"🇧🇲","code":"BM","dial_code":"+1441"},{"name":"Bhutan","flag":"🇧🇹","code":"BT","dial_code":"+975"},{"name":"Bolivia, Plurinational State of bolivia","flag":"🇧🇴","code":"BO","dial_code":"+591"},{"name":"Bosnia and Herzegovina","flag":"🇧🇦","code":"BA","dial_code":"+387"},{"name":"Botswana","flag":"🇧🇼","code":"BW","dial_code":"+267"},{"name":"Bouvet Island","flag":"🇧🇻","code":"BV","dial_code":"+47"},{"name":"Brazil","flag":"🇧🇷","code":"BR","dial_code":"+55"},{"name":"British Indian Ocean Territory","flag":"🇮🇴","code":"IO","dial_code":"+246"},{"name":"Brunei Darussalam","flag":"🇧🇳","code":"BN","dial_code":"+673"},{"name":"Bulgaria","flag":"🇧🇬","code":"BG","dial_code":"+359"},{"name":"Burkina Faso","flag":"🇧🇫","code":"BF","dial_code":"+226"},{"name":"Burundi","flag":"🇧🇮","code":"BI","dial_code":"+257"},{"name":"Cambodia","flag":"🇰🇭","code":"KH","dial_code":"+855"},{"name":"Cameroon","flag":"🇨🇲","code":"CM","dial_code":"+237"},{"name":"Canada","flag":"🇨🇦","code":"CA","dial_code":"+1"},{"name":"Cape Verde","flag":"🇨🇻","code":"CV","dial_code":"+238"},{"name":"Cayman Islands","flag":"🇰🇾","code":"KY","dial_code":"+345"},{"name":"Central African Republic","flag":"🇨🇫","code":"CF","dial_code":"+236"},{"name":"Chad","flag":"🇹🇩","code":"TD","dial_code":"+235"},{"name":"Chile","flag":"🇨🇱","code":"CL","dial_code":"+56"},{"name":"China","flag":"🇨🇳","code":"CN","dial_code":"+86"},{"name":"Christmas Island","flag":"🇨🇽","code":"CX","dial_code":"+61"},{"name":"Cocos (Keeling) Islands","flag":"🇨🇨","code":"CC","dial_code":"+61"},{"name":"Colombia","flag":"🇨🇴","code":"CO","dial_code":"+57"},{"name":"Comoros","flag":"🇰🇲","code":"KM","dial_code":"+269"},{"name":"Congo","flag":"🇨🇬","code":"CG","dial_code":"+242"},{"name":"Congo, The Democratic Republic of the Congo","flag":"🇨🇩","code":"CD","dial_code":"+243"},{"name":"Cook Islands","flag":"🇨🇰","code":"CK","dial_code":"+682"},{"name":"Costa Rica","flag":"🇨🇷","code":"CR","dial_code":"+506"},{"name":"Cote d'Ivoire","flag":"🇨🇮","code":"CI","dial_code":"+225"},{"name":"Croatia","flag":"🇭🇷","code":"HR","dial_code":"+385"},{"name":"Cuba","flag":"🇨🇺","code":"CU","dial_code":"+53"},{"name":"Cyprus","flag":"🇨🇾","code":"CY","dial_code":"+357"},{"name":"Czech Republic","flag":"🇨🇿","code":"CZ","dial_code":"+420"},{"name":"Denmark","flag":"🇩🇰","code":"DK","dial_code":"+45"},{"name":"Djibouti","flag":"🇩🇯","code":"DJ","dial_code":"+253"},{"name":"Dominica","flag":"🇩🇲","code":"DM","dial_code":"+1767"},{"name":"Dominican Republic","flag":"🇩🇴","code":"DO","dial_code":"+1849"},{"name":"Ecuador","flag":"🇪🇨","code":"EC","dial_code":"+593"},{"name":"Egypt","flag":"🇪🇬","code":"EG","dial_code":"+20"},{"name":"El Salvador","flag":"🇸🇻","code":"SV","dial_code":"+503"},{"name":"Equatorial Guinea","flag":"🇬🇶","code":"GQ","dial_code":"+240"},{"name":"Eritrea","flag":"🇪🇷","code":"ER","dial_code":"+291"},{"name":"Estonia","flag":"🇪🇪","code":"EE","dial_code":"+372"},{"name":"Ethiopia","flag":"🇪🇹","code":"ET","dial_code":"+251"},{"name":"Falkland Islands (Malvinas)","flag":"🇫🇰","code":"FK","dial_code":"+500"},{"name":"Faroe Islands","flag":"🇫🇴","code":"FO","dial_code":"+298"},{"name":"Fiji","flag":"🇫🇯","code":"FJ","dial_code":"+679"},{"name":"Finland","flag":"🇫🇮","code":"FI","dial_code":"+358"},{"name":"France","flag":"🇫🇷","code":"FR","dial_code":"+33"},{"name":"French Guiana","flag":"🇬🇫","code":"GF","dial_code":"+594"},{"name":"French Polynesia","flag":"🇵🇫","code":"PF","dial_code":"+689"},{"name":"French Southern Territories","flag":"🇹🇫","code":"TF","dial_code":"+262"},{"name":"Gabon","flag":"🇬🇦","code":"GA","dial_code":"+241"},{"name":"Gambia","flag":"🇬🇲","code":"GM","dial_code":"+220"},{"name":"Georgia","flag":"🇬🇪","code":"GE","dial_code":"+995"},{"name":"Germany","flag":"🇩🇪","code":"DE","dial_code":"+49"},{"name":"Ghana","flag":"🇬🇭","code":"GH","dial_code":"+233"},{"name":"Gibraltar","flag":"🇬🇮","code":"GI","dial_code":"+350"},{"name":"Greece","flag":"🇬🇷","code":"GR","dial_code":"+30"},{"name":"Greenland","flag":"🇬🇱","code":"GL","dial_code":"+299"},{"name":"Grenada","flag":"🇬🇩","code":"GD","dial_code":"+1473"},{"name":"Guadeloupe","flag":"🇬🇵","code":"GP","dial_code":"+590"},{"name":"Guam","flag":"🇬🇺","code":"GU","dial_code":"+1671"},{"name":"Guatemala","flag":"🇬🇹","code":"GT","dial_code":"+502"},{"name":"Guernsey","flag":"🇬🇬","code":"GG","dial_code":"+44"},{"name":"Guinea","flag":"🇬🇳","code":"GN","dial_code":"+224"},{"name":"Guinea-Bissau","flag":"🇬🇼","code":"GW","dial_code":"+245"},{"name":"Guyana","flag":"🇬🇾","code":"GY","dial_code":"+592"},{"name":"Haiti","flag":"🇭🇹","code":"HT","dial_code":"+509"},{"name":"Heard Island and Mcdonald Islands","flag":"🇭🇲","code":"HM","dial_code":"+672"},{"name":"Holy See (Vatican City State)","flag":"🇻🇦","code":"VA","dial_code":"+379"},{"name":"Honduras","flag":"🇭🇳","code":"HN","dial_code":"+504"},{"name":"Hong Kong","flag":"🇭🇰","code":"HK","dial_code":"+852"},{"name":"Hungary","flag":"🇭🇺","code":"HU","dial_code":"+36"},{"name":"Iceland","flag":"🇮🇸","code":"IS","dial_code":"+354"},{"name":"India","flag":"🇮🇳","code":"IN","dial_code":"+91"},{"name":"Indonesia","flag":"🇮🇩","code":"ID","dial_code":"+62"},{"name":"Iran, Islamic Republic of Persian Gulf","flag":"🇮🇷","code":"IR","dial_code":"+98"},{"name":"Iraq","flag":"🇮🇶","code":"IQ","dial_code":"+964"},{"name":"Ireland","flag":"🇮🇪","code":"IE","dial_code":"+353"},{"name":"Isle of Man","flag":"🇮🇲","code":"IM","dial_code":"+44"},{"name":"Israel","flag":"🇮🇱","code":"IL","dial_code":"+972"},{"name":"Italy","flag":"🇮🇹","code":"IT","dial_code":"+39"},{"name":"Jamaica","flag":"🇯🇲","code":"JM","dial_code":"+1876"},{"name":"Japan","flag":"🇯🇵","code":"JP","dial_code":"+81"},{"name":"Jersey","flag":"🇯🇪","code":"JE","dial_code":"+44"},{"name":"Jordan","flag":"🇯🇴","code":"JO","dial_code":"+962"},{"name":"Kazakhstan","flag":"🇰🇿","code":"KZ","dial_code":"+7"},{"name":"Kenya","flag":"🇰🇪","code":"KE","dial_code":"+254"},{"name":"Kiribati","flag":"🇰🇮","code":"KI","dial_code":"+686"},{"name":"Korea, Democratic People's Republic of Korea","flag":"🇰🇵","code":"KP","dial_code":"+850"},{"name":"Korea, Republic of South Korea","flag":"🇰🇷","code":"KR","dial_code":"+82"},{"name":"Kosovo","flag":"🇽🇰","code":"XK","dial_code":"+383"},{"name":"Kuwait","flag":"🇰🇼","code":"KW","dial_code":"+965"},{"name":"Kyrgyzstan","flag":"🇰🇬","code":"KG","dial_code":"+996"},{"name":"Laos","flag":"🇱🇦","code":"LA","dial_code":"+856"},{"name":"Latvia","flag":"🇱🇻","code":"LV","dial_code":"+371"},{"name":"Lebanon","flag":"🇱🇧","code":"LB","dial_code":"+961"},{"name":"Lesotho","flag":"🇱🇸","code":"LS","dial_code":"+266"},{"name":"Liberia","flag":"🇱🇷","code":"LR","dial_code":"+231"},{"name":"Libyan Arab Jamahiriya","flag":"🇱🇾","code":"LY","dial_code":"+218"},{"name":"Liechtenstein","flag":"🇱🇮","code":"LI","dial_code":"+423"},{"name":"Lithuania","flag":"🇱🇹","code":"LT","dial_code":"+370"},{"name":"Luxembourg","flag":"🇱🇺","code":"LU","dial_code":"+352"},{"name":"Macao","flag":"🇲🇴","code":"MO","dial_code":"+853"},{"name":"Macedonia","flag":"🇲🇰","code":"MK","dial_code":"+389"},{"name":"Madagascar","flag":"🇲🇬","code":"MG","dial_code":"+261"},{"name":"Malawi","flag":"🇲🇼","code":"MW","dial_code":"+265"},{"name":"Malaysia","flag":"🇲🇾","code":"MY","dial_code":"+60"},{"name":"Maldives","flag":"🇲🇻","code":"MV","dial_code":"+960"},{"name":"Mali","flag":"🇲🇱","code":"ML","dial_code":"+223"},{"name":"Malta","flag":"🇲🇹","code":"MT","dial_code":"+356"},{"name":"Marshall Islands","flag":"🇲🇭","code":"MH","dial_code":"+692"},{"name":"Martinique","flag":"🇲🇶","code":"MQ","dial_code":"+596"},{"name":"Mauritania","flag":"🇲🇷","code":"MR","dial_code":"+222"},{"name":"Mauritius","flag":"🇲🇺","code":"MU","dial_code":"+230"},{"name":"Mayotte","flag":"🇾🇹","code":"YT","dial_code":"+262"},{"name":"Mexico","flag":"🇲🇽","code":"MX","dial_code":"+52"},{"name":"Micronesia, Federated States of Micronesia","flag":"🇫🇲","code":"FM","dial_code":"+691"},{"name":"Moldova","flag":"🇲🇩","code":"MD","dial_code":"+373"},{"name":"Monaco","flag":"🇲🇨","code":"MC","dial_code":"+377"},{"name":"Mongolia","flag":"🇲🇳","code":"MN","dial_code":"+976"},{"name":"Montenegro","flag":"🇲🇪","code":"ME","dial_code":"+382"},{"name":"Montserrat","flag":"🇲🇸","code":"MS","dial_code":"+1664"},{"name":"Morocco","flag":"🇲🇦","code":"MA","dial_code":"+212"},{"name":"Mozambique","flag":"🇲🇿","code":"MZ","dial_code":"+258"},{"name":"Myanmar","flag":"🇲🇲","code":"MM","dial_code":"+95"},{"name":"Namibia","flag":"🇳🇦","code":"NA","dial_code":"+264"},{"name":"Nauru","flag":"🇳🇷","code":"NR","dial_code":"+674"},{"name":"Nepal","flag":"🇳🇵","code":"NP","dial_code":"+977"},{"name":"Netherlands","flag":"🇳🇱","code":"NL","dial_code":"+31"},{"name":"Netherlands Antilles","flag":"","code":"AN","dial_code":"+599"},{"name":"New Caledonia","flag":"🇳🇨","code":"NC","dial_code":"+687"},{"name":"New Zealand","flag":"🇳🇿","code":"NZ","dial_code":"+64"},{"name":"Nicaragua","flag":"🇳🇮","code":"NI","dial_code":"+505"},{"name":"Niger","flag":"🇳🇪","code":"NE","dial_code":"+227"},{"name":"Nigeria","flag":"🇳🇬","code":"NG","dial_code":"+234"},{"name":"Niue","flag":"🇳🇺","code":"NU","dial_code":"+683"},{"name":"Norfolk Island","flag":"🇳🇫","code":"NF","dial_code":"+672"},{"name":"Northern Mariana Islands","flag":"🇲🇵","code":"MP","dial_code":"+1670"},{"name":"Norway","flag":"🇳🇴","code":"NO","dial_code":"+47"},{"name":"Oman","flag":"🇴🇲","code":"OM","dial_code":"+968"},{"name":"Pakistan","flag":"🇵🇰","code":"PK","dial_code":"+92"},{"name":"Palau","flag":"🇵🇼","code":"PW","dial_code":"+680"},{"name":"Palestinian Territory, Occupied","flag":"🇵🇸","code":"PS","dial_code":"+970"},{"name":"Panama","flag":"🇵🇦","code":"PA","dial_code":"+507"},{"name":"Papua New Guinea","flag":"🇵🇬","code":"PG","dial_code":"+675"},{"name":"Paraguay","flag":"🇵🇾","code":"PY","dial_code":"+595"},{"name":"Peru","flag":"🇵🇪","code":"PE","dial_code":"+51"},{"name":"Philippines","flag":"🇵🇭","code":"PH","dial_code":"+63"},{"name":"Pitcairn","flag":"🇵🇳","code":"PN","dial_code":"+64"},{"name":"Poland","flag":"🇵🇱","code":"PL","dial_code":"+48"},{"name":"Portugal","flag":"🇵🇹","code":"PT","dial_code":"+351"},{"name":"Puerto Rico","flag":"🇵🇷","code":"PR","dial_code":"+1939"},{"name":"Qatar","flag":"🇶🇦","code":"QA","dial_code":"+974"},{"name":"Romania","flag":"🇷🇴","code":"RO","dial_code":"+40"},{"name":"Russia","flag":"🇷🇺","code":"RU","dial_code":"+7"},{"name":"Rwanda","flag":"🇷🇼","code":"RW","dial_code":"+250"},{"name":"Reunion","flag":"🇷🇪","code":"RE","dial_code":"+262"},{"name":"Saint Barthelemy","flag":"🇧🇱","code":"BL","dial_code":"+590"},{"name":"Saint Helena, Ascension and Tristan Da Cunha","flag":"🇸🇭","code":"SH","dial_code":"+290"},{"name":"Saint Kitts and Nevis","flag":"🇰🇳","code":"KN","dial_code":"+1869"},{"name":"Saint Lucia","flag":"🇱🇨","code":"LC","dial_code":"+1758"},{"name":"Saint Martin","flag":"🇲🇫","code":"MF","dial_code":"+590"},{"name":"Saint Pierre and Miquelon","flag":"🇵🇲","code":"PM","dial_code":"+508"},{"name":"Saint Vincent and the Grenadines","flag":"🇻🇨","code":"VC","dial_code":"+1784"},{"name":"Samoa","flag":"🇼🇸","code":"WS","dial_code":"+685"},{"name":"San Marino","flag":"🇸🇲","code":"SM","dial_code":"+378"},{"name":"Sao Tome and Principe","flag":"🇸🇹","code":"ST","dial_code":"+239"},{"name":"Saudi Arabia","flag":"🇸🇦","code":"SA","dial_code":"+966"},{"name":"Senegal","flag":"🇸🇳","code":"SN","dial_code":"+221"},{"name":"Serbia","flag":"🇷🇸","code":"RS","dial_code":"+381"},{"name":"Seychelles","flag":"🇸🇨","code":"SC","dial_code":"+248"},{"name":"Sierra Leone","flag":"🇸🇱","code":"SL","dial_code":"+232"},{"name":"Singapore","flag":"🇸🇬","code":"SG","dial_code":"+65"},{"name":"Slovakia","flag":"🇸🇰","code":"SK","dial_code":"+421"},{"name":"Slovenia","flag":"🇸🇮","code":"SI","dial_code":"+386"},{"name":"Solomon Islands","flag":"🇸🇧","code":"SB","dial_code":"+677"},{"name":"Somalia","flag":"🇸🇴","code":"SO","dial_code":"+252"},{"name":"South Africa","flag":"🇿🇦","code":"ZA","dial_code":"+27"},{"name":"South Sudan","flag":"🇸🇸","code":"SS","dial_code":"+211"},{"name":"South Georgia and the South Sandwich Islands","flag":"🇬🇸","code":"GS","dial_code":"+500"},{"name":"Spain","flag":"🇪🇸","code":"ES","dial_code":"+34"},{"name":"Sri Lanka","flag":"🇱🇰","code":"LK","dial_code":"+94"},{"name":"Sudan","flag":"🇸🇩","code":"SD","dial_code":"+249"},{"name":"Suriname","flag":"🇸🇷","code":"SR","dial_code":"+597"},{"name":"Svalbard and Jan Mayen","flag":"🇸🇯","code":"SJ","dial_code":"+47"},{"name":"Swaziland","flag":"🇸🇿","code":"SZ","dial_code":"+268"},{"name":"Sweden","flag":"🇸🇪","code":"SE","dial_code":"+46"},{"name":"Switzerland","flag":"🇨🇭","code":"CH","dial_code":"+41"},{"name":"Syrian Arab Republic","flag":"🇸🇾","code":"SY","dial_code":"+963"},{"name":"Taiwan","flag":"🇹🇼","code":"TW","dial_code":"+886"},{"name":"Tajikistan","flag":"🇹🇯","code":"TJ","dial_code":"+992"},{"name":"Tanzania, United Republic of Tanzania","flag":"🇹🇿","code":"TZ","dial_code":"+255"},{"name":"Thailand","flag":"🇹🇭","code":"TH","dial_code":"+66"},{"name":"Timor-Leste","flag":"🇹🇱","code":"TL","dial_code":"+670"},{"name":"Togo","flag":"🇹🇬","code":"TG","dial_code":"+228"},{"name":"Tokelau","flag":"🇹🇰","code":"TK","dial_code":"+690"},{"name":"Tonga","flag":"🇹🇴","code":"TO","dial_code":"+676"},{"name":"Trinidad and Tobago","flag":"🇹🇹","code":"TT","dial_code":"+1868"},{"name":"Tunisia","flag":"🇹🇳","code":"TN","dial_code":"+216"},{"name":"Turkey","flag":"🇹🇷","code":"TR","dial_code":"+90"},{"name":"Turkmenistan","flag":"🇹🇲","code":"TM","dial_code":"+993"},{"name":"Turks and Caicos Islands","flag":"🇹🇨","code":"TC","dial_code":"+1649"},{"name":"Tuvalu","flag":"🇹🇻","code":"TV","dial_code":"+688"},{"name":"Uganda","flag":"🇺🇬","code":"UG","dial_code":"+256"},{"name":"Ukraine","flag":"🇺🇦","code":"UA","dial_code":"+380"},{"name":"United Arab Emirates","flag":"🇦🇪","code":"AE","dial_code":"+971"},{"name":"United Kingdom","flag":"🇬🇧","code":"GB","dial_code":"+44"},{"name":"United States","flag":"🇺🇸","code":"US","dial_code":"+1"},{"name":"Uruguay","flag":"🇺🇾","code":"UY","dial_code":"+598"},{"name":"Uzbekistan","flag":"🇺🇿","code":"UZ","dial_code":"+998"},{"name":"Vanuatu","flag":"🇻🇺","code":"VU","dial_code":"+678"},{"name":"Venezuela, Bolivarian Republic of Venezuela","flag":"🇻🇪","code":"VE","dial_code":"+58"},{"name":"Vietnam","flag":"🇻🇳","code":"VN","dial_code":"+84"},{"name":"Virgin Islands, British","flag":"🇻🇬","code":"VG","dial_code":"+1284"},{"name":"Virgin Islands, U.S.","flag":"🇻🇮","code":"VI","dial_code":"+1340"},{"name":"Wallis and Futuna","flag":"🇼🇫","code":"WF","dial_code":"+681"},{"name":"Yemen","flag":"🇾🇪","code":"YE","dial_code":"+967"},{"name":"Zambia","flag":"🇿🇲","code":"ZM","dial_code":"+260"},{"name":"Zimbabwe","flag":"🇿🇼","code":"ZW","dial_code":"+263"}]
  getuserSubcription() {
    this.allusersubscription.next(this.allusers)
  }
  getChatSubsciption() {
    this.chatSubscription.next(this.chat)
  }
  getNotif() {
    this.notifSubscriber.next(this.notifications)
  }
  getBadge() {
    this.badgeSubscription.next(this.badgeUser)
  }
  getparis() {
    this.parisSubscription.next(this.paris)
  }
  getCanBet() {
    this.canBetSubscription.next(this.canBet)
  }
  changeCanbet() {
    this.canBet = true
    this.getCanBet()
  }
    
   getChat(idExp, idRecp) {
     return new Promise((resolve, reject)=> {
        $.ajax({
            method: 'POST',
            url: this.url9,
            dataType: 'json',
            data: {Exp: idExp, Recep: idRecp},
            success: (res)=>{
              this.chat = res
              this.getChatSubsciption()
              resolve(res)
            },
            error: (err)=> {
                reject("Une erreur s'est passé durant la requete du chat de recuperation du chat "+ err)
            }
          })
     })
       
  }
  changeEtat(id) {
    $.post(this.url11, {'id': id}).done(function(){
        console.log('l\'etat a été changé avec succès !')
    })
    for(var i=0;i<this.notifications;i++) {
      if(this.notifications[i]==id) {
        this.notifications[i].etat=1
        break
      }
    }
    this.getNotif()
    console.log('noooo ', this.notifications)
  }
  getsignal(user, victime, motif) {
    return new Promise((resolve, reject)=> {
      $.ajax({
        method: 'POST',
        url: this.url15,
        dataType: 'json',
        data: {'id_user': user, 'victime': victime, 'motif': motif},
        success: (e)=> {
          resolve(e)
          this.signal = e.etat
        },
        error: (err)=> {
          reject('erreur lors de la reque de signalement '+ err)
        }
      })
    })
  }
  getAllUsers() {
      return new Promise((resolve, reject)=> {
        $.ajax({
          method: 'POST',
          url: this.url12,
          dataType: 'json'
        }).done(res=> {
          this.allusers = res
          console.log('iiiiiiiiiiiiii ', this.allusers )
          this.getuserSubcription()
          resolve(res)
        }).fail(err=> {
          reject('erreur lors de la recuperation des users '+ err)
        })
      })
  }
  responseParieur(id_fol?, id_user?, id_pari?, reponse?) {
    return new Promise((resolve, reject)=> {
      $.ajax({
        method: 'POST',
        url: this.url13,
        dataType: 'json',
        data: {'id_fol': id_fol, 'id_user': id_user,' id_pari': id_pari, reponse:reponse},
        success: (e)=> {
          this.getAllUsers()
          resolve(e)
        },
        error: err=> {
          reject('erreur survenue lors de l envoi de la requete '+ err)
        }
      })
    })
  }
  setChat(idExp, idRecep, message, dates, chaine,nom, photo, token, senderName, chaine2, dateMoment) {
      $.ajax({
        method: 'POST',
        url: this.url10,
        dataType: 'json',
        data: {'idExp': idExp, 'idRecep': idRecep, 'message': message, 'dates': dates, 'chaine': chaine, 'nom': nom, 'photo': photo, 'chaineRecep': chaine2, 'dateMoment': dateMoment},
        success: (res)=>{
          console.log('message envoyé avec success ! ', res)
          this.sendNotification(token, 'Message de '+nom, senderName+', vous avez reçu un message de '+nom)
        },
        error: (err)=> {
            console.error("Une erreur s'est passé durant la requete du chat de recuperation du chat "+ err)
        }
      })
  }
  sendNotification(token, titre, description) {
    let key="AAAAeNM_Aek:APA91bGwSDIqncH7GHoJxKoLP8iq5OBxkxzO5eO2PJVvlvAraZ8IE7ffUcDw8yelPK94bGvQI57LUXHTaDUEVBe2PfKzE2eajvHC5A8Ssz69ZfecAxNJXtgsC_D5ddkob9vKYkRY8NOh";
    $.ajax({        
      type : 'POST',
      url : "https://fcm.googleapis.com/fcm/send",
      headers : {
          Authorization : 'key=' + key
      },
      contentType : 'application/json',
      dataType: 'json',
      data: JSON.stringify({"to": token, "priority": "high", "notification": {"title":titre,"body":description, "forceStart": "1"}}),
      success : function(response) {
          console.log(response);
      },
      error : function(xhr, status, error) {
          console.log(xhr.error);                   
      }
  });
}
  setPusher() {
    $.ajax({
      method: 'POST',
      url: this.url8,
      data: {'data': 'salut toi'}
    }).done(res=> {
      console.log('success ', res)
    }).fail(err=> {
        console.log('erreur pusher ', err)
    })
  }
     updateRegistration(senderID) {
        return new Promise((resolve, reject)=> {
            $.ajax({
                method: 'POST',
                url: 'https://kazimo.ga/cashapp/phpcashapp/registration.php',
                dataType: 'json',
                data: {registration: senderID, user: this.utilisateur.data.id}
            }).done(res=> {
              resolve(res)
            }).fail(err=> {
              reject('erreur '+ err)
            })
        })
    }
  sutoto() {
    this.getparis()
  }
  //requete de creation d'un nouveau pari
  async setPari(paris) {
    let p = $.ajax({
      url: this.url,
      type: 'POST',
      data: paris
    }).done(res=> {
      let data = JSON.parse(res)
      this.getallparis().then(res=> {
        console.log('le paris ', this.paris , 'resultat ', data)
      })
      this.getparis()
      
      return this.paris
    }).fail(err=> {
      return [{
        'erreur': err
      }]
    })
    return await p;
  }
    //requete de creation d'un nouvel user
    async setUser(user) {
      let dates = moment().format()
      user.dates = dates
      let k = $.ajax({
        method: 'POST',
        url: this.url2,
        data: user
      })
      return await k
    }
    // MAJ des notifs
    setNotifications(notifs) {
      this.notifications = notifs
      this.getNotif()
    }
    // Recuperation des notifications
    getNotification() {
      let id = this.utilisateur.data.id
      let chaine = this.utilisateur.data.chaine_notif
      return new Promise((resolve, reject)=> {
          $.ajax({
              method: "POST",
              url: this.url10,
              dataType: 'json',
              data: {'id_user': id, 'chaine': chaine}
          }).done(rs=> {
            this.notifications = rs.notifications
            this.getNotif()
            resolve(rs)
          }).fail(err=> {
            reject('une erreur est arrivée durant la recuperation des notifications '+ err)
            this.notifications = []
          })
      })
    }
    //Requete pour follow/unfollow
    follow(idProfil, idUser) {
      return new Promise((resolve, reject)=> {
        $.ajax({
          method: 'POST',
          url:this.url14,
          dataType: 'json',
          data: {'id_user': idUser, 'id_ab': idProfil }
        }).done(e=> {
          resolve(e)
          this.getAllUsers()
        }).fail(err=> {
          reject('erreur lors de la soumission du follower '+ err)
        })
      })
    }
    setStorage(user) {
      return new Promise((resolve, reject)=> {
          let log = JSON.parse(localStorage.getItem('user')) || []
          localStorage.setItem('user', JSON.stringify(user))
          this.utilisateur = JSON.parse(localStorage.getItem('user'))
          this.auth = true
          resolve(this.utilisateur)
      }).catch(reject=> {
        alert("une erreur s'est produit "+reject)
      })
    }
    async badge(pari) {
      console.log('le pariii ', pari)
        let e = pari.participants.find((e: any)=> {
        let i = e.id_part ==  this.utilisateur.data.id? true : false
        this.badgeUser = i
        this.getBadge()
       return i
     })
    }
    getStorageUser() {
      let user = JSON.parse(localStorage.getItem('user')) || []
      user.length <=0? this.auth= false:this.auth = true
      this.utilisateur = user
      return {
            user: this.utilisateur,
            auth: this.auth
      }
    }
    logout() {
      localStorage.removeItem('user');
      this.auth = false
    }
    // Requete pour ajouter un nouveau parieur en BDD
    async setParieur(user, id, date, token) {
      user.id_pari = id
      user.date = date
      user.statu = '0'
      for(var i=0;i <this.paris.length;i++) {
        if(this.paris[i].id_p == id) {
          this.paris[i].participants.status = 0
          this.paris[i].participants.push(user)
          break
        }
      }
      this.badgeUser = true
      this.getBadge()
      return new Promise((res, rej)=> {
            const req= $.ajax({
              method: 'POST',
              url: this.url5,
              data: user
            }).done(e=> {
              this.sendNotification(token,'Paticipation', user.nom+' veut participer à ton paris')
              console.log('envoie reussi...')
              this.getparis()
            }).fail(err=> {
              console.log('erreur lors de l\'envoie', err)
            })
          return res(req)
      })
  }

   async getallparis() {
      const req= $.ajax({
        method: 'POST',
        url: this.url4
      }).done(e=> {
       // console.log('voila voila ', e)
      let p  = JSON.parse(e)
      this.paris = p.sort((a, b)=> {
            if (a.id_p < b.id_p ) {
            return 1;
          }
          if (a.id_p > b.id_p ) {
            return -1;
          }
          return 0;
      })
        this.getparis()
      }).fail(err=> {
        console.log('erreur ', err)
      })
      return await req
    }
    updatepari(newValue) {
       for(var i=0;i<this.paris.length;i++) {
         console.log('paris ', this.paris[i].id)
         if(this.paris[i].id_p== newValue.idPari) {
           console.log('trouvé ')
           this.paris[i].visible= newValue.visible
           this.paris[i].voirnum= newValue.voirnum
           this.paris[i].noti_invit= newValue.noti_invit
           this.paris[i].nbparticipant= newValue.nbparticipant
           this.paris[i].invitation= newValue.invitation
           break
         }
       }
       this.getparis()
       $.ajax({
         method: 'POST',
         url: this.url6,
         data: newValue,
         dataType: 'json',
         success: function(res) {
           console.log('mise-à-jour effectuées ', res)
         },
         error: function(err) {
            console.log('une erreur s\'est produite durant l\envoie ', err)
         }
       })
    }
    async login(user) {
      let req = $.ajax({
        method: 'POST',
        url: this.url3,
        data: user
          }).done((res: any)=> {

            }).fail(err=> {
      })
      return await (req)
    }
}
