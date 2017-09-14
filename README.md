![npm badge](https://badge.fury.io/js/sp-bandwidth.svg)

Show ServerPilot user bandwidth information via cli.

### Installation

`npm i -g sp-bandwidth`

### Commands

_Run when logged in as the `ubuntu` user_

- `sp-log-import`: Parse the serverpilot logs and spit them out in `~/logs` as JSON. Run when you wish to update. Requires a `~/logs/` directory.  
- `sp-bandwidth`: Display the parsed info in the terminal.

### Installation prerequisites

#### [GoAccess](https://github.com/allinurl/goaccess)

```
echo "deb http://deb.goaccess.io/ $(lsb_release -cs) main" | sudo tee -a /etc/apt/sources.list.d/goaccess.list
wget -O - http://deb.goaccess.io/gnugpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install goaccess
```

You need to update the GoAccess config in `/etc/goaccess.conf`.  
Uncomment the following lines:  
13: `time-format %H:%M:%S`  
36: `date-format %d/%b/%Y`  
70: `log-format %h %^[%d:%t %^] "%r" %s %b`  

#### [Node v6+](https://nodejs.org/en/download/package-manager/)
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
