LETAKAN CSS DI dalam <b:skin></b:skin>.
```css
/* Badge Komentar */
[data-author*="https://www.blogger.com/profile/09057214253772093775"] .adminBanner::after {
  content: 'Administrator';
  background: #616bff;
}

/* CSS untuk banner admin link blogger */
/* Banned Member Sign */
[data-author*="Profile_ID_NUMBER"] .bannedMember::after {
  content: "Banned";
  background: darkorange;
}

/* Member Sign */
[data-author*="Profile_ID_NUMBER"] .userBanner::after {
  content: "Member";
  background: #00e575;
}

/* Senior Member */
[data-author*="Profile_ID_NUMBER"] .seniorMember::after {
  content: "Staff Member";
  background: #ff2800;
}

/* Junior Member (fallback atau default user) */
[data-author*=""] .seniorMember::after {
  content: "Junior Member";
  background: #00e575;
}

/* Top Kontributor */
[data-author*="Profile_ID_NUMBER"] .topPoster::after {
  content: "Top Poster";
  background: #0f44f5;
}

/* Buyer Member */
[data-author*="Profile_ID_NUMBER"] .buyer::after {
  content: "Buyer";
  background: #000000;
}

/* Developer Member Aktif */
[data-author*="09171272848542294839"] .developerMember::after,
[data-author*="16537327212291797418"] .developerMember::after {
  content: "Developer";
  background: #9586f7;
}

/* Style Badge Anggota */
[data-author] .userBanner::after,
[data-author] .adminBanner::after,
[data-author] .seniorMember::after,
[data-author] .topPoster::after,
[data-author] .buyer::after,
[data-author] .juniorMember::after,
[data-author] .developerMember::after,
[data-author] .bannedMember::after,
[data-author] .member::after {
  padding: 1px 7px;
  display: inline-block;
  margin-left: 0px;
  font-weight: 600;
  border-radius: 8px;
  font-size: 80%;
  margin-top: 3px;
  color: #fff;
}

/* Badge Khusus Member Customer */
.member-customer {
  background: deepskyblue;
  padding: 1px 10px;
  display: inline;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid transparent;
  font-size: 80%;
  margin-top: 3px;
  color: #fff;
}
```
cari header card komentar thema kamu.
```html
class='comment-header' 
```
setelah ketemu letakan attribute data-author ke samping class comment header
```html
expr:data-author='data:cb.level.authorUrl'
```

terakhir letakan ini bebas dimana saja asalkan tetap didalam element yang memiliki `class='comment-header'`.

```html
 <div class='badgeprofile'>        
 <b:if cond='data:post.author.name == data:cb.level.author'>
   <div class='username-admin'>Admin</div>
   <div class='adminBanner'/>
       <b:else/> 
 <div class='username-member'>Member</div>
<div class='adminBanner'/>
<div class='userBanner'/>
<div class='seniorMember'/>
<div class='juniorMember'/>
<div class='topPoster'/>
<div class='buyer'/>
<div class='developerMember'/>
<div class='bannedMember'/>
    </b:if>
  </div> 
  ```
  
  # CONTOH GAMBAR
  ![Screenshot-20250716-171421](https://i.ibb.co/99YsDPQg/Screenshot-20250716-171421.jpg)