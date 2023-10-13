push:
	git add .
	git commit -m "$(m)"
	git push -u origin main

copy:
	cp -f ~/Damaco/Development/mtc/mobile/build/app/outputs/flutter-apk/app-release.apk ~/Damaco/Development/mtc/web/public/downloads/MTC.apk