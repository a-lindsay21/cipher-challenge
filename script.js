let score = 0;
let timer = 0;
let timerInterval = null;

// List of encrypted messages and their correct answers
const easyPhrases = [
  { encrypted: "wkh ehvw zdjb wr suhglfw wkh ixwxuh lv wr fuhdwh lw", answer: "the best way to predict the future is to create it" },
  { encrypted: "doo wkdw jolwwhuv lv qrw jrog", answer: "all that glitters is not gold" },
  { encrypted: "eh wkh fkdqjh brx zdqw wr vhh lq wkh zruog", answer: "be the change you want to see in the world" },
  { encrypted: "nqrw wkh vhoih", answer: "know thyself" },
  { encrypted: "wkh rqob zdjb wr gr juhdw zrun lv wr oryh zkdw brx gr", answer: "the only way to do great work is to love what you do" },
  { encrypted: "l kdyh d guhdp", answer: "i have a dream" },
  { encrypted: "zklfklv wkh pruh hovlyh phdo, euwh wklqw ru glqqhu?", answer: "which is the more expensive meal, brunch or dinner?" },
  { encrypted: "dv brx vrz, vr zloo brx uhds", answer: "as you sow, so will you reap" },
  { encrypted: "li brx zdqw wr nqrz zkdw d pdq lv olnh, wkhq wdnh d jrfg orrn dw krz kh wuhdwv klv lqihulruv, qrw klv htxdov", answer: "if you want to know what a man is like, then take a good look at how he treats his inferiors, not his equals" },
  { encrypted: "wkh lpsrvvleoh riwhq ehfrphv wkh srvvleoh", answer: "the impossible often becomes the possible" },
  { encrypted: "zhyhu jlyh xs", answer: "never give up" },
  { encrypted: "zkhq pdq lvwkh rqob fhohskrqh, wkh\r\qehvw zdjb wr uhdfk klp lv wr jlyh klp d fdoo", answer: "when man is the only cellphone, the best way to reach him is to give him a call" },
  { encrypted: "pdq lvwkh rqob fhohskrqh, wkh\r\qehvw zdjb wr uhdfk klp lv wr jlyh klp d fdoo", answer: "man is the only cellphone, the best way to reach him is to give him a call" },
  { encrypted: "dq dss jrhv wr d edr", answer: "an apple goes to a bar" },
  { encrypted: "zhyhu otvwkh xqlfhv", answer: "never trust ellipses" },
  { encrypted: "wkh ehvw zdjb wr suhglfw wkh ixwxuh lv wr fuhdwh lw", answer: "the best way to predict the future is to create it" },
  { encrypted: "doo wkdw jolwwhuv lv qrw jrog", answer: "all that glitters is not gold" },
  { encrypted: "eh wkh fkdqjh brx zdqw wr vhh lq wkh zruog", answer: "be the change you want to see in the world" },
  { encrypted: "nqrw wkh vhoih", answer: "know thyself" },
  { encrypted: "wkh rqob zdjb wr gr juhdw zrun lv wr oryh zkdw brx gr", answer: "the only way to do great work is to love what you do" },
  { encrypted: "l kdyh d guhdp", answer: "i have a dream" },
  { encrypted: "zklfklv wkh pruh hovlyh phdo, euwh wklqw ru glqqhu?", answer: "which is the more expensive meal, brunch or dinner?" },
  { encrypted: "dv brx vrz, vr zloo brx uhds", answer: "as you sow, so will you reap" },
  { encrypted: "li brx zdqw wr nqrz zkdw d pdq lv olnh, wkhq wdnh d jrfg orrn dw krz kh wuhdwv klv lqihulruv, qrw klv htxdov", answer: "if you want to know what a man is like, then take a good look at how he treats his inferiors, not his equals" },
  { encrypted: "wkh lpsrvvleoh riwhq ehfrphv wkh srvvleoh", answer: "the impossible often becomes the possible" },
  { encrypted: "zhyhu jlyh xs", answer: "never give up" },
  { encrypted: "zkhq pdq lvwkh rqob fhohskrqh, wkh\r\qehvw zdjb wr uhdfk klp lv wr jlyh klp d fdoo", answer: "when man is the only cellphone, the best way to reach him is to give him a call" },
  { encrypted: "pdq lvwkh rqob fhohskrqh, wkh\r\qehvw zdjb wr uhdfk klp lv wr jlyh klp d fdoo", answer: "man is the only cellphone, the best way to reach him is to give him a call" },
  { encrypted: "dq dss jrhv wr d edr", answer: "an apple goes to a bar" },
  { encrypted: "zhyhu otvwkh xqlfhv", answer: "never trust ellipses" },
  { encrypted: "uhdglqj lv wr wkh plqg zkdw hxhufpuh lv wr wkh erg", answer: "reading is to the mind what exercise is to the body" },
  { encrypted: "zkdw gr brx fdoo d ehhu lq d ghvhuw?", answer: "what do you call a deer in a desert?" },
  { encrypted: "d uhdo pdq prulh d ehhu, qrw d ehhu", answer: "a real man prefers a beer, not a bear" },
  { encrypted: "li brx fdq guhdp lw, brx fdq gr lw", answer: "if you can dream it, you can do it" },
  { encrypted: "wkh rqob zdjb wr gr juhdw zrun lv wr oryh zkdw brx gr", answer: "the only way to do great work is to love what you do" }
];

