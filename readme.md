# Ízhorizon Éttermünk – Az ízek horizontján!
**Frontend**

- ⚙️ Projektünkbe nagy lendülettel vágtunk bele, több ötletünk volt, hogy miről kellene csinálunk ezt a munkát.
Abban biztosak voltunk hogy weboldalt szeretnénk és abban is hogy valami olyan témát jelenitsünk meg ami mind a kettőnket érdekel vagy van valamilyen személyes élményünk is a dologgal. A figmas tervezés elég egyszerűen ment, egyértelműen tudtuk mit szeretnénk. Ahogy egyre jobban ástuk bele magunkat egyre több ötlet követte egymást, így született meg a mi tetszésünknek megfelelő terv. 

- Próbáltunk egy friss, modern weblapot csinálni, benne hagyományos és előkelő stílussal. ✅

---
Az oldal terve Figmában készült kisebb nagyobb változtatásokkal :
👉 [Figma terv megtekintése](https://www.figma.com/design/ipdP2BYytD8pvShEUWwQOF/Projekt?node-id=0-1&p=f&t=Wqw4hQMBFSGBfEpm-0)

## Tartalomjegyzék
- [Bevezetés](#Bevezetés)
- [Telepítés](#telepítés)
- [Használat](#használat)
- [Dokumentáció](#dokumentáció)
- [Közreműködés](#közreműködés)
- [Licenc](#licenc)
---
# Bevezetés
- ⚙️ index.html 👉 A legelső oldal, egy regisztráció után a bejelentkezés választja el a felhasználót a fő oldaltól. 
![Bejelentkezés](https://i.postimg.cc/FsrcByT7/k-p-2025-04-15-113131522.png)
Ha a felhasználónak nincs esetleg még fiókja akkor lehetősége van a regisztrációra kattintva regisztrálni is új felhasználóként. 
Keresztnév, vezetéknév, email és jelszó mezők.
- ⚙️ registration.html 👉
![Regisztráció](https://i.postimg.cc/yNps7HHM/k-p-2025-04-15-113750861.png)
- ⚙️ profile.html 👉
![Profil szerkesztés](https://i.postimg.cc/BQ2YT9m2/k-p-2025-04-15-121133060.png) 
Regisztrált felhasználók számára::
Profiladatok szerkesztése
Jelszó változtatás
- ⚙️ home.html 👉 A legfőbb oldal. Az egész projektnek az alapja. 
# Főbb elemek: 
- ⚙️ Navigációs sáv: Profil módosítási lehetőség, Információk az étteremről, Kijelentkezés  
- ⚙️ Foglalás: Lehetősége van a látogatónak előre foglalni asztalt, mindig csak az adott hónapban. A gombra rákattintba az adott dátumok között tud választani, és napokra leosztva időpontot tud foglalni.
- ⚙️ Étlap: Az étlap több különböző rétegre van bontva. Minden fogyasztható terméket külön-külön tud megnézni a látogató.
- ⚙️ Vélemények: A legfrisebb felhasználói vélemények.
- ⚙️ Elérhetőség: Az étterem elérhetősége, és fizetési lehetőségek.
![Fő oldal](https://i.postimg.cc/CK9krd15/k-p-2025-04-15-121858309.png)
![Fő oldal](https://i.postimg.cc/x1Cm0LNq/k-p-2025-04-15-121931202.png)
- ⚙️  időpont foglalás 👉 
![Időpont foglalás](https://i.postimg.cc/bwsGX84t/k-p-2025-04-15-122141784.png)
A foglalás sikerességéről visszajelzést kapunk a képernyőn.
![Sikeresség](https://i.postimg.cc/Hk3P8BYj/k-p-2025-04-18-210644934.png)
- ⚙️  galéria 👉 Minden szükséges információ elérhető itt az étteremről.
![Galéria](https://i.postimg.cc/QCdwYPgS/k-p-2025-04-15-153104879.png)
- ⚙️  előételek, levesek, főételek, köretek és savanyúságok, desszertek, kávék 👉
Az oldalak közötti váltakozás mintha egy étlapot lapoznánk. Nyilakkal tettük ezt lehetővé. 
Minden kategóriában, minden ételnek külön leírása van. 
![Ételek és Italok](https://i.postimg.cc/5yP0DZht/k-p-2025-04-15-155129584.png)


 Minden kategóriában, minden ételnél leírást adtunk arról, hogy kik,
hogyan és miként fogyasztják. Ezt úgy tudjuk látni ha a kurzort az étel
fotója felé visszük.
(ide kellene egy kép erről.)
## 📦 Kódblokk
**Íme hogyan oldottuk meg: **
````(úgy emlékszem css-ben van.)
```
```
````
# Technikai megvalósítások:
 HTML5
 CSS a dizájnhoz
 Font Awesome az ikonokhoz
# A projekt struktúrája
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
- │   ├── Admin.css
- │   ├── bejreg.css
- │   ├── desszertek.css
- │   ├── eloetelek.css
- │   ├── foetelek.css
- │   ├── galeria.css
- │   ├── home.css
- │   ├── index.css
- │   ├── kavek.css
- │   ├── koretek.css
- │   ├── levesek.css
- │   ├── naptar.css
- │   ├── profile.css
- │   ├── registration.css
- │   └── uditok.css
- ├── js/
- │   ├── admin.js
- │   ├── adminful.js
- │   ├── desszertek.js
- │   ├──eloetelek.js
- │   ├── foetelek.js
- │   ├── getfoods.js
- │   ├── home_admin.js
- │   ├── home.js
- │   ├── index.js
- │   ├── kavek.js
- │   ├── levesek.js
- │   ├── naptar.js
- │   ├── profile.js
- │   ├── registration.js
- │   └── uditok.js
- └── README.md
 ## Jövőbeli fejlesztések:
- 🌟 Ételek keresése az oldalak átlapozása nélkül
- 🌟 Online fizetés
- 🌟 Admin oldal
# Az oldalon használt hivatkozások
## 🔗 Linkek (kellene a linkje is vagy elég felsorolni?)
🔗  Deepseek
🔗  Chat GPT
🔗  Git Hub
🔗  Netlify

