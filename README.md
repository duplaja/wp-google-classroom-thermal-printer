# WP Google Classroom: Thermal Printer
Thermal Printer Extension for Sign In / Out Tickets. Extends [WP Google Classroom](https://github.com/duplaja/wp-google-classroom)

## Notes

* This has a much higher level of techincal proficiency needed to set up.
* You will need to be comfortable with command line tools, and modifying code.
* This requires special hardware (Thermal Printer) and special software: [QZ Tray](https://qz.io/)
* A decent thermal printer runs from $130 - $200.
* QZ Tray is open source / free, but you'll have to compile it from source yourself to let it work properly.

## Compiling QZ Tray, and Setting Up Verification
* First, install all dependencies for the system you will want this to run on: https://qz.io/wiki/install-dependencies
* Do a git clone to get a copy of the files: 
```
git clone https://github.com/qzind/tray
```
* Move into the generated tray folder.
* Then, generate the needed certificates, as described in this article, using:
```
sudo openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 11499 -nodes
```
and then (setting a password as prompted)
```
sudo openssl pkcs12 -inkey key.pem -in cert.pem -export -out privateKey.pfx
```

* Assuming that those were created in the tray folder, build your executable for your system, as seen in the compiling help section, pointing to your new certificate. (Linux Example)

```
ant makeself -Dauthcert.use="cert.pem"
```

* Install your new executable from tray/out/qz-tray-community-2.0.10.run (or the similar for your OS) ON YOUR LOCAL MACHINE

* Now that your local machine is set up, we need to finish configuring things in the plugin.

* In the plugin folder, copy your cert and your key file to /assets/signing/cert.pem and /assets/signing/key.pem (with those filenames). Uncomment $PASS and set to your password if you created one. Also, uncomment ", $PASS" in the $privateKey variable line. 

* You should be good to go! More later on how to set which printer to use, etc.

## Resources
* Dependencies: https://qz.io/wiki/install-dependencies
* Generating Certs: https://ijustlearnedsomethingnewtoday.blogspot.com/2017/04/using-self-signed-certificates-with-qz.html
* Compiling: https://qz.io/wiki/Compiling