// MEDIUM – Vigenère Cipher
const mediumPhrases = [
  { encrypted: "aht usvium vy bnlggvhhv", answer: "the future is unwritten", key: "happycoding" },
  { encrypted: "rndljgrjm vy woltp", answer: "knowledge is power", key: "happycoding" },
  { encrypted: "vptc rjs kqqjln sdmt", answer: "open the hidden door", key: "happycoding" },
  { encrypted: "de pgc vvh zrypsiples", answer: "we are the resistance", key: "happycoding" },
  { encrypted: "arjif kg d lbailt tbisg ajuyd", answer: "truth is a double edged sword", key: "happycoding" },
  { encrypted: "zvpfzn kxa snvdfn", answer: "follow the signal", key: "happycoding" },
  { encrypted: "exmky shjb vf ykt ckb", answer: "your mind is the key", key: "happycoding" },
  { encrypted: "zfjixr kfo csbnc qhbkqdy", answer: "unlock the final message", key: "happycoding" },
  { encrypted: "hoixkh ngt ynigvmv", answer: "behind the curtain", key: "happycoding" },
  { encrypted: "dpv jtvtrgdd vy eijjjpyx", answer: "the password is forgotten", key: "happycoding" },
  { encrypted: "gqni jm sly afhx", answer: "hope is not lost", key: "happycoding" },
  { encrypted: "pl jdwbu bv q xnhs", answer: "we speak in code", key: "happycoding" },
  { encrypted: "gexi ua hsi gqf rq pzjc", answer: "this is not a test", key: "happycoding" },
  { encrypted: "dksbqiw gki oxyqcwk", answer: "the game has changed", key: "happycoding" },
  { encrypted: "levqkgxy tfd sbgspng", answer: "decipher the meaning", key: "happycoding" },
  { encrypted: "dn jgw rtrp xebd bqoqj", answer: "the sun will rise again", key: "happycoding" },
  { encrypted: "cvut ptafz", answer: "your move", key: "happycoding" },
  { encrypted: "jigzti uja cdbqskgf", answer: "search the archives", key: "happycoding" },
  { encrypted: "xmrkyba ku cjsz dvopga", answer: "nothing is ever random", key: "happycoding" },
  { encrypted: "ljxrzhpe tygiay aebkj", answer: "patterns reveal truth", key: "happycoding" },
  { encrypted: "fugnpkd ng e kbtkbzkc kc dgmyp", answer: "there is a message in chaos", key: "happycoding" },
  { encrypted: "aeqqapkrd wvwn vgiekhb", answer: "translate and proceed", key: "happycoding" },
  { encrypted: "hcpp zn elykj gpvqsln", answer: "you are being watched", key: "happycoding" },
  { encrypted: "kzuceki fwszv wipx kocipjy", answer: "shadows hold the answer", key: "happycoding" },
  { encrypted: "uqzjywv hfi sqc yktbhm", answer: "listen for the signal", key: "happycoding" },
  { encrypted: "uqdp oxdmwvl", answer: "look closer", key: "happycoding" },
  { encrypted: "zqwntwlj cj cvpgsrfw", answer: "they are listening", key: "happycoding" },
  { encrypted: "bshktshx vz nbkiol", answer: "freedom is earned", key: "happycoding" },
  { encrypted: "cnigp hh hfdnep", answer: "solve or perish", key: "happycoding" },
  { encrypted: "ybdhq wnq zyljtl", answer: "trust the cipher", key: "happycoding" }
];

