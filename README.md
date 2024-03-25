# Fish Phone Booth
Prototype for Birch Aquarium / La Jolla Playhouse Project

# Setup

## Clone repository

```git clone https://github.com/roberttwomey/fish-phone-app/```

## npm Setup

install npm: 

```
sudo apt update
sudo apt-get install nodejs npm
```

install modules: 

```npm install dotenv twilio socket.io pm2```

# Usage

Run the server
```sudo node fish-server.js```

## Better usage

with pm2

```npm install pm2 -g```

### Running with pm2

Start the app:
```
sudo pm2 start fish-server.js
```

Inspect the log:
```
sudo pm2 log fish-server.js
```

Stop the fish phone booth:
```
sudo pm2 stop fish-server.js
```


# ----- unused ------
## Setup

### Clone repository

```git clone https://github.com/roberttwomey/fish-phone-app/```


### Create conda environment (local macos)

```conda create --name fish```

```conda install -c conda-forge nodejs```

#### NPM setup

```npm install audio-stream```

```npm install audio-loader```

## Usage

Start server: 

```node fish-server.js```

Open browser (listening on port 80):

```https://localhost```

## Deploy on AWS

```bash
cd /Users/rtwomey/radioplay/aws-tlp-demo
```

```bash
ssh -i "TLP.pem" ubuntu@app.radio-play.net
```

or 
```bash
ssh -i "TLP.pem" ubuntu@ec2-54-219-126-173.us-west-1.compute.amazonaws.com
```

```bash
git clone https://github.com/roberttwomey/fish-phone-app/
```
NOTE: you need to change the serverURL in sketch.js when running remotely vs. locally.

## References
- Web audio streaming with node.js https://www.npmjs.com/package/stream-player
- 
- Deploying p5 sketch with node: https://github.com/processing/p5.js/wiki/p5.js,-node.js,-socket.io

- PM2 to deploy a sketch: https://pm2.keymetrics.io/
