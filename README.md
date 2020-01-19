# GiggleFeed

The social media with humour! GiggleFeed is a joke centered web app, where users can submit jokes with hidden punchlines which are then revealed on request (for dramatic effect ofcourse!).

Designed to be heavily mobile responsive with PWA support planned in for future development, GiggleFeed is a site you can access anywhere.

Please share with your friends and submit a pull request if you want to collaborate!

## Postman Docs

https://documenter.getpostman.com/view/3795321/SWT5gzyn?version=latest

## Indices

* [Auth](#auth)

  + [Register](#1-register)
  + [Login](#2-login)
  + [Logout](#3-logout)
  + [Update Details](#4-update-details)
  + [Reset Password](#5-reset-password)
  + [Update Password](#6-update-password)

* [Jokes](#jokes)

  + [Get All Jokes](#1-get-all-jokes)
  + [Get Joke By Id](#2-get-joke-by-id)
  + [Create Joke](#3-create-joke)
  + [Bulk Insert Jokes](#4-bulk-insert-jokes)
  + [Update Joke](#5-update-joke)
  + [Delete joke](#6-delete-joke)

* [Votes](#votes)

  + [Vote For Joke](#1-vote-for-joke)
  + [Remove Vote](#2-remove-vote)

--------

## Auth

Authentication routes for user registration, login/logout and updating user details/password.

App auth is handled by JWT, returned in the response body on login. This must be included as an authorization header with the Bearer prefix for all private routes.

### 1. Register

Url: /api/auth/register

ACCESS: PUBLIC

Registration requires firstName, lastName, email & password.

***Endpoint:***

``` bash
Method: POST
Type: RAW
URL: {{URL}}/auth/register
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{

	"firstName": "Giggle",
	"lastName": "Feed",
	"email": "test@gigglefeed.com",
	"password": "Password!"

}

``` 

### 2. Login

Url: /api/auth/login

ACCESS: PUBLIC

Requires email and password in request body.

Returns a JWT in the response body and in a cookie. This must be added as a Bearer token in the authorization header to access PRIVATE endpoints. 

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/auth/login
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{

	"email": "test@gigglefeed.com",

	"password": "Password!!"

}

``` 

### 3. Logout

Url: /api/auth/logout

ACCESS: PRIVATE - Must be logged in

Log user out by setting cookie to expire now.

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/auth/logout
```

### 4. Update Details

Url: /api/auth/updatedetails

ACCESS: PRIVATE - Must be logged in

User can update their firstName, lastName and email.

Password updated must be completed via the forgoten password process.

***Endpoint:***

``` bash
Method: PUT
Type: RAW
URL: {{URL}}/auth/updatedetails
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{

	"firstName": "Giggle",
	"lastName": "Feed",

	"email": "test@gigglefeed.com"

}

``` 

### 5. Reset Password

Url: /api/auth/resetpassword

ACCESS: PUBLIC

Sends password reset token to user submitted email if it exists on the DB.

IMPORTANT: Reset token only valid for 10 minutes. 

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/auth/resetpassword
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{

	"email": "test@gigglefeed.com"

}

``` 

### 6. Update Password

Url: /api/auth/resetpassword/:resetToken

ACCESS: PUBLIC

Updates the users password if the password reset token is valid.

IMPORTANT: Reset token only valid for 10 minutes. 

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://localhost:5000/api/auth/resetpassword/3452cc2003d915297c7166b434b1a16933d2ab3f
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{

	"password": "Password!!"

}

``` 

## Jokes

Full crud functionality for jokes. 

The get all jokes endpoint accepts query strings, making pagination & sorting simple.

Jokes can be viewed publically but create, update and delete endpoints require an authorized user session. 

### 1. Get All Jokes

Url: /api/jokes

ACCESS: PUBLIC

Accepts query strings as follows:

* select
* sort
* page
* limit
* gt
* gte
* lt
* lte
* in

e.g /api/jokes?limit=20&nsfw=true

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/joke
```

### 2. Get Joke By Id

Url: /api/joke/:jokeId

ACCESS: PUBLIC

Finds a joke by its id.

***Endpoint:***

``` bash
Method: GET
Type: 
URL: {{URL}}/joke/5e2379438500bb16e40c2b21
```

### 3. Create Joke

Url: /api/joke

ACCESS: PRIVATE - Must be logged in

Insert new joke, requies a type of either single or twopart; 

'single' type requires only a joke string.

'twopart' requires both the joke and delivery strings.

Optional flags: nsfw, religous, political

Optional strings: category (default: 'Miscellaneous')

***Endpoint:***

``` bash
Method: POST
Type: RAW
URL: {{URL}}/joke
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{

	"category": "Dark",
	"type": "twopart",
	"joke": "What's red and bad for your teeth?",
	"delivery": "A brick"
	

}

``` 

### 4. Bulk Insert Jokes

Url: /api/joke/bulkinsert/now

ACCESS: PRIVATE - Must be logged in

Bulk insert jokes to seed db.

expects { jokes: [] }

DEVELOPEMENT ONLY

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/joke/bulkinsert/now
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{
  "jokes": [

    {
      "category": "Programming",
      "type": "single",
      "joke": "// This line doesn't actually do anything, but the code stops working when I delete it."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Algorithm:\nA word used by programmers when they don't want to explain how their code works."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Dark humor is like cancer.",
      "delivery": "It's even funnier when children get it."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "What do you call a group of 8 Hobbits?",
      "delivery": "A Hobbyte."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Debugging: Removing the needles from the haystack."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "\"Can I tell you a TCP joke?\"\n\"Please tell me a TCP joke.\"\n\"OK, I'll tell you a TCP joke.\""
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "I'm thinking of setting up a comedy group to help people going through cancer treatment.",
      "delivery": "I'll call it \"A Sense of Tumor\"."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What is the least spoken language in the world?",
      "delivery": "Sign language."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What do Japanese cannibals eat?",
      "delivery": "Raw men."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Debugging is like being the detective in a crime movie where you're also the murderer at the same time."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why did the Python programmer not respond to the foreign mails he got?",
      "delivery": "Because his interpreter was busy collecting garbage."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "My mother said, \"You won't amount to anything because you always procrastinate.\"",
      "delivery": "I said, \"Oh yeah... Just you wait.\"."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "White people don't shoot each other in the streets like black people do.",
      "delivery": "We do it in schools because we have class."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "I asked my wife \"Am I the only one you've been with?\"",
      "delivery": "\"Yes... but I've had some sevens and eights.\" She replied."
    },
    {
      "category": "Dark",
      "type": "single",
      "joke": "I didn't vaccinate my 10 kids and the one that survived is fine!"
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Everyone says that Hitler really loved animals.",
      "delivery": "Then why did he kill 6 million of them?"
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What's the difference between a little girl and a fridge?",
      "delivery": "Fridges don't scream when you put your meat in them.",
      "nsfw": true
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What kind of car did Whitney Houston drive?",
      "delivery": "A Hyundaiiiiiiiiiiiiiiiiiiiiiiii"
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why do Java programmers hate communism?",
      "delivery": "They don't want to live in a classless society."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "How long does a black woman take to throw away the garbage?",
      "delivery": "Nine months."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Mom asked me where I'm taking her to go out to eat for mother's day.",
      "delivery": "I told her, \"We already have food in the house\"."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "How can you tell an extroverted programmer?",
      "delivery": "He looks at YOUR shoes when he's talking."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "I used to love to tell dad jokes",
      "delivery": "Dad, come back..."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Java is like Alzheimer, it starts off slow, but eventually, your memory is gone."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "How do we know Jesus wasn't black?",
      "delivery": "He would have been hung from a tree, not a cross.",
      "religious": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Eight bytes walk into a bar.\nThe bartender asks, \"Can I get you anything?\"\n\"Yeah,\" reply the bytes.\n\"Make us a double.\""
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Life's like my dick.",
      "delivery": "The more children you have, the harder it gets.",
      "nsfw": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Hey Girl,\nRoses are #ff0000,\nViolets are #0000ff,\nI use hex codes,\nBut I'd use RGB for you."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Why is crucified Jesus always depicted with six pack abs?",
      "delivery": "He did CrossFit.",
      "religious": true
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why is 6 afraid of 7 in hexadecimal Canada?",
      "delivery": "Because 7 8 9 A?"
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "The glass is neither half-full nor half-empty, the glass is twice as big as it needs to be."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "My wife left me because I'm too insecure and paranoid.",
      "delivery": "Oh wait, never mind. She was just getting the mail."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What do you call a kid with no arms and an eyepatch?",
      "delivery": "Names."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "I asked my wife if I was the only one she's been with.",
      "delivery": "She said, \"Yes, the others were at least sevens or eights\""
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why does no one like SQLrillex?",
      "delivery": "He keeps dropping the database."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "I've been in 15 school shootings and I was lucky to survive!",
      "delivery": "I just had to be nice with the cops and not resist."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Judge: \"I sentence you to the maximum punishment...\"\nMe (thinking): \"Please be death, please be death...\"\nJudge: \"Learn Java!\"\nMe: \"Damn.\""
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "PHP"
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Why are there no pharmacies in Africa?",
      "delivery": "Because you can't use medicine on an empty stomach."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Did you hear about the cheese factory that exploded in france?",
      "delivery": "There was nothing but de brie."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "My grandma was recently diagnosed with Alzheimer's, and she keeps calling me by the wrong name.",
      "delivery": "Other than that, the sex is great.",
      "nsfw": true
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Why do German showers have 11 holes?",
      "delivery": "Because Jews only have 10 fingers.",
      "religious": true
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What do you call crystal clear urine?",
      "delivery": "1080pee."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why are modern programing languages so materialistic?",
      "delivery": "Because they are object oriented."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "I told my psychiatrist I got suicidal tendencies.",
      "delivery": "He said from now on I have to pay in advance."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "What do you call a developer who doesn't comment code?",
      "delivery": "A developer."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "People are like jellybeans and licorice:",
      "delivery": "No one likes the blacks."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Muslim women are horrible competitors.",
      "delivery": "No matter what they do, they always get beat.",
      "religious": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "A byte walks into a bar looking miserable.\nThe bartender asks him: \"What's wrong buddy?\"\n\"Parity error.\" he replies. \n\"Ah that makes sense, I thought you looked a bit off.\""
    },
    {
      "category": "Miscellaneous",
      "type": "single",
      "joke": "A horse walks into a bar.\n\"Hey\", the Bartender says.\n\"Sure\", the horse replies."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "The generation of random numbers is too important to be left to chance."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Why are Americans shit at Dota?",
      "delivery": "They can't protect their towers."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Why is every gender equality officer female?",
      "delivery": "Because it's cheaper."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What's the difference between an apple and a black guy?",
      "delivery": "The apple will eventually fall from the tree that it's hanging from!"
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "69",
      "delivery": "Get it? That's the sex number so it must be funny!",
      "nsfw": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "1. Open terminal\n2. mkdir snuts\n3. cd snuts"
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Why did the Romanian stop reading?",
      "delivery": "They wanted to give the Bucharest."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What happens when you don't obey the KGB?",
      "delivery": "You get Putin jail",
      "political": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "A SQL statement walks into a bar and sees two tables.\nIt approaches, and asks \"may I join you?\""
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why did the programmer quit his job?",
      "delivery": "Because He didn't get arrays."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Why is every gender equality officer female?",
      "delivery": "Because it's cheaper."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why did the javascript heap close shop?",
      "delivery": "It ran out of memory."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "How do you tell HTML from HTML5?\n- Try it out in Internet Explorer\n- Did it work?\n- No?\n- It's HTML5."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What do Asian people call fingers?",
      "delivery": "Limb Limbs"
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Your mama's so FAT she can't save files bigger than 4GB."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "I hate Russian dolls.",
      "delivery": "They're so full of themselves."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why do programmers confuse halloween and christmas?",
      "delivery": "Because Oct 31 = Dec 25"
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "\"We messed up the keming again guys\""
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Arguing with a woman is like reading a software's license agreement",
      "delivery": "In the end you ignore everything and click \"I agree\""
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "A man is smoking a cigarette and blowing smoke rings into the air. His girlfriend becomes irritated with the smoke and says, \"Can't you see the warning on the cigarette pack? Smoking is hazardous to your health!\" to which the man replies, \"I am a programmer.  We don't worry about warnings; we only worry about errors.\""
    },
    {
      "category": "Miscellaneous",
      "type": "single",
      "joke": "Oysters hate to give away their pearls because they are shellfish."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "So what's a set of predefined steps the government might take to preserve the environment?",
      "delivery": "An Al-Gore-ithm."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What's the most notable similarity between a pedophile and a roller coaster?",
      "delivery": "They both make a child scream, but the first ride's never the last",
      "nsfw": true
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What's the difference between an in-law and an outlaw?",
      "delivery": "An outlaw is wanted."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "9/11 jokes are not funny.",
      "delivery": "The other 2 though, are hilarious!"
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "The average penis has...",
      "delivery": "Been in and around my ex-girlfriend's mouth.\nFuck you, Karen!",
      "nsfw": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "ASCII silly question, get a silly ANSI."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "My girlfriend left me because I have a fetish for touching pasta.",
      "delivery": "I'm feeling cannelloni now. :'("
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Genders are a lot like booleans.",
      "delivery": "There's only two of them."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "So I made a graph of all my past relationships...",
      "delivery": "It has an ex axis and a why axis."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "There are only 10 kinds of people in this world: those who know binary and those who don't."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Hey baby I wish your name was asynchronous",
      "delivery": "... so you'd give me a callback."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Your momma is so fat, we had to switch to NTFS to store her."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "I had a granny that we couldnt decide whether to bury or cremate",
      "delivery": "In the end we decided to just let her live."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "\"Honey, go to the store and buy some eggs.\"\n\"OK.\"\n\"Oh and while you're there, get some milk.\"\n\nHe never returned."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "If Bill Gates had a dime for every time Windows crashed ... Oh, he does."
    },
    {
      "category": "Miscellaneous",
      "type": "single",
      "joke": "A neutron walks into a bar and asks for a price on a drink.\nThe barkeeper says: \"For you... no charge!\""
    },
    {
      "category": "Miscellaneous",
      "type": "single",
      "joke": "Two reasons I don't give money to homeless people.\n1) They are going to spend it all on drugs and alcohol\n2) I am going to spend it all on drugs and alcohol."
    },
    {
      "category": "Dark",
      "type": "single",
      "joke": "Me and my jewish friend were eating lunch and i farted. He got mad so i said \"cmon man a little gas never killed anyone\""
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What did one necrophiliac tell the other necrophiliac after work?",
      "delivery": "\"Let's go have a couple of cold ones!\""
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "What is the best prefix for global variables?",
      "delivery": "//"
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "What do you get if you lock a monkey in a room with a typewriter for 8 hours?",
      "delivery": "A regular expression."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "My wife divorced me so i stole her wheelchair.",
      "delivery": "Guess who came crawling back."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": ".NET developers are picky when it comes to food.",
      "delivery": "They only like Chicken NuGet."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "A web developer walks into a restaurant.\nHe immediately leaves in disgust as the restaurant was laid out in tables."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "How many friend-zoned guys does it take to change a lightbulb?",
      "delivery": "None, they'll just compliment it and get pissed off when it won't screw.",
      "nsfw": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Java and C were telling jokes. It was C's turn, so he writes something on the wall, points to it and says \"Do you get the reference?\" But Java didn't."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What's Green and smells like pork?",
      "delivery": "Kermit's Fingers",
      "nsfw": true
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "One time I masturbated on a plane",
      "delivery": "I called it \"highjacking\"",
      "nsfw": true
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "I WRITE MY JOKES IN CAPITALS.",
      "delivery": "THIS ONE WAS WRITTEN IN PARIS."
    },
    {
      "category": "Miscellaneous",
      "type": "single",
      "joke": "I have these weird muscle spasms in my gluteus maximus.\nI figured out from my doctor that everything was alright:\nHe said \"Weird flex, butt okay.\""
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Programming is like sex.\nMake one mistake and you end up supporting it for the rest of your life."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Saying that Java is nice because it works on every OS is like saying that anal sex is nice because it works on every gender.",
      "nsfw": true
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "If I make you breakfast in bed, a simple thank you is all I need.",
      "delivery": "Not all this \"How the fuck did you get in my house?!\" nonsense."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "A guy walks into a bar and asks for 1.4 root beers.\nThe bartender says \"I'll have to charge you extra, that's a root beer float\".\nThe guy says \"In that case, better make it a double.\""
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Two C strings walk into a bar.\nThe bartender asks \"What can I get ya?\"\nThe first string says \"I'll have a gin and tonic.\"\nThe second string thinks for a minute, then says \"I'll take a tequila sunriseJF()#$JF(#)$(@J#()$@#())!*FNIN!OBN134ufh1ui34hf9813f8h8384h981h3984h5F!##@\"\nThe first string apoligizes, \"You'll have to excuse my friend, he's not null terminated.\""
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "TIL that changing random stuff until your program works is \"hacky\" and a \"bad coding practice\" but if you do it fast enough it's \"Machine Learning\" and pays 4x your current salary."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "What do you call a cop's penis after he's done masturbating?",
      "delivery": "Pulled pork.",
      "nsfw": true
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What's the difference between a baby and a pile of sand?",
      "delivery": "You can't pick a pile of sand up with a pitchfork."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "What's the object-oriented way to become wealthy?",
      "delivery": "Inheritance."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "9 months before I was born, I went to a party with my dad...",
      "delivery": "...and left with my mum.",
      "nsfw": true
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "How many programmers does it take to screw in a light bulb?",
      "delivery": "None. It's a hardware problem."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why do programmers wear glasses?",
      "delivery": "Because they need to C#"
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What's the difference between a baby and a watermelon?",
      "delivery": "One's satisfying to hit with a sledgehammer. The other's a watermelon."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "I've got a really good UDP joke to tell you but I don't know if you'll get it."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "Jokes about anti-vaxxer parents never get old.",
      "delivery": "Just like their kids."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "Have a great weekend!\nI hope your code behaves the same on Monday as it did on Friday."
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Went to the doctors for a prostate exam.\nDuring the exam he said it's not unusual to become aroused or even ejaculate.",
      "delivery": "But still, I wish he hadn't.",
      "nsfw": true
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What do an orgasm and a pulse have in common?",
      "delivery": "I dont care if she has one.",
      "nsfw": true
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "\"Knock, knock.\"\n\"Who's there?\"\n\n*very long pause...*\n\"Java.\""
    },
    {
      "category": "Miscellaneous",
      "type": "twopart",
      "joke": "Thank you student loans for getting me through college.",
      "delivery": "I don't think I'll ever be able to repay you"
    },
    {
      "category": "Dark",
      "type": "single",
      "joke": "Stop being homophobic and rude to the LGBTQ+ community. You should be thanking them for saving us plenty of room in heaven."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "How do you know God is a shitty programmer?",
      "delivery": "He wrote the OS for an entire universe, but didn't leave a single useful comment."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "What is a dying programmer's last program?",
      "delivery": "Goodbye, world!"
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Why did the functional programming developer get thrown out of school?",
      "delivery": "Because he refused to take classes."
    },
    {
      "category": "Programming",
      "type": "twopart",
      "joke": "Hey, wanna hear a joke?",
      "delivery": "Parsing HTML with regex."
    },
    {
      "category": "Dark",
      "type": "twopart",
      "joke": "What do dermatologists and the KKK have in common?",
      "delivery": "They both remove blackheads."
    },
    {
      "category": "Programming",
      "type": "single",
      "joke": "A programmer puts two glasses on his bedside table before going to sleep.\nA full one, in case he gets thirsty, and an empty one, in case he doesn't."
    }

  ]
}

``` 

### 5. Update Joke

Url: /api/joke/:jokeId

ACCESS: PRIVATE - Must be logged in

Update any part of a joke, not all fields are required on submission, only those that differ from original. 

Must be joke owner to update joke. 

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/joke/5e23750f3542f22260bf10d3
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

***Body:***

```js        
{

	"delivery": "A brick!"

}

``` 

### 6. Delete joke

Url: /api/joke/:jokeId

ACCESS: PRIVATE - Must be logged in

Joke can only be deleted by the joke owner.

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/joke/5e23750f3542f22260bf10d3
```

## Votes

Users can vote once on any joke, either up or down, never both.

If a user attempts to vote both ways, the first vote is overwritten by the second.

Attempting to vote the same direction on a joke multiple times returns an error.

Users cannot vote on their own jokes!

### 1. Vote For Joke

Url: /vote/:jokeId/:direction

ACCESS: PRIVATE - Must be logged in

Direction can either be up or down.

Only one vote per user, regardless of direction.

Voting for a second time in a different direction will remove the original vote.

***Endpoint:***

``` bash
Method: PUT
Type: 
URL: {{URL}}/vote/5e2379438500bb16e40c2b21/down
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

### 2. Remove Vote

Url: /api/vote/:jokeId

ACCESS: PRIVATE - Must be logged in

Remove a vote for a joke.

Only possible for user who made the vote.

***Endpoint:***

``` bash
Method: DELETE
Type: 
URL: {{URL}}/vote/5e2379438500bb16e40c2b21/down
```

***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |

---
[Back to top](#gigglefeed)

> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-01-19 00:45:08 by [docgen](https://github.com/thedevsaddam/docgen)

