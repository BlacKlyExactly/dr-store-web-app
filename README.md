# Dr-store-web-app

![img-pc](https://i.imgur.com/nFyYzcN.png)
# Opis
Aplikacja webowa stworzona na potrzeby serwera **CS:GO Jailbreak**: [91.224.117.26:27090](steam://connect/91.224.117:27090).
Wykorzystująca technologie:
 - React (Next.js)
 - Typescript
 - MySql
 - Passport.js
 - Socket.io

**Uwaga**: Strona wykorzystuję mój autorski sklep z itemami i w tym momencie nie wspiera min. Store by Zephyrus<br/>

# Instalacja i Konfiguracja
**1.** `cd dr-store-web-app`<br/>
**2.** `npm install` lub `yarn install`<br/>
**3.** Stwórz plik **.env** w katalogu głównym projektu (jeśli korzystasz z hostingu, który pozwala na ustawiania zmiennych środowiskowych pomiń ten krok)<br/>
**4.** Uzupełnij plik **.env** w następujący sposób: (jeśli korzystasz z hostingu, który pozwala na ustawiania zmiennych środowiskowych uzupełnij zmienne z niżej)<br/>
``` 
COOKIES_SECRET=wstaw tu swój losowo wygenerowany klucz
WEB_API_KEY=wstaw tu swój api key https://steamcommunity.com/dev/apikey
DB_HOST=host twojej bazy danych
DB_DATABASE=nazwa bazy danych
DB_USER=użytkownik bazy danych
DB_PASS=hasło bazy danych
DOMAIN=domena strony internetowej, na której będzie działała strona
NEXT_PUBLIC_SERVER_SHORT_NAME=krótka nazwa twojego serwera
NEXT_PUBLIC_SERVER_HOST=ip twojego serwera
NEXT_PUBLIC_SERVER_PORT=port twojego serwera
NEXT_PUBLIC_SITE_NAME=tytuł strony np. (twoja wpisana tu nazwa) | Strona Główna
NEXT_PUBLIC_API_AUTH_TOKEN=wstaw tu swój inny losowo wygenerowany klucz
NEXT_PUBLIC_API_AUTH_TYPE=Bearer
```

**5**. `yarn build` lub `npm run build`<br/>
**6**. `yarn start` lub `npm run start`<br/>

**7.**  Konfiguracja przedmiotów:<br/>
```typescript
//items.ts (folder główny aplikacji)
//Po zmianie należy wykonać ponownie punkt 5 i 6

//Przykładowy config
const  storeItems:  StoreItem[] = [
	{
		name:  "PRO", //nazwa przedmiotu
		id:  "51", //jego id ze sklepu (musi być takie samo jak z configu na serwerze cs go)
		price:  600, //cena
		image:  "https://i.imgur.com/m5GUzOZ.png", //link do obrazka
	},
	{
		name:  "Śmieszek", //nazwa przedmiotu
		id:  "52", //jego id ze sklepu (musi być takie samo jak z configu na serwerze cs go)
		price:  600, //cena przedmiotu
		image:  "https://i.imgur.com/TAQiksT.png", //link do obrazka
	},
]
```

**8.** Konfiguracja daily:<br/>
```typescript
//daily.ts (folder główny aplikacji)
//Po zmianie należy wykonać ponownie punkt 5 i 6

const  daily:  DailyConfig  =  {
	starts:  "02/08/2021", //Format Daty: miesiąc/dzień/rok
	ends:  "03/08/2021", //Format Daty: miesiąc/dzień/rok
	
	//UWAGA
	
	//Jeśli chcesz ustawić monety za koknretny dzień to robisz tak:
	//{ coins:  <ilość monet za dzień>  }
	
	//Jeśli chcesz przedmiot za koknretny dzień to robisz tak:
	//{ item:  getItemById(<Id przedmiotu z items.ts>) }
	
	//Do dyspozycji masz jeszcze takie wartości jak:
	//"isSpecialDay" - maluje ramkę wokół dnia na niebiesko
	//"isLegendaryDay" - maluje ramkę na pomarańczowo
	//Te wartości mają charakter informacyjny
	
	//Dodaje je się w następujący sposób
	//{ coins: <jakaś liczba>, isSpecialDay: true }
	//{ coins: <jakaś liczba>, isLegendaryDay: true }
	
	//Działa też z przedmiotami
	//{ item:  getItemById(<Id przedmiotu z items.ts>, isSpecialDay: true) }
	//{ item:  getItemById(<Id przedmiotu z items.ts>, isLegendaryDay: true) }
	
	//Przykładowy config
	days: [
		{ coins:  30  }, 
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{
			item:  getItemById("ct4"),
			isSpecialDay:  true
		},
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{
			item:  getItemById("ct4"),
			isSpecialDay:  true
		},
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{
			item:  getItemById("ct4"),
			isSpecialDay:  true
		},
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{ coins:  30  },
		{
			item:  getItemById("ct4"),
			isSpecialDay:  true
		},
		{ coins:  30  },
		{ coins:  30  },
		{
			item:  getItemById("t12"),
			isLegendaryDay:  true
		},
	]
}
```

**9.** Zmiana logo:<br/>
```typescript
//utils/templates.ts
//Po zmianie należy wykonać ponownie punkt 5 i 6

export const Logo = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 109px;
    height: 109px;
    z-index: 20;
    cursor: pointer;

    &:after {
        content: "";
        position: absolute;
        background: url("/images/logo.png"); ${//Żeby zmienić obrazek trzeba podmienić zawartość url z "/images/logo.png" na np. link do obrazka}
        background-size: cover;
        width: 85%;
        height: 85%;
        top: 10%;
        left: 10%;
    }

    @media screen and (min-width: 800px){
        background: ${darkest};
        width: 7.5vw;
        height: 7.5vw;

        &:after {
            width: 6vw;
            height: 6vw;
            top: 10%;
            left: 10%;
        }
    }
`;
```

# Znane błędy i pomysły do dodania
**1.** Usprawnienie wyszukiwania graczy do Papier, Kamień, Nożyce - Dobieranie w tym momencie działa w ten sposób, że do gry dobiera pierwszych dwóch graczy z kolejki, nie zwracając uwagi na postawioną kwotę.<br/>
**2.** Dodanie ekwipunku (z możliwością ich sprzedawania).<br/>
**3.** Dodanie sklepu z przedmiotami.<br/>
**4.**  Dodanie skrzynek do gamblingu<br/>
**5.** Support dla innych sklepów z itemami<br/>

# Wygląd Strony
![rich-img](https://i.imgur.com/Pd9LBNa.png)
![gambling-img](https://i.imgur.com/vYuu9HD.png)
![rps1](https://i.imgur.com/2VOAnU1.png)
![rps1](https://i.imgur.com/CWZT0k5.png)
![rps2](https://i.imgur.com/qe1t8CC.png)
![daily](https://i.imgur.com/nxQvfeI.png)
![gifts1](https://i.imgur.com/0rssFN2.png)
![gifts2](https://i.imgur.com/BnY3g8T.png)
![gifts3](https://i.imgur.com/5beFlB0.png)

# Made with ❤️ by Black
