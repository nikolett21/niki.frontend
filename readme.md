# Ízhorizon Éttermünk – Az ízek horizontján!
- Készítette: Kővári Nikolett
---
**Frontend**

 
💡 Projektünkbe nagy lendülettel vágtunk bele, több ötletünk volt, hogy miről kellene csinálunk ezt a munkát.
Abban biztosak voltunk hogy weboldalt szeretnénk és abban is hogy valami olyan témát jelenitsünk meg ami mind a kettőnket érdekel vagy van valamilyen személyes élményünk is a dologgal. A Figmás tervezés elég egyszerűen ment, egyértelműen tudtuk mit szeretnénk. Ahogy egyre jobban ástuk bele magunkat egyre több ötlet követte egymást, így született meg a mi tetszésünknek megfelelő terv. 

💡Próbáltunk egy friss, modern weblapot csinálni, benne hagyományos és újkeletű ételekkel. 

---
Az oldal terve Figmában készült kisebb nagyobb változtatásokkal👉 [Figma terv megtekintése](https://www.figma.com/design/ipdP2BYytD8pvShEUWwQOF/Projekt?node-id=0-1&p=f&t=Wqw4hQMBFSGBfEpm-0)

## Tartalomjegyzék
- [Bevezetés](#Bevezetés)
- [Elemek](#Elemek)
- [Technika](#Technika)
- [Struktúra](#Struktúra)
- [Fejleszthető](#Fejleszthető)
- [Hivatkozások](#hivatkozások)

---
## Bevezetés
- Az *index.html* a legelső oldal, ami a már meglévő fiókkal történő bejelentkezést teszi lehetővé.  
- A *registration.html* arra szolgál
ha a felhasználónak nincs esetleg még fiókja akkor lehetősége van a regisztrációra kattintva regisztrálni is új felhasználóként. 
Keresztnév, vezetéknév, email és jelszó mezők kitöltésével.
- A *profile.html* olyan felhasználók számára fejlesztett oldal akik rendelkeznek már fiókkal. Itt tudják módosítani a jelszavukat, profilképüket és a nevüket is.
- A *home.html* a főoldal. Az egész projektnek az alapja. Innen érhető el egy "Részletek" gombra kattintva az ételeink. Látható egy fotó az étteremről illetve a róla adott vélemények is.
---
## Elemek: 
- Navigációs sáv: Profil módosítási lehetőség, Információk az étteremről, Kijelentkezés  
-  Foglalás: Lehetősége van a látogatónak előre foglalni asztalt, mindig csak az adott hónapban. A gombra rákattintba az adott dátumok között tud választani, és napokra leosztva időpontot tud foglalni.
-  Étlap: Az étlap több különböző rétegre van bontva. Minden fogyasztható terméket külön-külön tud megnézni a látogató.
-  Vélemények: A legfrisebb felhasználói vélemények olvashatóak
-  Elérhetőség: Az étterem elérhetősége, és fizetési lehetőségeket láthatunk
-  Az időpont foglalás *naptar.html* oldalon konkrét napot és időpontot tudunk választani az adott hónapban és erről a sikerességéről visszajelzést kapunk a képernyőn felugró ablakban.
- A *galeria.html* oldal ahol minden szükséges információ elérhető az étteremről.
- Az *előételek, levesek, főételek, köretek és savanyúságok, desszertek, kávék* oldalak közötti váltakozás célja, hogy olyan legyen a felhasználónak mintha egy étlapot lapozna. Nyilakkal tettük ezt lehetővé a fejlécben. Minden kategóriában, minden ételnél leírást adtunk arról, hogy kik,
hogyan és miként fogyasztják. Ez úgy válik láthatóvá ha a kurzort az étel
fotója felé visszük.
 ---
## Technika:
 - HTML5 ✅
 - CSS a dizájnhoz ✅
 - Font Awesome az ikonokhoz ✅
 ---
## Struktúra
```markdown
├── html/
│     ├── Admin.html
│     ├── adminful.html
│     ├── desszertek.html
│     ├── Előételek.html
│     ├── Főételek.html
│     ├── galeria.html
│     ├── home.html
│     ├── index.html
│     ├── Kávék.html
│     ├── levesek.html
│     ├── naptar.html
│     ├── profile.html
│     ├── registration.html
│     └── Üdítők.html
├── css/
│   ├── Admin.css
│   ├── bejreg.css
│   ├── desszertek.css
│   ├── eloetelek.css
│   ├── foetelek.css
│   ├── galeria.css
│   ├── home.css
│   ├── index.css
│   ├── kavek.css
│   ├── koretek.css
│   ├── levesek.css
│   ├── naptar.css
│   ├── profile.css
│   ├── registration.css
│   └── uditok.css
├── js/
│   ├── admin.js
│   ├── adminful.js
│   ├── desszertek.js
│   ├──eloetelek.js
│   ├── foetelek.js
│   ├── getfoods.js
│   ├── home_admin.js
│   ├── home.js
│   ├── index.js
│   ├── kavek.js
│   ├── levesek.js
│   ├── naptar.js
│   ├── profile.js
│   ├── registration.js
│   └── uditok.js
└── README.md
```

---
 ## Fejleszthető:
- 🌟 Ételek keresése az oldalak átlapozása nélkül
- 🌟 Online fizetés 
- 🌟 Admin oldal
 ---
## Hivatkozások
🔗  Git Hub
🔗  Netlify
🔗  Chat GPT