// HARD – 
const hardPhrases = [
  { encrypted: "srwwvm rm kozrm hrtsg", answer: "hidden in plain sight" },
  { encrypted: "gsv vmvnb rh znlmt fh", answer: "the enemy is among us" },
  { encrypted: "yfim yvuliv ivzwrmt", answer: "burn before reading" },
  { encrypted: "mlgsrmt rh ivzo", answer: "nothing is real" },
  { encrypted: "dzgxs gsv dzgxsvih", answer: "watch the watchers" },
  { encrypted: "gifhg ml lmv", answer: "trust no one" },
  { encrypted: "dv ziv xlknizrhvw", answer: "we are compromised" },
  { encrypted: "ullyld gsv yozxp xzg", answer: "follow the black cat" },
  { encrypted: "gsvb hvv vevibgrmt", answer: "they see everything" },
  { encrypted: "wvxlwv zmw fhiezerv", answer: "decode and survive" },
  { encrypted: "wziplvh srwv gsv gihfg", answer: "darkness hides the truth" },
  { encrypted: "blf dviv dzirmvw", answer: "you were warned" },
  { encrypted: "gsrh rh gsv ozhg ovevo", answer: "this is the last level" },
  { encrypted: "orhgv mlg gsv hrovxhv", answer: "listen to the silence" },
  { encrypted: "vcgr rh mlg tfizhhvwrw", answer: "exit is not guaranteed" },
  { encrypted: "gihfg nfhg yv vzimvw", answer: "truth must be earned" },
  { encrypted: "gsvb ziv xlmrmt", answer: "they are coming" },
  { encrypted: "mvevi ollp yzxp", answer: "never look back" },
  { encrypted: "nlev dlfibug hlfmw", answer: "move without sound" },
  { encrypted: "xlmfg gsv ultghkvih", answer: "count the footsteps" },
  { encrypted: "dibmt kzgsv ovzwh irgs", answer: "wrong path leads right" },
  { encrypted: "nrlilt slwob gsv pvb", answer: "mirror holds the key" },
  { encrypted: "ivrezo blfi rmgrmg", answer: "reveal your intent" },
  { encrypted: "uzxv blfi urzi", answer: "face your fear" },
  { encrypted: "dv ziv mlg zoldm", answer: "we are not alone" },
  { encrypted: "ivxlmw mlgsrmt", answer: "record nothing" },
  { encrypted: "vezhv blfi gzior", answer: "erase your trail" },
  { encrypted: "zyywmblm gsv nrhhgrlm", answer: "abandon the mission" },
  { encrypted: "xlnkovg gsv ollk", answer: "complete the loop" },
  { encrypted: "blf mldl gln nfmx", answer: "you know too much" }
];

function atbash(message) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const reversed = 'zyxwvutsrqponmlkjihgfedcba';
  let result = '';

  for (let char of message.toLowerCase()) {
    const index = alphabet.indexOf(char);
    if (index !== -1) {
      result += reversed[index];
    } else {
      result += char;
    }
  }

  return result;
}

// Function to check if the user's input matches the correct answer
function checkAnswer() {
  const userGuess = document.getElementById("user-input").value.toLowerCase();
  const result = document.getElementById("result-message");
  const difficulty = document.getElementById("difficulty-select").value;

  let correctAnswer;

  if (difficulty === "easy") {
    correctAnswer = currentPhrase.answer;
  } else if (difficulty === "medium") {
    correctAnswer = decrypt(currentPhrase.encrypted, currentPhrase.key);
  } else if (difficulty === "hard") {
    correctAnswer = atbash(currentPhrase.encrypted);
  }

  if (userGuess === correctAnswer) {
    clearInterval(timerInterval);
    result.textContent = "✅ Correct! You cracked the code!";
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
  } else {
    result.textContent = "❌ Try again.";
  }
}



function loadNewPuzzle() {
  const difficulty = document.getElementById("difficulty-select").value;
  let phraseList;

  if (difficulty === "easy") {
    phraseList = easyPhrases;
  } else if (difficulty === "medium") {
    phraseList = mediumPhrases;
  } else {
    phraseList = hardPhrases;
  }

  currentPhrase = phraseList[Math.floor(Math.random() * phraseList.length)];

  document.getElementById("cipher-text").textContent = currentPhrase.encrypted;
  document.getElementById("user-input").value = "";
  document.getElementById("result-message").textContent = "";
  // Reset timer
  clearInterval(timerInterval);
  timer = 0;
  document.getElementById("timer").textContent = `Time: 0s`;
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = `Time: ${timer}s`;
  }, 1000);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}
document.body.classList.add("dark"); // or "light"

function applyTheme() {
  const selectedTheme = document.getElementById("theme-select").value;

  // Remove all theme classes
  document.body.classList.remove("dark", "light", "hacker", "forest", "pastel");

  // Add the selected one
  document.body.classList.add(selectedTheme);
}
// Set default theme
document.body.classList.add("dark");
document.getElementById("theme-select").value = "dark";

// Load the first puzzle when the page opens
window.onload = () => {
  loadNewPuzzle();
};

function showHint() {
  const difficulty = document.getElementById("difficulty-select").value;
  const hintBox = document.getElementById("hint-text");

  if (difficulty === "easy") {
    hintBox.textContent = "🟢 Hint: This is a Caesar cipher. Each letter was shifted by the same number.";
  } else if (difficulty === "medium") {
    hintBox.textContent = `🟡 Hint: This is a Vigenère cipher. The key is "${currentPhrase.key}".`;
  } else if (difficulty === "hard") {
    hintBox.textContent = "🔴 Hint: This is an Atbash cipher. A becomes Z, B becomes Y, C becomes X...";
  }
}
