#!/bin/bash
rm -rf cut
mkdir -p cut/{320,480,640,960,1280,1600,1920,2880,3840}
convert original.jpg -resize 320x180 cut/320/full.png
convert cut/320/full.png -crop 64x36 cut/320/%d.png
convert original.jpg -resize 480x270 cut/480/full.png
convert cut/480/full.png -crop 96x54 cut/480/%d.png
convert original.jpg -resize 640x360 cut/640/full.png
convert cut/640/full.png -crop 128x72 cut/640/%d.png
convert original.jpg -resize 960x540 cut/960/full.png
convert cut/960/full.png -crop 192x108 cut/960/%d.png
convert original.jpg -resize 1280x720 cut/1280/full.png
convert cut/1280/full.png -crop 256x144 cut/1280/%d.png
convert original.jpg -resize 1600x900 cut/1600/full.png
convert cut/1600/full.png -crop 320x180 cut/1600/%d.png
convert original.jpg -resize 1920x1080 cut/1920/full.png
convert cut/1920/full.png -crop 384x216 cut/1920/%d.png
convert original.jpg -resize 2880x1620 cut/2880/full.png
convert cut/2880/full.png -crop 576x324 cut/2880/%d.png
convert original.jpg -resize 3840x2160 cut/3840/full.png
convert cut/3840/full.png -crop 768x432 cut/3840/%d.png
