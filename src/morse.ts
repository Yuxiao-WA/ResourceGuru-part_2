const morseMap = new Map();
morseMap.set("A", ".-");
morseMap.set("B", "-...");
morseMap.set("C", "-.-.");
morseMap.set("D", "-..");
morseMap.set("E", ".");
morseMap.set("F", "..-.");
morseMap.set("G", "--.");
morseMap.set("H", "....");
morseMap.set("I", "..");
morseMap.set("J", ".---");
morseMap.set("K", "-.-");
morseMap.set("L", ".-..");
morseMap.set("M", "--");
morseMap.set("N", "-.");
morseMap.set("O", "---");
morseMap.set("P", ".--.");
morseMap.set("Q", "--.-");
morseMap.set("R", ".-.");
morseMap.set("S", "...");
morseMap.set("T", "-");
morseMap.set("U", "..-");
morseMap.set("V", "...-");
morseMap.set("W", ".--");
morseMap.set("X", "-..-");
morseMap.set("Y", "-.--");
morseMap.set("Z", "--..");
morseMap.set("0", "-----");
morseMap.set("1", ".----");
morseMap.set("2", "..---");
morseMap.set("3", "...--");
morseMap.set("4", "....-");
morseMap.set("5", ".....");
morseMap.set("6", "-....");
morseMap.set("7", "--...");
morseMap.set("8", "---..");
morseMap.set("9", "----.");
morseMap.set(".", ".-.-.-");
morseMap.set(",", "--..--");

const letterSep = "|";
const wordSep = "/";

const obfuscate = function (morse: string): string {
    const alphabet = "ABCDE";
    let arr = morse.split("");
    let result = "";
    let counter = 0;
    let wasDash = false;
    arr.forEach(a => {
        if (a === ".") {
            if (wasDash && counter > 0) {
                result = result.concat(alphabet.charAt(counter - 1));
                counter = 0;
            }
            wasDash = false;
        } else {
            if (!wasDash && counter > 0) {
                result = result.concat(counter.toString());
                counter = 0;
            }
            wasDash = true;
        }
        counter++;
    });
    if (counter > 0) {
        result = result.concat(wasDash ? alphabet.charAt(counter - 1) : counter.toString());
    }

    return result;
};

const encode = function (input: string): string {
    let result = "";
    input = input.toUpperCase().trim();
    input.split("").forEach(i => {
        if (i === " ") {
            if (result.charAt(result.length - 1) === letterSep) {
                result = result.slice(0, -1).concat(wordSep);
            }
        } else if (i === "\n") {
            result = result.slice(0, -1).concat("\n");
        } else {
            if (morseMap.get(i)) {
                result = result.concat(obfuscate(morseMap.get(i))).concat(letterSep);
            } else {
                throw new Error("Not valid to encode");
            }
        }
    });

    // takes away the last letter separator
    return result.slice(0, -1);
};

module.exports.morseEncode = encode;

