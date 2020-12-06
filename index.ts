const morse = require("./src/morse");
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (process.argv.length === 2) {
    rl.question("Please input your message or launch the program with file path as parameter\n", function (input: string) {
        try {
            console.log("Encoded message: ", morse.morseEncode(input));
        } catch (error) {
            console.error(error.message);
        }
        rl.close();
    });

    rl.on("close", function () {
        console.log("\nBYE BYE !!!");
        process.exit(0);
    });
} else {
    fs.readFile(process.argv[2], "utf8", function (err: Error, data: string) {
        if (err) {
            console.error(err.message);
            process.exit(1);
        } else {
            try {
                fs.writeFile("result.txt", morse.morseEncode(data), "utf8", function (err: Error) {
                    if (err) {
                        console.error(err.message);
                        process.exit(1);
                    }
                    console.log("Result produced in result.txt\nBYE BYE !!!");
                    process.exit(0);
                });
            } catch (error) {
                console.error("Message cannot be encoded.");
                process.exit(1);
            }
        }

    });
}
