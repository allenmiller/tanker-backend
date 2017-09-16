#Set up Raspberry Pi

## Install Raspbian
  https://howchoo.com/g/ndy1zte2yjn/how-to-set-up-wifi-on-your-raspberry-pi-without-ethernet
  https://www.raspberrypi.org/forums/viewtopic.php?t=74176
  
https://davidmaitland.me/2015/12/raspberry-pi-zero-headless-setup/

  Download latest
  unzip 2017-08-16-raspbian-stretch.zip
  Load microSD card into USB adapter and plug into the mac

  Unmount the microSD volume
  sudo diskutil unmount /dev/disk2s1
  sudo dd bs=1m if=2017-08-16-raspbian-stretch.img of=/dev/rdisk2
4680+1 records in
4680+1 records out
4907675648 bytes transferred in 407.905175 secs (12031413 bytes/sec)
  

  cd /Volumes/boot

  create file wpa_supplicant.conf containing:

  ````
  ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
  network={
    ssid="MYSSID"
    psk="MYPASSWD"
    key_mgmt=WPA-PSK
  }
  ````

Read the notes at the end of:
https://howchoo.com/g/ndy1zte2yjn/how-to-set-up-wifi-on-your-raspberry-pi-without-ethernet

  enable ssh:

  touch ssh
  cd
  sudo diskutil unmount /dev/disk2s1

  remove microSD card from mac, insert in Raspberry Pi, power up.
````
  sudo nmap -sP 10.0.0.0/24
  
  Starting Nmap 7.40 ( https://nmap.org ) at 2017-09-07 20:42 PDT
  Nmap scan report for 10.0.0.1
  Host is up (0.014s latency).
  MAC Address: CC:03:FA:7A:5B:23 (Technicolor CH USA)
...
  Nmap scan report for 10.0.0.8
  Host is up (0.015s latency).
  MAC Address: B8:27:EB:39:F7:33 (Raspberry Pi Foundation)
...
  Nmap done: 256 IP addresses (10 hosts up) scanned in 5.29 seconds
  

````
Give it a hostname and change the default password:
````
  sudo hostname tortoise
  sudo vi /etc/hosts
   < add hostname (tortoise in this case) to the first line, after localhost >
  passwd
````
Install your public key

````
  mkdir .ssh
  chmod 755 .ssh
  cd .ssh
  nano authorized_keys
    <copy your public key>
  chmod 644 authorized_keys
  
````

Update OS to latest versions

````
  sudo apt-get update
  sudo apt-get upgrade
````

Update node.js
````
https://stackoverflow.com/questions/42741243/how-do-you-install-newest-version-of-node-js-on-raspberry-pi
sudo apt-get remove nodered
sudo apt-get remove nodejs nodejs-legacy
sudo apt-get autoremove

curl -L https://git.io/n-install | bash

pi@tortoise:~ $ . /home/pi/.bashrc
pi@tortoise:~ $ node -v
v8.4.0
pi@tortoise:~ $ npm --version
5.3.0
 
````
Backend web server and database manager for Tanker

````
Measurements:

Relative to ground

top of tank     62
alarm level     90
alert level    106
normal high    121
lower limit    137
bottom of tank 202
````

Pump Tank characteristics
````
Capacity     1150 gal   4353 l
Height         55  in    140 cm
Cap/Height  21 gal/in 8.2 gal/cm  31.1 l/cm

Volume consumed at lower limit: 533 gal
Volume consumed at alarm level: 918 gal
````

Lidar detector calibration

Distance measured from bottom of enclosure in which lIDAR is mounted
````
Measured          Reported
54                  37 +/- 2
84                  64
112                 93
202                187
248                238
````
